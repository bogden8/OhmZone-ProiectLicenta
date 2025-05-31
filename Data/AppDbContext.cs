using System;
using Microsoft.EntityFrameworkCore;
using OhmZone_ProiectLicenta.Models;

namespace OhmZone_ProiectLicenta.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=bogden;Database=OhmZoneDB;Trusted_Connection=True;");
            }
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<RepairGuide> RepairGuides { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<GuideComments> GuideComments { get; set; }
        public DbSet<ForumPost> ForumThreads { get; set; }
        public DbSet<ForumReplies> ForumReplies { get; set; }
        public DbSet<RoboticsTutorials> RoboticsTutorials { get; set; }
        public DbSet<Device> Devices { get; set; }
        public DbSet<GuideStep> Steps { get; set; }
        public DbSet<Subcategory> Subcategories { get; set; }
        public DbSet<Brand> Brands { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ——— RepairGuide → Category ———
            modelBuilder.Entity<RepairGuide>()
                .HasOne(rg => rg.Category)
                .WithMany(c => c.RepairGuides)
                .HasForeignKey(rg => rg.CategoryID);

            // ——— RepairGuide → Author ———
            modelBuilder.Entity<RepairGuide>()
                .HasOne(rg => rg.Author)
                .WithMany(u => u.RepairGuides)
                .HasForeignKey(rg => rg.AuthorID);

            // ——— RepairGuide → Device ———
            modelBuilder.Entity<RepairGuide>()
                .HasOne(rg => rg.Device)
                .WithMany(d => d.RepairGuides)
                .HasForeignKey(rg => rg.DeviceID)
                .OnDelete(DeleteBehavior.Restrict);

            // ——— GuideStep → RepairGuide ———
            modelBuilder.Entity<GuideStep>()
                .HasOne(s => s.Guide)
                .WithMany(rg => rg.Steps)
                .HasForeignKey(s => s.GuideID)
                .OnDelete(DeleteBehavior.Cascade);

            // ——— GuideComments ———
            modelBuilder.Entity<GuideComments>()
                .HasOne(gc => gc.Guide)
                .WithMany(rg => rg.GuideComments)
                .HasForeignKey(gc => gc.GuideID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<GuideComments>()
                .HasOne(gc => gc.User)
                .WithMany(u => u.GuideComments)
                .HasForeignKey(gc => gc.UserID)
                .OnDelete(DeleteBehavior.Restrict);

            // ——— ForumPost → ForumCategories ———
            modelBuilder.Entity<ForumPost>()
                .HasOne(fp => fp.Category)
                .WithMany(fc => fc.ForumThreads)
                .HasForeignKey(fp => fp.CategoryID);

            modelBuilder.Entity<ForumPost>()
    .HasOne(fp => fp.Category)
    .WithMany(fc => fc.ForumThreads)
    .HasForeignKey(fp => fp.CategoryID)
    .IsRequired(false); // 🔧 face relația opțională


            // ——— ForumReplies ———
            modelBuilder.Entity<ForumReplies>()
                .HasOne(fr => fr.Thread)
                .WithMany(fp => fp.ForumReplies)
                .HasForeignKey(fr => fr.ThreadID);

            modelBuilder.Entity<ForumReplies>()
    .HasOne(fr => fr.User)
    .WithMany(u => u.ForumReplies)
    .HasForeignKey(fr => fr.UserID)
    .OnDelete(DeleteBehavior.Restrict); // ✅ fixă problema


            // ——— RoboticsTutorials ———
            modelBuilder.Entity<RoboticsTutorials>()
                .HasOne(rt => rt.Author)
                .WithMany(u => u.RoboticsTutorials)
                .HasForeignKey(rt => rt.AuthorID);

            // ——— Unique constraints ———
            modelBuilder.Entity<Users>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Users>()
                .HasIndex(u => u.Username)
                .IsUnique();

            // ——— Subcategory → Category ———
            modelBuilder.Entity<Subcategory>()
                .HasOne(sc => sc.Category)
                .WithMany(c => c.Subcategories)
                .HasForeignKey(sc => sc.CategoryID)
                .OnDelete(DeleteBehavior.Cascade);

            // ——— Brand → Subcategory ———
            modelBuilder.Entity<Brand>()
                .HasOne(b => b.Subcategory)
                .WithMany(sc => sc.Brands)
                .HasForeignKey(b => b.SubcategoryID)
                .OnDelete(DeleteBehavior.Cascade);

            // ——— Device → Brand ———
            modelBuilder.Entity<Device>()
                .HasOne(d => d.Brand)
                .WithMany(b => b.Devices)
                .HasForeignKey(d => d.BrandID)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
