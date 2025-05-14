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
        public DbSet<RepairGuides> RepairGuides { get; set; }
        public DbSet<Categories> Categories { get; set; }
        public DbSet<GuideComments> GuideComments { get; set; }
        public DbSet<ForumPost> ForumThreads { get; set; } 
        public DbSet<ForumReplies> ForumReplies { get; set; }
        public DbSet<ForumCategories> ForumCategories { get; set; }
        public DbSet<RoboticsTutorials> RoboticsTutorials { get; set; }
        public DbSet<Device> Devices { get; set; }
        public DbSet<Step> Steps { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ——— RepairGuides → Category ———
            modelBuilder.Entity<RepairGuides>()
                .HasOne(rg => rg.Category)
                .WithMany(c => c.RepairGuides)
                .HasForeignKey(rg => rg.CategoryID);

            // ——— RepairGuides → Author ———
            modelBuilder.Entity<RepairGuides>()
                .HasOne(rg => rg.Author)
                .WithMany(u => u.RepairGuides)
                .HasForeignKey(rg => rg.AuthorID);

            // ——— RepairGuides → Device ———
            modelBuilder.Entity<RepairGuides>()
                .HasOne(rg => rg.Device)
                .WithMany()
                .HasForeignKey(rg => rg.DeviceID)
                .OnDelete(DeleteBehavior.Restrict);

            // ——— Step → RepairGuide ———
            modelBuilder.Entity<Step>()
                .HasOne(s => s.Guide)
                .WithMany(rg => rg.Steps)
                .HasForeignKey(s => s.GuideID)
                .OnDelete(DeleteBehavior.Cascade);

            // ——— ForumPost (Thread) Relationships ———
            modelBuilder.Entity<ForumPost>()
                .HasOne(fp => fp.Category)
                .WithMany(fc => fc.ForumThreads)
                .HasForeignKey(fp => fp.CategoryID);

            modelBuilder.Entity<ForumPost>()
                .HasOne(fp => fp.Author)
                .WithMany(u => u.ForumThreads)
                .HasForeignKey(fp => fp.AuthorID);

            // ——— ForumReplies ———
            modelBuilder.Entity<ForumReplies>()
                .HasOne(fr => fr.Thread)
                .WithMany(fp => fp.ForumReplies)
                .HasForeignKey(fr => fr.ThreadID);

            modelBuilder.Entity<ForumReplies>()
                .HasOne(fr => fr.User)
                .WithMany(u => u.ForumReplies)
                .HasForeignKey(fr => fr.UserID);

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
        }
    }
}
