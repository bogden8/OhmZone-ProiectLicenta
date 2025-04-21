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

        public string Content { get; set; }

        public float Rating { get; set; }

        public DateTime DatePublished { get; set; }

        public ICollection<GuideComments> GuideComments { get; set; }

    }
}
