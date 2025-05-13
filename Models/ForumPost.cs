using OhmZone_ProiectLicenta.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class ForumPost
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

    // ✅ Adăugări pentru forum extins
    public string? ImageUrl { get; set; } // pentru poza
    public string? Type { get; set; }     // question/project/discussion
    public string? About { get; set; }    // robotics/guide/other
    public string? Device { get; set; }   // PC Laptop, Phone etc.

    public List<ForumReplies> ForumReplies { get; set; } = new();
}
