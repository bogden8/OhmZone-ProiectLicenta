using OhmZone_ProiectLicenta.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class ForumPost
{
    [Key]
    public int ThreadID { get; set; }
    public string Title { get; set; }

    public int? CategoryID { get; set; }  // ❗️ nullable
    [ForeignKey("CategoryID")]
    public Category? Category { get; set; }  // ❗️ optional


    public int AuthorID { get; set; }
    [ForeignKey("AuthorID")]
    public Users Author { get; set; }

    public string Content { get; set; }
    public DateTime DatePosted { get; set; }

   
    public string? ImageUrl { get; set; } 
    public string? Type { get; set; }     
    public string? About { get; set; }    
    public string? Device { get; set; }  

    public List<ForumReplies> ForumReplies { get; set; } = new();
}
