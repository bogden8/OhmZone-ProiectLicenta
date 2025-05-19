using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OhmZone_ProiectLicenta.Data;
using OhmZone_ProiectLicenta.Models;
using System.Text.Json;
using System.IO;
using OhmZone_ProiectLicenta.Models.Dtos;
using Microsoft.AspNetCore.Http;

namespace OhmZone_ProiectLicenta.Services
{
    public class StepService : IStepService
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public StepService(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public async Task<IEnumerable<GuideStep>> GetAllForGuideAsync(int guideId) =>
            await _context.Steps
                          .Where(s => s.GuideID == guideId)
                          .OrderBy(s => s.Order)
                          .ToListAsync();

        public async Task<GuideStep> CreateAsync(int guideId, CreateStepDto dto)
        {
            string mainUrl = null;
            if (dto.MainImage != null)
                mainUrl = await SaveImageAsync(dto.MainImage, "uploads");

            var thumbUrls = new List<string>();
            if (dto.Thumbnails != null)
            {
                foreach (var file in dto.Thumbnails)
                    thumbUrls.Add(await SaveImageAsync(file, "uploads"));
            }

            var step = new GuideStep
            {
                GuideID = guideId,
                Text = dto.Text,
                MainImageUrl = mainUrl,
                ThumbnailUrlsJson = JsonSerializer.Serialize(thumbUrls),
                Order = await _context.Steps.CountAsync(s => s.GuideID == guideId) + 1,
                CreatedAt = DateTime.UtcNow
            };

            _context.Steps.Add(step);
            await _context.SaveChangesAsync();
            return step;
        }

        public async Task<GuideStep> UpdateAsync(int stepId, UpdateStepDto dto)
        {
            var step = await _context.Steps.FindAsync(stepId);
            if (step == null) return null;

            step.Text = dto.Text ?? step.Text;

            if (dto.MainImage != null)
                step.MainImageUrl = await SaveImageAsync(dto.MainImage, "uploads");

            if (dto.Thumbnails != null && dto.Thumbnails.Any())
            {
                var thumbs = new List<string>();
                foreach (var thumb in dto.Thumbnails)
                    thumbs.Add(await SaveImageAsync(thumb, "uploads"));

                step.ThumbnailUrlsJson = JsonSerializer.Serialize(thumbs);
            }

            await _context.SaveChangesAsync();
            return step;
        }

        public async Task<GuideStep> GetByIdAsync(int stepId)
        {
            return await _context.Steps.FindAsync(stepId);
        }

        public async Task<bool> DeleteAsync(int stepId)
        {
            var step = await _context.Steps.FindAsync(stepId);
            if (step == null) return false;

            _context.Steps.Remove(step);
            await _context.SaveChangesAsync();
            return true;
        }

        private async Task<string> SaveImageAsync(IFormFile file, string folder)
        {
            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var path = Path.Combine(_env.WebRootPath, folder, fileName);

            Directory.CreateDirectory(Path.Combine(_env.WebRootPath, folder));

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return $"/{folder}/{fileName}";
        }
    }
}
