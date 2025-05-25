using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace OhmZone_ProiectLicenta.Models.Dtos
{
    public class CreateStepDto
    {
        [Required]
        public string Description { get; set; } // ✅ în loc de Text

        public IFormFile MainImage { get; set; } // ✅ folosit ca ImagePath
    }
}
