using System.ComponentModel.DataAnnotations;

namespace OhmZone_ProiectLicenta.Models
{
    public class ForumCategories
    {
        [Key]
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }

        public List<ForumPost> ForumThreads { get; set; }
    }
}
