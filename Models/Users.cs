using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OhmZone_ProiectLicenta.Models
{
    public class Users
    {
        [Key]
        public int UserID { get; set; }

        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Role { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation properties for related entities
        public ICollection<RepairGuides> RepairGuides { get; set; }
        public ICollection<ForumThreads> ForumThreads { get; set; }
        public ICollection<ForumReplies> ForumReplies { get; set; }
        public ICollection<GuideComments> GuideComments { get; set; }

        // Add the navigation property for RoboticsTutorials
        public ICollection<RoboticsTutorials> RoboticsTutorials { get; set; }  // This is the new property
    }
}
