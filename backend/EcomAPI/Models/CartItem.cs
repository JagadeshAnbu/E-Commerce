using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EcomAPI.Models
{

    // CartItems Model
    public class CartItem
    {
        [Key]
        public int CartItemId { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("Product")]
        [Required]
        public int ProductId { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public DateTime Timestamp { get; set; }

        [ForeignKey("ProductId")] // Explicitly specify the foreign key property name
        public Product Product { get; set; } // Assuming Product is the navigation property to Product entity

    }
}

