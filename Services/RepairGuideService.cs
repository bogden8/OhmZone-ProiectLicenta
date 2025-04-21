using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OhmZone_ProiectLicenta.Data;
using OhmZone_ProiectLicenta.Models;

namespace OhmZone_ProiectLicenta.Services
{
    public interface IRepairGuideService
    {
        Task<IEnumerable<RepairGuides>> GetAllGuidesAsync();
        Task<RepairGuides> GetGuideByIdAsync(int id);
        Task<IEnumerable<RepairGuides>> SearchGuidesAsync(string searchTerm);
        Task<RepairGuides> CreateGuideAsync(RepairGuides guide);
        Task<RepairGuides> UpdateGuideAsync(RepairGuides guide);
        Task<bool> DeleteGuideAsync(int id);
        Task<IEnumerable<RepairGuides>> GetGuidesByCategoryAsync(string category);
    }

    public class RepairGuideService : IRepairGuideService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<RepairGuideService> _logger;

        public RepairGuideService(AppDbContext context, ILogger<RepairGuideService> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

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
                _logger.LogError(ex, "Error occurred while retrieving all repair guides");
                throw;
            }
        }

        public async Task<RepairGuides> GetGuideByIdAsync(int id)
        {
            try
            {
                var guide = await _context.RepairGuides
                    .Include(g => g.Category)
                    .Include(g => g.Author)
                    .Include(g => g.GuideComments)
                    .FirstOrDefaultAsync(g => g.GuideID == id); // <- modificat Id în GuideID

                return guide;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving repair guide with ID: {id}");
                throw;
            }
        }

        public async Task<IEnumerable<RepairGuides>> SearchGuidesAsync(string searchTerm)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(searchTerm))
                    return await GetAllGuidesAsync();

                return await _context.RepairGuides
                    .Include(g => g.Category)
                    .Include(g => g.Author)
                    .Where(g => g.Title.Contains(searchTerm) ||
                                g.Content.Contains(searchTerm) || // Description nu există, am folosit Content
                                g.Category.CategoryName.Contains(searchTerm)) // <- modificat Name în CategoryName
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while searching repair guides with term: {searchTerm}");
                throw;
            }
        }

        public async Task<RepairGuides> CreateGuideAsync(RepairGuides guide)
        {
            try
            {
                guide.DatePublished = DateTime.UtcNow;

                _context.RepairGuides.Add(guide);
                await _context.SaveChangesAsync();

                return guide;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating a new repair guide");
                throw;
            }
        }

        public async Task<RepairGuides> UpdateGuideAsync(RepairGuides guide)
        {
            try
            {
                var existingGuide = await _context.RepairGuides.FindAsync(guide.GuideID); // <- modificat Id în GuideID

                if (existingGuide == null)
                    return null;

                guide.DatePublished = existingGuide.DatePublished;

                _context.Entry(existingGuide).State = EntityState.Detached;
                _context.Entry(guide).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return guide;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating repair guide with ID: {guide.GuideID}");
                throw;
            }
        }

        public async Task<bool> DeleteGuideAsync(int id)
        {
            try
            {
                var guide = await _context.RepairGuides.FindAsync(id);

                if (guide == null)
                    return false;

                _context.RepairGuides.Remove(guide);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting repair guide with ID: {id}");
                throw;
            }
        }

        public async Task<IEnumerable<RepairGuides>> GetGuidesByCategoryAsync(string category)
        {
            try
            {
                return await _context.RepairGuides
                    .Include(g => g.Category)
                    .Include(g => g.Author)
                    .Where(g => g.Category.CategoryName == category) // <- modificat Name în CategoryName
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving repair guides for category: {category}");
                throw;
            }
        }
    }
}
