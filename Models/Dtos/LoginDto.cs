using System.ComponentModel.DataAnnotations;

namespace OhmZone_ProiectLicenta.Models.Dtos
{
    public class LoginDto
    {
        [Required]
        public string UsernameOrEmail { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
