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

        public async Task<IEnumerable<Step>> GetAllForGuideAsync(int guideId) =>
            await _context.Steps
                          .Where(s => s.GuideID == guideId)
                          .OrderBy(s => s.Order)
                          .ToListAsync();

        public async Task<Step> CreateAsync(int guideId, CreateStepDto dto)
        {
            
            var uploadsDir = Path.Combine(_env.WebRootPath, "uploads");
            Directory.CreateDirectory(uploadsDir);

            string mainUrl = null;
            if (dto.MainImage != null)
            {
                var fn = $"{Guid.NewGuid()}{Path.GetExtension(dto.MainImage.FileName)}";
                var fp = Path.Combine(uploadsDir, fn);
                using var fs = File.Create(fp);
                await dto.MainImage.CopyToAsync(fs);
                mainUrl = $"/uploads/{fn}";
            }

            var thumbUrls = new List<string>();
            if (dto.Thumbnails != null)
            {
                foreach (var file in dto.Thumbnails)
                {
                    var fn = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
                    var fp = Path.Combine(uploadsDir, fn);
                    using var fs = File.Create(fp);
                    await file.CopyToAsync(fs);
                    thumbUrls.Add($"/uploads/{fn}");
                }
            }

            
            var step = new Step
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

        public async Task<Step> UpdateAsync(int stepId, UpdateStepDto dto)
        {
            var step = await _context.Steps.FindAsync(stepId);
            if (step == null) return null;

            step.Text = dto.Text ?? step.Text;

            await _context.SaveChangesAsync();
            return step;
        }
    }
}
