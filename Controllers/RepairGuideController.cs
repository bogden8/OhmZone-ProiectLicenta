using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OhmZone_ProiectLicenta.Services;
using OhmZone_ProiectLicenta.Models;
using OhmZone_ProiectLicenta.Models.Dtos;

namespace OhmZone_ProiectLicenta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RepairGuideController : ControllerBase
    {
        private readonly IRepairGuideService _svc;
        public RepairGuideController(IRepairGuideService svc) => _svc = svc;

        // --- pentru toți utilizatorii ---

        // GET /api/repairguide
        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _svc.GetAllGuidesAsync());

        // GET /api/repairguide/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id) =>
            Ok(await _svc.GetGuideByIdAsync(id));

        // --- doar ADMIN poate crea, edita sau șterge ---

        // POST /api/repairguide
      
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRepairGuideDto dto)
        {
            var guide = await _svc.CreateAsync(dto);
            return CreatedAtAction(
               nameof(Get),
               new { id = guide.GuideID },
               new { guideID = guide.GuideID, nextUrl = $"/admin/guides/{guide.GuideID}/steps" }
            );
        }

        // PUT /api/repairguide/{id}
        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateRepairGuideDto dto)
        {
            var updated = await _svc.UpdateAsync(id, dto);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        // DELETE /api/repairguide/{id}
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _svc.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
