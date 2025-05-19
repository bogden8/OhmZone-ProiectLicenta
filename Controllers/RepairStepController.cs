using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OhmZone_ProiectLicenta.Models;
using OhmZone_ProiectLicenta.Models.Dtos;
using OhmZone_ProiectLicenta.Services;  

namespace OhmZone_ProiectLicenta.Controllers
{
    [ApiController]
    [Route("api/repairguide")]
    public class RepairStepController : ControllerBase
    {
        private readonly IStepService _stepSvc;
        public RepairStepController(IStepService stepSvc) => _stepSvc = stepSvc;

        
        [HttpGet("{guideId:int}/steps")]
        public async Task<IActionResult> GetAll(int guideId) =>
            Ok(await _stepSvc.GetAllForGuideAsync(guideId));

        
        [Authorize(Roles = "Admin")]
        [HttpPost("{guideId:int}/steps")]
        public async Task<IActionResult> Create(int guideId, [FromForm] CreateStepDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var step = await _stepSvc.CreateAsync(guideId, dto);
            return CreatedAtAction(nameof(GetAll), new { guideId }, step);
        }

        
        [Authorize(Roles = "Admin")]
        [HttpPut("steps/{stepId:int}")]
        public async Task<IActionResult> Update(int stepId, [FromForm] UpdateStepDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _stepSvc.UpdateAsync(stepId, dto);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("steps/{stepId:int}")]
        public async Task<IActionResult> Delete(int stepId)
        {
            var deleted = await _stepSvc.DeleteAsync(stepId);
            if (!deleted) return NotFound();
            return NoContent();
        }

    }
}
