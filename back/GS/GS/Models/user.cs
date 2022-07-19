using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GS.Models
{
    public class user
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Email { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string UserName { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Password { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Dat_ins { get; set; }

    }
}
