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
    public class devisc : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public devisc(IConfiguration configuration) => _configuration = configuration;


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select   
                                    D_Num,
                                    D_Date,
                                   D_Num_cli,
                                   D_Phone_cli,
                                    D_Address_cli,
                                    D_Prod
                              
                            from dbo.devis

                            
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
        public JsonResult Post(devis D)
        {
            string query = @"
                           insert into dbo.devis (D_Date,D_Num_cli,D_Phone_cli,D_Address_cli,D_Prod)
                           values (
                                  
                                    @D_Date,
                                    @D_Num_cli,
                                    @D_Phone_cli,
                                    @D_Address_cli,
                                    @D_Prod
                          
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
                  
                    myCommand.Parameters.AddWithValue("@D_Date", D.D_Date);
                    myCommand.Parameters.AddWithValue("@D_Num_cli", D.D_Num_cli);
                    myCommand.Parameters.AddWithValue("@D_Phone_cli", D.D_Phone_cli);
                    myCommand.Parameters.AddWithValue("@D_Address_cli", D.D_Address_cli);
                    myCommand.Parameters.AddWithValue("@D_Prod", D.D_Prod);
          
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
        public JsonResult Put(devis D)
        {
            string query = @"
                           update dbo.devis
                           set 
                                    D_Num=@D_Num,
                                    D_Date=@D_Date,
                                    D_Num_cli=@D_Num_cli,
                                    D_Phone_cli=@D_Phone_cli,
                                    D_Address_cli=@D_Address_cli,
                                    D_Prod=@D_Prod

                            where D_Num=@D_Num";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GS");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@D_Num", D.D_Num);
                    myCommand.Parameters.AddWithValue("@D_Date", D.D_Date);
                    myCommand.Parameters.AddWithValue("@D_Num_cli", D.D_Num_cli);
                    myCommand.Parameters.AddWithValue("@D_Phone_cli", D.D_Phone_cli);
                    myCommand.Parameters.AddWithValue("@D_Address_cli", D.D_Address_cli);
                    myCommand.Parameters.AddWithValue("@D_Prod", D.D_Prod);
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
                           delete from dbo.devis
                            where D_Num=@D_Num
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GS");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@D_Num", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }



    }
}