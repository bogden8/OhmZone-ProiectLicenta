namespace OhmZone_ProiectLicenta.Data
{
    using Microsoft.EntityFrameworkCore;
    using OhmZone_ProiectLicenta.Models;

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server = bogden; Database = OhmZoneDB; Trusted_Connection = True;");
            }
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<RepairGuides> RepairGuides { get; set; }
        public DbSet<Categories> Categories { get; set; }
        public DbSet<GuideComments> GuideComments { get; set; }
        public DbSet<ForumThreads> ForumThreads { get; set; }
        public DbSet<ForumReplies> ForumReplies { get; set; }
        public DbSet<ForumCategories> ForumCategories { get; set; }
        public DbSet<RoboticsTutorials> RoboticsTutorials { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // One-to-Many Relationships
            modelBuilder.Entity<RepairGuides>()
                .HasOne(rg => rg.Category)
                .WithMany(c => c.RepairGuides)
                .HasForeignKey(rg => rg.CategoryID);

            modelBuilder.Entity<RepairGuides>()
                .HasOne(rg => rg.Author)
                .WithMany(u => u.RepairGuides)
                .HasForeignKey(rg => rg.AuthorID);

            modelBuilder.Entity<ForumThreads>()
                .HasOne(ft => ft.Category)
                .WithMany(fc => fc.ForumThreads)
                .HasForeignKey(ft => ft.CategoryID);

            modelBuilder.Entity<ForumThreads>()
                .HasOne(ft => ft.Author)
                .WithMany(u => u.ForumThreads)
                .HasForeignKey(ft => ft.AuthorID);

            modelBuilder.Entity<ForumReplies>()
                .HasOne(fr => fr.Thread)
                .WithMany(ft => ft.ForumReplies)
                .HasForeignKey(fr => fr.ThreadID);

            modelBuilder.Entity<ForumReplies>()
                .HasOne(fr => fr.User)
                .WithMany(u => u.ForumReplies)
                .HasForeignKey(fr => fr.UserID);

            // GuideComments Relationships
            modelBuilder.Entity<GuideComments>()
                .HasOne(gc => gc.Guide)  // Each GuideComment references a RepairGuide
                .WithMany(rg => rg.GuideComments)  // A RepairGuide has many GuideComments
                .HasForeignKey(gc => gc.GuideID)  // Foreign key in GuideComments
                .OnDelete(DeleteBehavior.Cascade); // Optionally delete related comments when the guide is deleted

            modelBuilder.Entity<GuideComments>()
                .HasOne(gc => gc.User)  // Each GuideComment references a User
                .WithMany(u => u.GuideComments)  // A User has many GuideComments
                .HasForeignKey(gc => gc.UserID)  // Foreign key in GuideComments
                .OnDelete(DeleteBehavior.Restrict); // Prevent accidental deletion of comments when User is deleted

            // RoboticsTutorials Relationships
            modelBuilder.Entity<RoboticsTutorials>()
                .HasOne(rt => rt.Author)
                .WithMany(u => u.RoboticsTutorials)
                .HasForeignKey(rt => rt.AuthorID);

            
        }
    }
}
