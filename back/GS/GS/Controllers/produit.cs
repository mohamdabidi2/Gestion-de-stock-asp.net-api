

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
using System.Net.Http.Headers;

namespace GS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class produit : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private object _env;

        public produit(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select Prod_Num_Ser,Prod_Name,Prod_marq,Prod_Desc,Prod_Cat,Prod_Img,Prod_Dat_Ajou,Prod_Qtn,Prod_Cost,Prod_Prix_Unit,Prod_disp
                            from dbo.produit
                            
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
        public JsonResult Post(Produit Prod)
        {
            string query = @"
                           insert into dbo.produit
                           values (@Prod_Name,@Prod_marq,@Prod_Desc,@Prod_Cat,@Prod_Img,@Prod_Dat_Ajou,@Prod_Qtn,@Prod_Cost,@Prod_Prix_Unit,@Prod_disp)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GS");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                   
                    myCommand.Parameters.AddWithValue("@Prod_Name", Prod.Prod_Name);
                    myCommand.Parameters.AddWithValue("@Prod_marq", Prod.Prod_marq);
                    myCommand.Parameters.AddWithValue("@Prod_Desc", Prod.Prod_Desc);
                    myCommand.Parameters.AddWithValue("@Prod_Cat", Prod.Prod_Cat);
                    myCommand.Parameters.AddWithValue("@Prod_Img", Prod.Prod_Img);
                    myCommand.Parameters.AddWithValue("@Prod_Dat_Ajou", Prod.Prod_Dat_Ajou);
                    myCommand.Parameters.AddWithValue("@Prod_Qtn", Prod.Prod_Qtn);
                    myCommand.Parameters.AddWithValue("@Prod_Prix_Unit", Prod.Prod_Prix_Unit);
                    myCommand.Parameters.AddWithValue("@Prod_disp", Prod.Prod_disp);
                    myCommand.Parameters.AddWithValue("@Prod_Cost", Prod.Prod_Cost);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }
       

        [HttpPut]
        public JsonResult Put(Produit Prod)
        {
            string query = @"
                           update dbo.produit
                           set Prod_Name=@Prod_Name,Prod_marq=@Prod_marq,Prod_Desc=@Prod_Desc,Prod_Cat=@Prod_Cat,Prod_Img=@Prod_Img,Prod_Dat_Ajou=@Prod_Dat_Ajou,Prod_Qtn=@Prod_Qtn,Prod_Prix_Unit=@Prod_Prix_Unit,Prod_disp=@Prod_disp,Prod_Cost=@Prod_Cost
                            where Prod_Num_Ser=@Prod_Num_Ser";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GS");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Prod_Num_Ser", Prod.Prod_Num_Ser);
                    myCommand.Parameters.AddWithValue("@Prod_Name", Prod.Prod_Name);
                    myCommand.Parameters.AddWithValue("@Prod_marq", Prod.Prod_marq);
                    myCommand.Parameters.AddWithValue("@Prod_Desc", Prod.Prod_Desc);
                    myCommand.Parameters.AddWithValue("@Prod_Cat", Prod.Prod_Cat);
                    myCommand.Parameters.AddWithValue("@Prod_Img", Prod.Prod_Img);
                    myCommand.Parameters.AddWithValue("@Prod_Dat_Ajou", Prod.Prod_Dat_Ajou);
                    myCommand.Parameters.AddWithValue("@Prod_Qtn", Prod.Prod_Qtn);
                    myCommand.Parameters.AddWithValue("@Prod_Prix_Unit", Prod.Prod_Prix_Unit);
                    myCommand.Parameters.AddWithValue("@Prod_disp", Prod.Prod_disp);
                    myCommand.Parameters.AddWithValue("@Prod_Cost", Prod.Prod_Cost);
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
                           delete from dbo.produit
                            where Prod_Num_Ser=@Prod_Num_Ser
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GS");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Prod_Num_Ser", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
        [Route("getproduitinfo")]
        [HttpPost]
        public JsonResult getProduit(Produit Prod)
        {
            string query = @"
                            select Prod_Num_Ser,Prod_Name,Prod_marq,Prod_Desc,Prod_Cat,Prod_Img,Prod_Dat_Ajou,Prod_Qtn,Prod_Cost,Prod_Prix_Unit,Prod_disp
                            from dbo.produit
                            where Prod_Num_Ser=@Prod_Num_Ser";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GS");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Prod_Num_Ser", Prod.Prod_Num_Ser);
       
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }
        [Route("SaveFile")]
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Photos");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }





    }
}