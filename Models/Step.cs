using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OhmZone_ProiectLicenta.Models
{
    public class Step
    {
        [Key]
        public int StepID { get; set; }

        
        public int GuideID { get; set; }
        [ForeignKey(nameof(GuideID))]
        public RepairGuides Guide { get; set; }

        
        public int Order { get; set; }

        
        public string Text { get; set; }

       
        public string MainImageUrl { get; set; }

        
        public string ThumbnailUrlsJson { get; set; }

        
        public DateTime CreatedAt { get; set; }
    }
}
