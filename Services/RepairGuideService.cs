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
        private readonly IHttpContextAccessor _httpContextAccessor;

        public RepairGuideService(
            AppDbContext context,
            ILogger<RepairGuideService> logger,
            IWebHostEnvironment env,
            IHttpContextAccessor httpContextAccessor)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _env = env ?? throw new ArgumentNullException(nameof(env));
            _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        }

        public async Task<RepairGuide> CreateAsync(CreateRepairGuideDto dto)
        {
            var guide = new RepairGuide
            {
                Title = dto.Title,
                CategoryID = dto.CategoryID,
                AuthorID = dto.AuthorID,
                DeviceID = dto.DeviceID,
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
                    .Include(g => g.Steps)
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
            string categoryIdStr,
            string? brandIdStr,
            string? newBrandName,
            string? deviceIdStr,
            string? newDeviceName,
            string? part,
            string? content,
            List<string> stepTexts,
            List<IFormFile> stepImages,
            int authorID)
        {
            Console.WriteLine("Saving guide with AuthorID: " + authorID);

            if (string.IsNullOrWhiteSpace(title) || string.IsNullOrWhiteSpace(categoryIdStr) || stepTexts.Count == 0)
                throw new ArgumentException("Missing required fields");

            int? categoryId = null;
            int? brandId = null;
            int? deviceId = null;

            if (!string.IsNullOrEmpty(categoryIdStr) && int.TryParse(categoryIdStr, out int catId))
                categoryId = catId;

            if (!string.IsNullOrEmpty(deviceIdStr) && int.TryParse(deviceIdStr, out int parsedDeviceId))
            {
                deviceId = parsedDeviceId;
            }
            else if (!string.IsNullOrWhiteSpace(newDeviceName))
            {
                if (!string.IsNullOrWhiteSpace(brandIdStr) && int.TryParse(brandIdStr, out int parsedBrandId))
                {
                    brandId = parsedBrandId;
                }
                else if (!string.IsNullOrWhiteSpace(newBrandName))
                {
                    var existingBrand = await _context.Brands.FirstOrDefaultAsync(b => b.Name == newBrandName);
                    if (existingBrand == null)
                    {
                        existingBrand = new Brand { Name = newBrandName };
                        _context.Brands.Add(existingBrand);
                        await _context.SaveChangesAsync();
                    }
                    brandId = existingBrand.BrandID;
                }

                if (brandId == null)
                    throw new Exception("Brand required for new device");

                var newDevice = new Device
                {
                    Model = newDeviceName,
                    BrandID = brandId.Value,
                    Slug = GenerateSlug(newDeviceName)
                };

                _context.Devices.Add(newDevice);
                await _context.SaveChangesAsync();
                deviceId = newDevice.DeviceID;
            }

            if (deviceId == null || categoryId == null)
                throw new Exception("Invalid device or category");

            var guide = new RepairGuide
            {
                Title = title,
                CategoryID = categoryId.Value,
                DeviceID = deviceId.Value,
                Part = part,
                Content = content,
                Rating = 0f,
                DatePublished = DateTime.UtcNow,
                AuthorID = authorID,
                Steps = new List<GuideStep>()
            };

            var uploadsPath = Path.Combine(_env.WebRootPath, "uploads", "guidestepsphotos");
            if (!Directory.Exists(uploadsPath))
                Directory.CreateDirectory(uploadsPath);

            for (int i = 0; i < stepTexts.Count; i++)
            {
                string? imagePath = null;
                if (i < stepImages.Count && stepImages[i] != null)
                {
                    var img = stepImages[i];
                    var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(img.FileName)}";
                    var filePath = Path.Combine(uploadsPath, fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                        await img.CopyToAsync(stream);
                    imagePath = $"/uploads/guidestepsphotos/{fileName}";
                }

                guide.Steps.Add(new GuideStep
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

        // 🔧 Funcție utilitară pentru generare slug
        private string GenerateSlug(string input)
        {
            return input
                .Trim()
                .ToLower()
                .Replace("ă", "a")
                .Replace("â", "a")
                .Replace("î", "i")
                .Replace("ș", "s")
                .Replace("ț", "t")
                .Replace(" ", "-")
                .Replace(".", "")
                .Replace(",", "")
                .Replace("/", "-");
        }
    }
}
