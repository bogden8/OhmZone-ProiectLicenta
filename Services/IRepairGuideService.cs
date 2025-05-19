using System.Collections.Generic;
using System.Threading.Tasks;
using OhmZone_ProiectLicenta.Models;
using OhmZone_ProiectLicenta.Models.Dtos;

namespace OhmZone_ProiectLicenta.Services
{
    public interface IRepairGuideService
    {
        Task<IEnumerable<RepairGuide>> GetAllGuidesAsync();
        Task<RepairGuide> GetGuideByIdAsync(int id);
        Task<RepairGuide> CreateAsync(CreateRepairGuideDto dto);
        Task<RepairGuide> UpdateAsync(int guideId, UpdateRepairGuideDto dto);
        Task<bool> DeleteAsync(int guideId);
    }
}
