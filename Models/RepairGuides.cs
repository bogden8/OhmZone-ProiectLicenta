using System;
using System.Collections.Generic;            // ← for ICollection<T>
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OhmZone_ProiectLicenta.Models
{
    public class RepairGuides
    {
        [Key]
        public int GuideID { get; set; }

        public string Title { get; set; }

        public int CategoryID { get; set; }
        [ForeignKey("CategoryID")]
        public Categories Category { get; set; }

        public int AuthorID { get; set; }
        [ForeignKey("AuthorID")]
        public Users Author { get; set; }

        // ← your manual fields
        public int DeviceID { get; set; }
        [ForeignKey("DeviceID")]
        public Device Device { get; set; }

        public string Part { get; set; }

        public string Content { get; set; }
        public float Rating { get; set; }
        public DateTime DatePublished { get; set; }

        public ICollection<GuideComments> GuideComments { get; set; }

        // ← add this:
        public ICollection<Step> Steps { get; set; }
    }
}
