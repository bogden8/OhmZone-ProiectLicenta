using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OhmZone_ProiectLicenta.Models
{
    public class Users
    {
        [Key]
        public int UserID { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public string Role { get; set; } = "User";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public List<FavoriteGuide> FavoriteGuides { get; set; }

        public ICollection<RepairGuide> RepairGuides { get; set; }
        public ICollection<ForumPost> ForumThreads { get; set; }
        public ICollection<ForumReplies> ForumReplies { get; set; }
        public ICollection<GuideComments> GuideComments { get; set; }
        public ICollection<RoboticsTutorials> RoboticsTutorials { get; set; }
    }
}
