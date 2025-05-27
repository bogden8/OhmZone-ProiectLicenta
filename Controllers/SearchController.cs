using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OhmZone_ProiectLicenta.Data;

namespace OhmZone_ProiectLicenta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly AppDbContext _ctx;

        public SearchController(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] string q)
        {
            if (string.IsNullOrWhiteSpace(q))
                return BadRequest("Termenul este gol.");

            var guides = await _ctx.RepairGuides
                .Where(g => g.Title.Contains(q) || g.Content.Contains(q))
                .Select(g => new
                {
                    id = g.GuideID,
                    title = g.Title,
                    description = g.Content,
                    type = "repair"
                })
                .ToListAsync();

            var tutorials = await _ctx.RoboticsTutorials
                .Where(r => r.Title.Contains(q) || r.Description.Contains(q))
                .Select(r => new
                {
                    id = r.TutorialID,
                    title = r.Title,
                    description = r.Description,
                    type = "robotics"
                })
                .ToListAsync();

            var results = guides.Concat(tutorials).ToList();
            return Ok(results);
        }
    }
}
