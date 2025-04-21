using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OhmZone_ProiectLicenta.Models
{
    public class ForumReplies
    {
        [Key]
        public int ReplyID { get; set; }
        public int ThreadID { get; set; }
        [ForeignKey("ThreadID")]
        public ForumThreads Thread { get; set; }

        public int UserID { get; set; }
        [ForeignKey("UserID")]
        public Users User { get; set; }
        public string Content { get; set; }
        public int Upvote { get; set; }
        public DateTime DatePosted { get; set; }

        
        
    }
}
