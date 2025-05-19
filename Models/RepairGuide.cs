using System;
using System.Collections.Generic;            
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OhmZone_ProiectLicenta.Models
{
    public class RepairGuide
    {
        public int GuideID { get; set; }
        public string Title { get; set; }
        public int CategoryID { get; set; }
        public int AuthorID { get; set; }
        public int DeviceRepID { get; set; }
        public string Part { get; set; }
        public string Content { get; set; }
        public float Rating { get; set; }
        public DateTime DatePublished { get; set; }

        // Relații
        public Device DeviceRep { get; set; }
        public Categories Category { get; set; }
        public Users Author { get; set; }

        // 🔧 Adaugă lista de pași
        public List<GuideStep> GuideSteps { get; set; } = new();
    }

}
