using System.ComponentModel.DataAnnotations;

namespace OhmZone_ProiectLicenta.Models
{
    public class Category
    {
        [Key]
        public int CategoryID { get; set; }
        [Required]
        public string CategoryName { get; set; }
        public string? Slug { get; set; }
        public string? ImageUrl { get; set; }

        public List<Subcategory> Subcategories { get; set; }
        public List<RepairGuide> RepairGuides { get; set; }
        public List<ForumPost> ForumThreads { get; set; }

    }
}
