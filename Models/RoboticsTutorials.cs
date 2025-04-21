using System.ComponentModel.DataAnnotations;
namespace OhmZone_ProiectLicenta.Models
{
    public class RoboticsTutorials
    {
        [Key]
        public int TutorialID { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        public int AuthorID { get; set; }
        public double Rating { get; set; }
        public DateTime DatePublished { get; set; }

        public Users Author { get; set; }
    }
}
