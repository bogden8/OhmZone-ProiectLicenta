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

        

        
        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _svc.GetAllGuidesAsync());


        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var guide = await _svc.GetGuideByIdAsync(id);
            if (guide == null) return NotFound();
            return Ok(guide);
        }





        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRepairGuideDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var guide = await _svc.CreateAsync(dto);
            return CreatedAtAction(
               nameof(Get),
               new { id = guide.GuideID },
               new { guideID = guide.GuideID, nextUrl = $"/admin/guides/{guide.GuideID}/steps" }
            );
        }

        
        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateRepairGuideDto dto)
        {
            var updated = await _svc.UpdateAsync(id, dto);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _svc.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("full")]
        public async Task<IActionResult> CreateFullGuide(
    [FromForm] string title,
    [FromForm] string categoryIdStr,
    [FromForm] string? brandIdStr,         // 🔧 NOU
    [FromForm] string? newBrandName,
    [FromForm] string? deviceIdStr,
    [FromForm] string? newDeviceName,
    [FromForm] string? part,
    [FromForm] string? content,
    [FromForm] string authorID,
    [FromForm] List<string> stepTexts,
    [FromForm] List<IFormFile> stepImages)
        {
            if (!int.TryParse(authorID, out int parsedAuthorId))
                return BadRequest("AuthorID invalid");

            // 🔧 Transmite și brandIdStr în serviciu
            var guide = await _svc.CreateFullGuideAsync(
                title, categoryIdStr, brandIdStr, newBrandName, deviceIdStr,
                newDeviceName, part, content, stepTexts, stepImages, parsedAuthorId);

            return Ok(new
            {
                guideID = guide.GuideID,
                nextUrl = $"/admin/guides/{guide.GuideID}/steps"
            });
        }


        [HttpGet("{id}/steps")]
        public async Task<IActionResult> GetGuideSteps(int id)
        {
            var guide = await _svc.GetGuideByIdAsync(id);
            if (guide == null)
                return NotFound("Ghidul nu a fost găsit.");

            var stepDtos = guide.Steps.Select(s => new GuideStepDto
            {
                GuideStepID = s.GuideStepID,
                Description = s.Description,
                ImagePath = s.ImagePath
            });

            return Ok(stepDtos);
        }






    }
}
