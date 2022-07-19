using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GS.Models
{
    public class devis
    {
        [Key]
        public int D_Num { get; set; }
      
        [Column(TypeName = "nvarchar(20)")]
        public string D_Date { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string D_Num_cli { get; set; }
        [Column(TypeName = "nvarchar(8)")]
        public string D_Phone_cli { get; set; }
        [Column(TypeName = "nvarchar(255)")]
        public string D_Address_cli { get; set; }
        [Column(TypeName = "TEXT")]
        public string D_Prod { get; set; }

    }
}
