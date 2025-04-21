using System.ComponentModel.DataAnnotations;

namespace OhmZone_ProiectLicenta.Models
{
    public class GuideComments
    {
        [Key]
        public int CommentID { get; set; }
        public int GuideID { get; set; }
        public int UserID { get; set; }
        public string Comment { get; set; }
        public DateTime DatePosted { get; set; }

        public RepairGuides Guide { get; set; }
        public Users User { get; set; }
    }
}
