using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OhmZone_ProiectLicenta.Models
{
    public class Step
    {
        [Key]
        public int StepID { get; set; }

        // Foreign key to RepairGuides
        public int GuideID { get; set; }
        [ForeignKey(nameof(GuideID))]
        public RepairGuides Guide { get; set; }

        // Ordering within the guide
        public int Order { get; set; }

        // The main instruction text
        public string Text { get; set; }

        // URL of the main image (if any)
        public string MainImageUrl { get; set; }

        // JSON-serialized list of thumbnail URLs
        public string ThumbnailUrlsJson { get; set; }

        // When the step was created
        public DateTime CreatedAt { get; set; }
    }
}
