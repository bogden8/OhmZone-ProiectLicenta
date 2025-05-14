using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OhmZone_ProiectLicenta.Data;
using OhmZone_ProiectLicenta.Models;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class RoboticsController : ControllerBase
{
    private readonly AppDbContext _ctx;
    public RoboticsController(AppDbContext ctx) => _ctx = ctx;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        
        var items = await _ctx.RoboticsTutorials
            .Select(r => new {
                r.TutorialID,
                r.Title,
                r.Description,
                r.ImageUrl
            })
            .ToListAsync();
        return Ok(items);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] RoboticsDto dto)
    {
        var entity = new RoboticsTutorials
        {
            Title = dto.Title,
            Description = dto.Description,
            ImageUrl = dto.ImageUrl,
            CreatedAt = DateTime.UtcNow
        };
        _ctx.RoboticsTutorials.Add(entity);
        await _ctx.SaveChangesAsync();
        return CreatedAtAction(null, new { id = entity.TutorialID }, entity);
    }
}

public class RoboticsDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
}
