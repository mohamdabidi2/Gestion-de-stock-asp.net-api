
using GS.Models;
using GS.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;

namespace GS.Controllers
{
[ApiController]
    [Route("api/[controller]")]

    
    public class User : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public User(IConfiguration configuration) => _configuration = configuration;

      




        [HttpPost("Register")]
        public JsonResult PostReq(user a)
        {
            byte[] encData_byte = new byte[a.Password.Length];
            encData_byte = System.Text.Encoding.UTF8.GetBytes(a.Password);
            string encodedData = Convert.ToBase64String(encData_byte);
            string query = @"
                           insert into dbo.admins (Email,Password,UserName,Dat_ins)
                           values (@Email,@encodedData,@UserName,@Dat_ins)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GS");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@Email", a.Email);
                    myCommand.Parameters.AddWithValue("@encodedData", encodedData);
                    myCommand.Parameters.AddWithValue("@UserName", a.UserName);
                    myCommand.Parameters.AddWithValue("@Dat_ins", a.Dat_ins);



                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    Console.WriteLine(table);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPost("login")]
        public JsonResult Post(user us)
        {
            byte[] encData_byte = new byte[us.Password.Length];
            encData_byte = System.Text.Encoding.UTF8.GetBytes(us.Password);
            string encodedData = Convert.ToBase64String(encData_byte);

            string query = @"select * from dbo.admins where Email=@Email and Password=@encodedData
";




            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GS");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Email", us.Email);
                    myCommand.Parameters.AddWithValue("@encodedData", encodedData);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            if (table.Rows.Count > 0)
            {
                var jwt = new JwtService(_configuration);
                var token = jwt.GenerateSecurityToken(us.Email);
                return new JsonResult(token);
            }
            else { return new JsonResult("404 user not found"); }


        }




    }
}




































