using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OhmZone_ProiectLicenta.Models
{
    public class ForumThreads
    {
        [Key]
        public int ThreadID { get; set; }
        public string Title { get; set; }

        public int CategoryID { get; set; }
        [ForeignKey("CategoryID")]
        public ForumCategories Category { get; set; }

        public int AuthorID { get; set; }
        [ForeignKey("AuthorID")]
        public Users Author { get; set; }

        public string Content { get; set; }
        public DateTime DatePosted { get; set; }

        
        

        public List<ForumReplies> ForumReplies { get; set; } = new();
    }
}
