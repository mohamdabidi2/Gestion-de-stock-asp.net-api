using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GS.Models
{


    public class Facture
    {
        [Key]
        public int Fact_Id { get; set; }
        [Column(TypeName = "VARCHAR (100)")]
        public string Fact_Add { get; set; }
        [Column(TypeName = "VARCHAR (100)")]
        public string Fact_Ville { get; set; }
        [Column(TypeName = "VARCHAR (8)")]
        public string Fact_tel { get; set; }
        [Column(TypeName = "INT")]
        public int Fact_zip { get; set; }
        [Column(TypeName = "VARCHAR (255)")]
        public string Fact_Email { get; set; }
        [Column(TypeName = "VARCHAR (255)")]
        public string Fact_pour { get; set; }
        [Column(TypeName = "VARCHAR (100)")]
        public string Fact_date { get; set; }
        [Column(TypeName = "INT")]
        public int Fact_Ref { get; set; }
        [Column(TypeName = "VARCHAR (100)")]
        public string Fact_Paiement { get; set; }
        [Column(TypeName = "int")]
        public int F_client { get; set; }
        [Column(TypeName = "TEXT")]
        public string Fact_Produits { get; set; }
       


    }
}
