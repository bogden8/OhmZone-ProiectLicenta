using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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

        public RepairGuideService(
            AppDbContext context,
            ILogger<RepairGuideService> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        // --- Create a new manual guide ---
        public async Task<RepairGuides> CreateAsync(CreateRepairGuideDto dto)
        {
            var guide = new RepairGuides
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

        // --- Read all ---
        public async Task<IEnumerable<RepairGuides>> GetAllGuidesAsync()
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

        // --- Read by ID ---
        public async Task<RepairGuides> GetGuideByIdAsync(int id)
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

        // --- Update existing ---
        public async Task<RepairGuides> UpdateAsync(int guideId, UpdateRepairGuideDto dto)
        {
            try
            {
                var existing = await _context.RepairGuides.FindAsync(guideId);
                if (existing == null) return null;

                existing.Title = dto.Title;
                existing.CategoryID = dto.CategoryID;
                existing.Content = dto.Content;
                // If you have Rating or other fields, map them here

                await _context.SaveChangesAsync();
                return existing;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating guide with ID {guideId}");
                throw;
            }
        }

        // --- Delete ---
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
    }
}
