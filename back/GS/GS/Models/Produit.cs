using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GS.Models
{
    public class Produit
    {
        [Key]
        public int Prod_Num_Ser { get; set; }
        [Column(TypeName ="nvarchar(100)")]
        public string Prod_Name { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Prod_marq { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Prod_Desc { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Prod_Cat { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string Prod_Img { get; set; }
        [Column(TypeName ="nvarchar(30)")]
        public string Prod_Dat_Ajou { get; set; }
        public int Prod_Qtn { get; set; }
        public int Prod_Cost { get; set; }
        public int Prod_Prix_Unit { get; set; }
        [Column(TypeName ="nvarchar(100)")]
        public string Prod_disp { get; set; }



    }
}
