using System.Collections.Generic;
using System.Threading.Tasks;
using OhmZone_ProiectLicenta.Models;
using OhmZone_ProiectLicenta.Models.Dtos;

namespace OhmZone_ProiectLicenta.Services
{
    public interface IRepairGuideService
    {
        Task<IEnumerable<RepairGuides>> GetAllGuidesAsync();
        Task<RepairGuides> GetGuideByIdAsync(int id);
        Task<RepairGuides> CreateAsync(CreateRepairGuideDto dto);
        Task<RepairGuides> UpdateAsync(int guideId, UpdateRepairGuideDto dto);
        Task<bool> DeleteAsync(int guideId);
    }
}
