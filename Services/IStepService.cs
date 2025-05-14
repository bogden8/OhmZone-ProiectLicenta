using System.Collections.Generic;
using System.Threading.Tasks;
using OhmZone_ProiectLicenta.Models;
using OhmZone_ProiectLicenta.Models.Dtos;

namespace OhmZone_ProiectLicenta.Services
{
    public interface IStepService
    {
        Task<IEnumerable<Step>> GetAllForGuideAsync(int guideId);
        Task<Step> CreateAsync(int guideId, CreateStepDto dto);
        Task<Step> UpdateAsync(int stepId, UpdateStepDto dto);
    }
}
