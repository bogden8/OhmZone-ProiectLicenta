using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace OhmZone_ProiectLicenta.Models.Dtos
{
    public class CreateStepDto
    {
        public string Text { get; set; }

        // these come from <input type="file" name="mainImage" />
        public IFormFile MainImage { get; set; }

        // multiple thumbnails: <input type="file" name="thumbnails" multiple />
        public List<IFormFile> Thumbnails { get; set; }
    }
}
