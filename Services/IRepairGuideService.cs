using System.Collections.Generic;
using System.Threading.Tasks;
using OhmZone_ProiectLicenta.Models;
using OhmZone_ProiectLicenta.Models.Dtos;
using Microsoft.AspNetCore.Http;

namespace OhmZone_ProiectLicenta.Services
{
    public interface IRepairGuideService
    {
        Task<IEnumerable<RepairGuide>> GetAllGuidesAsync();
        Task<RepairGuide> GetGuideByIdAsync(int id);
        Task<RepairGuide> CreateAsync(CreateRepairGuideDto dto);
        Task<RepairGuide> UpdateAsync(int guideId, UpdateRepairGuideDto dto);
        Task<bool> DeleteAsync(int guideId);

        Task<RepairGuide> CreateFullGuideAsync(
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
            int authorID,
            string? deviceImageUrl // ✅ adăugat aici
        );
    }
}
