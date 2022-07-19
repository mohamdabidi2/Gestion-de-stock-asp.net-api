using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using GS.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace GS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class client : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public client(IConfiguration configuration) => _configuration = configuration;

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select   
                                    Cli_Id,
                                    Cli_Nom,
                                    Cli_Prenom,
                                    Cli_Phone,
                                    Cli_Email,
                                    Cli_Adress,
                                    Cli_ZipCode,
                                    Cli_Ville,
                                    Cli_Dat_Ins
                            from dbo.client

                            
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GS");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Client Cli)
        {
            string query = @"
                           insert into dbo.client
                           values (
                                    GETDATE(),
                                    @Cli_Nom,
                                    @Cli_Prenom,
                                    @Cli_Phone,
                                    @Cli_Email,
                                    @Cli_Adress,
                                    @Cli_ZipCode,
                                    @Cli_Ville
                                    
                          
                                   )
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GS");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Cli_Id", Cli.Cli_Id);
                    myCommand.Parameters.AddWithValue("@Cli_Nom", Cli.Cli_Nom);
                    myCommand.Parameters.AddWithValue("@Cli_Prenom", Cli.Cli_Prenom);
                    myCommand.Parameters.AddWithValue("@Cli_Phone", Cli.Cli_Phone);
                    myCommand.Parameters.AddWithValue("@Cli_Email", Cli.Cli_Email);
                    myCommand.Parameters.AddWithValue("@Cli_Adress", Cli.Cli_Adress);
                    myCommand.Parameters.AddWithValue("@Cli_ZipCode", Cli.Cli_ZipCode);
                    myCommand.Parameters.AddWithValue("@Cli_Ville", Cli.Cli_Ville);
                    myCommand.Parameters.AddWithValue("@Cli_Dat_Ins", Cli.Cli_Dat_Ins);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    Console.WriteLine(table);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Client Cli)
        {
            string query = @"
                           update dbo.client
                           set 
                               
                                 Cli_Nom  = @Cli_Nom,
                                Cli_Prenom   = @Cli_Prenom,
                                 Cli_Phone =@Cli_Phone,
                                 Cli_Email =@Cli_Email,
                                 Cli_Adress =@Cli_Adress,
                                 Cli_ZipCode =@Cli_ZipCode,
                                Cli_Ville = @Cli_Ville
                           

                            where Cli_Id=@Cli_Id";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GS");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Cli_Id", Cli.Cli_Id);
                    myCommand.Parameters.AddWithValue("@Cli_Nom", Cli.Cli_Nom);
                    myCommand.Parameters.AddWithValue("@Cli_Prenom", Cli.Cli_Prenom);
                    myCommand.Parameters.AddWithValue("@Cli_Phone", Cli.Cli_Phone);
                    myCommand.Parameters.AddWithValue("@Cli_Email", Cli.Cli_Email);
                    myCommand.Parameters.AddWithValue("@Cli_Adress", Cli.Cli_Adress);
                    myCommand.Parameters.AddWithValue("@Cli_ZipCode", Cli.Cli_ZipCode);
                    myCommand.Parameters.AddWithValue("@Cli_Ville", Cli.Cli_Ville);
              
            
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                           delete from dbo.client
                            where Cli_Id=@Cli_Id
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GS");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Cli_Id", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

       
        [HttpGet("{Phone}")]
        public JsonResult GetOne(string Phone)
        {
            string query = @"
                            select   
                                    Cli_Id,
                                    Cli_Nom,
                                    Cli_Prenom,
                                    Cli_Phone,
                                    Cli_Email,
                                    Cli_Adress,
                                    Cli_ZipCode,
                                    Cli_Ville,
                                    Cli_Dat_Ins
                            from dbo.client
                            where   Cli_Phone=@Cli_Phone

                            
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GS");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Cli_Phone", Phone);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

    }
}