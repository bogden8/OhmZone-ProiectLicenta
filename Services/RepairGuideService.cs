using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OhmZone_ProiectLicenta.Data;
using OhmZone_ProiectLicenta.Models;
using OhmZone_ProiectLicenta.Models.Dtos;

namespace OhmZone_ProiectLicenta.Services
{
    public class RepairGuideService : IRepairGuideService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<RepairGuideService> _logger;
        private readonly IWebHostEnvironment _env;

        public RepairGuideService(
            AppDbContext context,
            ILogger<RepairGuideService> logger,
            IWebHostEnvironment env)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _env = env ?? throw new ArgumentNullException(nameof(env));
        }

        public async Task<RepairGuide> CreateAsync(CreateRepairGuideDto dto)
        {
            var guide = new RepairGuide
            {
                Title = dto.Title,
                CategoryID = dto.CategoryID,
                AuthorID = dto.AuthorID,
                DeviceRepID = dto.DeviceID,
                Part = dto.Part,
                Content = dto.Content,
                Rating = 0f,
                DatePublished = DateTime.UtcNow
            };

            _context.RepairGuides.Add(guide);
            await _context.SaveChangesAsync();
            return guide;
        }

        public async Task<IEnumerable<RepairGuide>> GetAllGuidesAsync()
        {
            try
            {
                return await _context.RepairGuides
                    .Include(g => g.Category)
                    .Include(g => g.Author)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all repair guides");
                throw;
            }
        }

        public async Task<RepairGuide> GetGuideByIdAsync(int id)
        {
            try
            {
                return await _context.RepairGuides
                    .Include(g => g.Category)
                    .Include(g => g.Author)
                    .Include(g => g.GuideComments)
                    .FirstOrDefaultAsync(g => g.GuideID == id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving guide with ID {id}");
                throw;
            }
        }

        public async Task<RepairGuide> UpdateAsync(int guideId, UpdateRepairGuideDto dto)
        {
            try
            {
                var existing = await _context.RepairGuides.FindAsync(guideId);
                if (existing == null) return null;

                existing.Title = dto.Title;
                existing.CategoryID = dto.CategoryID;
                existing.Content = dto.Content;

                await _context.SaveChangesAsync();
                return existing;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating guide with ID {guideId}");
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int guideId)
        {
            try
            {
                var guide = await _context.RepairGuides.FindAsync(guideId);
                if (guide == null) return false;

                _context.RepairGuides.Remove(guide);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting guide with ID {guideId}");
                throw;
            }
        }

        public async Task<RepairGuide> CreateFullGuideAsync(
            string title,
            string? deviceIdStr,
            string? newDeviceName,
            string? part,
            string? content,
            List<string> stepTexts,
            List<IFormFile> stepImages)
        {
            // Identificare sau creare device
            int? deviceId = null;
            if (!string.IsNullOrEmpty(deviceIdStr) && int.TryParse(deviceIdStr, out int parsedId))
            {
                deviceId = parsedId;
            }
            else if (!string.IsNullOrWhiteSpace(newDeviceName))
            {
                var device = new Device { Brand = "Generic", Model = newDeviceName };
                _context.Devices.Add(device);
                await _context.SaveChangesAsync();
                deviceId = device.DeviceID;
            }

            if (deviceId == null)
                throw new Exception("Device invalid.");

            // Creează ghidul principal
            var guide = new RepairGuide
            {
                Title = title,
                DeviceRepID = deviceId.Value,
                Part = part,
                Content = content,
                Rating = 0f,
                DatePublished = DateTime.UtcNow,
                GuideSteps = new List<GuideStep>()
            };

            // Folder salvare imagini
            var uploadsPath = Path.Combine(_env.WebRootPath, "uploads", "guidesteps");
            if (!Directory.Exists(uploadsPath))
                Directory.CreateDirectory(uploadsPath);

            // Adaugă fiecare pas
            for (int i = 0; i < stepTexts.Count; i++)
            {
                string imagePath = null;

                if (i < stepImages.Count && stepImages[i] != null)
                {
                    var img = stepImages[i];
                    var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(img.FileName)}";
                    var filePath = Path.Combine(uploadsPath, fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await img.CopyToAsync(stream);
                    }
                    imagePath = $"/uploads/guidesteps/{fileName}";
                }

                guide.GuideSteps.Add(new GuideStep
                {
                    StepNumber = i + 1,
                    Description = stepTexts[i],
                    ImagePath = imagePath
                });
            }

            _context.RepairGuides.Add(guide);
            await _context.SaveChangesAsync();

            return guide;
        }
    }
}
