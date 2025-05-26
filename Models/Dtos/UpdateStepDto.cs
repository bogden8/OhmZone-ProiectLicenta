using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace OhmZone_ProiectLicenta.Models.Dtos
{
    public class UpdateStepDto
    {
        public string Description { get; set; } 
        public IFormFile? MainImage { get; set; } 
    }
}
