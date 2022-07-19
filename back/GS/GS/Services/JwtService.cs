﻿using System;  
using System.Text;  
using System.Security.Claims;  
using Microsoft.IdentityModel.Tokens;  
using System.IdentityModel.Tokens.Jwt;  
using Microsoft.Extensions.Configuration;  
  
namespace GS.Services
{  
    public class JwtService  
    {  
        private readonly string _secret;  
        private readonly string _expDate;  
  
        public JwtService(IConfiguration config)  
        {  
            _secret = config.GetSection("JwtConfig").GetSection("secret").Value;  
            _expDate = config.GetSection("JwtConfig").GetSection("expirationInMinutes").Value;  
        }  
  
        public string GenerateSecurityToken(string Email)  
        {  
            var tokenHandler = new JwtSecurityTokenHandler();  
            var key = Encoding.ASCII.GetBytes(_secret);  
            var tokenDescriptor = new SecurityTokenDescriptor  
            {  
                Subject = new ClaimsIdentity(new[]  
                {  
                    new Claim(ClaimTypes.Email, Email)  
                }),  
                Expires = DateTime.UtcNow.AddMinutes(double.Parse(_expDate)),  
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)  
            };  
  
            var token = tokenHandler.CreateToken(tokenDescriptor);  
  
            return tokenHandler.WriteToken(token);  
  
        }  
    }  
}  