using System;
using System.Linq;
using EcomAPI;
using Microsoft.AspNetCore.Mvc;
using EcomAPI.Models;
using Microsoft.EntityFrameworkCore;
using YourNamespace; // This is where your DbContext and models reside

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/cart/getproducts
        [HttpGet("getproducts")]
        public IActionResult GetProducts()
        {
            var products = _context.Products.ToList();
            return Ok(products);
        }


        // GET: api/cart/topwomenproducts
        [HttpGet("topwomenproducts")]
        public IActionResult GetTopWomenProducts()
        {
            var topWomenProducts = _context.Products
                .Where(p => p.CategoryId == 1) // Assuming women's category ID is 2
                .OrderByDescending(p => p.ProductName)
                .Take(4) // Adjust the number as per your requirement
                .ToList();
                
            return Ok(topWomenProducts);
        }


        // GET: api/cart/newcollections
        [HttpGet("newcollections")]
        public IActionResult NewCollections()
        {
            var topWomenProducts = _context.Products
                .Where(p => p.CategoryId == 3)
                .OrderByDescending(p => p.ProductName)
                .Take(4) // Adjust the number as per your requirement
                .ToList();

            return Ok(topWomenProducts);
        }


        [HttpPost("addtocart")]
        public IActionResult AddToCart(CartItem cartItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Ensure that ProductId is provided
            if (cartItem.ProductId == 0)
            {
                return BadRequest("ProductId is required.");
            }

            // Check if the product exists
            var product = _context.Products.Find(cartItem.ProductId);
            if (product == null)
            {
                return NotFound("Product not found.");
            }

            // Check if the user already has the same product in the cart
            var existingCartItem = _context.CartItems.FirstOrDefault(c => c.ProductId == cartItem.ProductId && c.UserId == cartItem.UserId);
            if (existingCartItem != null)
            {
                // Update quantity
                existingCartItem.Quantity += cartItem.Quantity;
                _context.SaveChanges();
                return Ok();
            }

            // If not, add the cart item
            cartItem.Timestamp = DateTime.Now;
            _context.CartItems.Add(cartItem);

            try
            {
                _context.SaveChanges();
                return Ok();
            }
            catch (DbUpdateException ex)
            {
                // Log the exception and return a meaningful error message
                Console.WriteLine($"Error occurred while saving changes: {ex.InnerException?.Message}");
                return StatusCode(500, "An error occurred while saving changes to the database.");
            }
        }


        // DELETE: api/cart/removefromcart/{cartItemId}
        [HttpDelete("removefromcart/{cartItemId}")]
        public IActionResult RemoveFromCart(int cartItemId)
        {
            var cartItem = _context.CartItems.Find(cartItemId);
            if (cartItem == null)
            {
                return NotFound();
            }

            _context.CartItems.Remove(cartItem);
            _context.SaveChanges();

            return Ok();
        }
    }
}
