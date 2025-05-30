﻿using Microsoft.AspNetCore.Http;

namespace OhmZone_ProiectLicenta.Models.Dtos
{
    public class RoboticsUploadDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public IFormFile Image { get; set; }
    }
}
