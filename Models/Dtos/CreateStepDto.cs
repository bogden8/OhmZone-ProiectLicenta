using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OhmZone_ProiectLicenta.Models.Dtos
{
    public class CreateStepDto
    {
        [Required]
        public string Text { get; set; }

        public IFormFile MainImage { get; set; }

        public List<IFormFile> Thumbnails { get; set; }
    }
}
