using GS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using Microsoft.AspNetCore.Authorization;
using System.Data.SqlClient;

namespace GS.Controllers
{

    [Route("api/[controller]")]

    [ApiController]
    public class facture : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public facture(IConfiguration configuration) => _configuration = configuration;


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select   
                                    Fact_Id,
                                    Fact_Add,
                                    Fact_Ville,
                                    Fact_tel,
                                    Fact_zip,
                                    Fact_Email,
                                    Fact_pour,
                                    Fact_date,
                                    Fact_Ref,
                                    Fact_Paiement, 
                                    Fact_Produits ,
                                    F_client
                            from dbo.facture

                            
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
        public JsonResult Post(Facture Fact)
        {
            string query = @"
                           insert into dbo.facture (Fact_Add,Fact_Ville,Fact_tel,Fact_zip,Fact_Email,Fact_pour,Fact_date,Fact_Ref,Fact_Paiement,Fact_Produits,F_client)
                           values (
                                   
                                    @Fact_Add,
                                    @Fact_Ville,
                                    @Fact_tel,
                                    @Fact_zip,
                                    @Fact_Email,
                                    @Fact_pour,
                                    @Fact_date,
                                    @Fact_Ref,
                                    @Fact_Paiement, 
                                    @Fact_Produits,
                                    @F_client
                                  
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

                    myCommand.Parameters.AddWithValue("@Fact_Add", Fact.Fact_Add);
                    myCommand.Parameters.AddWithValue("@Fact_Ville", Fact.Fact_Ville);
                    myCommand.Parameters.AddWithValue("@Fact_tel", Fact.Fact_tel);
                    myCommand.Parameters.AddWithValue("@Fact_zip", Fact.Fact_zip);
                    myCommand.Parameters.AddWithValue("@Fact_Email", Fact.Fact_Email);
                    myCommand.Parameters.AddWithValue("@Fact_pour", Fact.Fact_pour);
                    myCommand.Parameters.AddWithValue("@Fact_date", Fact.Fact_date);
                    myCommand.Parameters.AddWithValue("@Fact_Ref", Fact.Fact_Ref);
                    myCommand.Parameters.AddWithValue("@Fact_Paiement", Fact.Fact_Paiement);
                    myCommand.Parameters.AddWithValue("@Fact_Produits", Fact.Fact_Produits);
                    myCommand.Parameters.AddWithValue("@F_client", Fact.F_client);


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
        public JsonResult Put(Produit prod)
        {
            string query = @"
                           update dbo.produit
                           set Prod_Qtn=@Prod_Qtn,
                               Prod_disp=@Prod_disp
                            where Prod_Num_Ser=@Prod_Num_Ser";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GS");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Prod_Qtn", prod.Prod_Qtn);
                    myCommand.Parameters.AddWithValue("@Prod_Num_Ser", prod.Prod_Num_Ser);
                    myCommand.Parameters.AddWithValue("@Prod_disp", prod.Prod_disp);

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
                           delete from dbo.facture
                            where Fact_Id=@Fact_Id
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GS");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Fact_Id", id);

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