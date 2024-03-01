using System.ComponentModel.DataAnnotations;

namespace EcomAPI.Models
{

    // Categories Model
    public class Category
    {
        public int CategoryId { get; set; }

        [Required]
        public string? CategoryName { get; set; }
    }
}

