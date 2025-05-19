using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace OhmZone_ProiectLicenta.Models.Dtos
{
    public class UpdateStepDto
    {
        [Required]
        public string Text { get; set; }
        public IFormFile MainImage { get; set; }
        public List<IFormFile> Thumbnails { get; set; }
    }
}
