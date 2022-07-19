using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GS.Models
{
    public class Client
    {
        [Key]
        public int Cli_Id { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Cli_Nom { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Cli_Prenom { get; set; }
        [Column(TypeName = "nvarchar(8)")]
        public string Cli_Phone { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Cli_Email { get; set; }
        [Column(TypeName = "nvarchar(255)")]
        public string Cli_Adress { get; set; }
        [Column(TypeName = "nvarchar(10)")]
        public string Cli_ZipCode { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Cli_Ville { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Cli_Dat_Ins { get; set; }
    }
}
