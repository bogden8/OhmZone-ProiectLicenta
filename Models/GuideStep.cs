using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OhmZone_ProiectLicenta.Models
{
    public class GuideStep
    {
        [Key]
        public int GuideStepID { get; set; }

        public int RepairGuideID { get; set; } 
        public RepairGuide RepairGuide { get; set; }

        public int StepNumber { get; set; }

        
        public string Description { get; set; }
        public string ImagePath { get; set; }
    }

}
