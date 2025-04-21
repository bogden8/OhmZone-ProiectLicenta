using Microsoft.AspNetCore.Mvc;
using OhmZone_ProiectLicenta.Models;
using OhmZone_ProiectLicenta.Services;

namespace OhmZone_ProiectLicenta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RepairGuideController : ControllerBase
    {
        private readonly IRepairGuideService _repairGuideService;

        public RepairGuideController(IRepairGuideService repairGuideService)
        {
            _repairGuideService = repairGuideService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var guides = await _repairGuideService.GetAllGuidesAsync();
            return Ok(guides);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var guide = await _repairGuideService.GetGuideByIdAsync(id);
            if (guide == null)
                return NotFound();

            return Ok(guide);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string term)
        {
            var results = await _repairGuideService.SearchGuidesAsync(term);
            return Ok(results);
        }

        [HttpGet("category/{categoryName}")]
        public async Task<IActionResult> GetByCategory(string categoryName)
        {
            var guides = await _repairGuideService.GetGuidesByCategoryAsync(categoryName);
            return Ok(guides);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] RepairGuides guide)
        {
            var created = await _repairGuideService.CreateGuideAsync(guide);
            return CreatedAtAction(nameof(GetById), new { id = created.GuideID }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] RepairGuides guide)
        {
            if (id != guide.GuideID)
                return BadRequest("ID mismatch");

            var updated = await _repairGuideService.UpdateGuideAsync(guide);
            if (updated == null)
                return NotFound();

            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _repairGuideService.DeleteGuideAsync(id);
            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}
