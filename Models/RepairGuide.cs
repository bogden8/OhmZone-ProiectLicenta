using System;
using System.Collections.Generic;            
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OhmZone_ProiectLicenta.Models
{
    public class RepairGuide
    {
        [Key]
        public int GuideID { get; set; }
        public string Title { get; set; }
        public int CategoryID { get; set; }
        public int AuthorID { get; set; }
        public int DeviceID { get; set; } // 🔄 schimbat din DeviceRepID
        public string Part { get; set; }
        public string Content { get; set; }
        public float Rating { get; set; }
        public DateTime DatePublished { get; set; }

        // 🔄 Relații clare
        public Device Device { get; set; }
        public Category Category { get; set; }
        public Users Author { get; set; }

        // 🔄 Nume clar pentru listă de pași
        public List<GuideStep> Steps { get; set; } = new();
        public List<GuideComments> GuideComments { get; set; } = new();
    }



}
