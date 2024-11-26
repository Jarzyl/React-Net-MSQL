using System.ComponentModel.DataAnnotations;

namespace Habits.API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string UserName { get; set;}

        [Required]
        public string LastName { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }
    }
}
