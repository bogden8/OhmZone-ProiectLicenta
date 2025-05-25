using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OhmZone_ProiectLicenta.Models
{
    public class GuideStep
    {
        [Key]
        public int GuideStepID { get; set; }
        public int GuideID { get; set; }
        public RepairGuide Guide { get; set; }

        public int StepNumber { get; set; }
        public string Description { get; set; }
        public string? ImagePath { get; set; }
    }


}
