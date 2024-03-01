using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EcomAPI.Models
{
 
    // Products Model
    public class Product
    {
        public int ProductId { get; set; }

        [Required]
        public string? ProductName { get; set; }

        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        public string Image {  get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        public decimal NewPrice { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        public decimal OldPrice { get; set; }

        public Category? Category { get; set; }
    }
}
