using System.Collections.Generic;
using System.Threading.Tasks;
using OhmZone_ProiectLicenta.Models;
using OhmZone_ProiectLicenta.Models.Dtos;

namespace OhmZone_ProiectLicenta.Services
{
    public interface IStepService
    {
        Task<IEnumerable<GuideStep>> GetAllForGuideAsync(int guideId);
        Task<GuideStep> CreateAsync(int guideId, CreateStepDto dto);
        Task<GuideStep> UpdateAsync(int stepId, UpdateStepDto dto);
        Task<bool> DeleteAsync(int stepId); // Pentru ștergerea unui pas
        Task<GuideStep> GetByIdAsync(int stepId); // Pentru editare din frontend (pre-umplere formular)
    }
}
