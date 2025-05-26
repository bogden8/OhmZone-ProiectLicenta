// RoboticsController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OhmZone_ProiectLicenta.Data;
using OhmZone_ProiectLicenta.Models;
using OhmZone_ProiectLicenta.Models.Dtos; // 👉 aici importi DTO-ul extern
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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
                r.ImageUrl,
                r.DatePublished,
                AuthorName = r.Author.Username // doar dacă `Author` e conectat
            })
            .ToListAsync();

        return Ok(items);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] RoboticsDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdStr, out int authorId))
            return Unauthorized("ID utilizator invalid sau lipsă.");

        var entity = new RoboticsTutorials
        {
            Title = dto.Title,
            Description = dto.Description,
            Content = dto.Content,
            ImageUrl = dto.ImageUrl,
            CreatedAt = DateTime.UtcNow,
            DatePublished = DateTime.UtcNow,
            AuthorID = authorId
        };

        _ctx.RoboticsTutorials.Add(entity);
        await _ctx.SaveChangesAsync();
        return CreatedAtAction(null, new { id = entity.TutorialID }, entity);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("upload")]
    public async Task<IActionResult> UploadTutorial([FromForm] RoboticsUploadDto dto)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdStr, out int authorId))
            return Unauthorized("ID utilizator invalid.");

        // Salvează fișierul în wwwroot/uploads/
        if (dto.Image != null && dto.Image.Length > 0)
        {
            var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");
            Directory.CreateDirectory(uploadsPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Image.FileName);
            var filePath = Path.Combine(uploadsPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.Image.CopyToAsync(stream);
            }

            var tutorial = new RoboticsTutorials
            {
                Title = dto.Title,
                Description = dto.Description,
                Content = dto.Content,
                ImageUrl = $"/uploads/{fileName}",
                AuthorID = authorId,
                CreatedAt = DateTime.UtcNow,
                DatePublished = DateTime.UtcNow
            };

            _ctx.RoboticsTutorials.Add(tutorial);
            await _ctx.SaveChangesAsync();

            return CreatedAtAction(null, new { id = tutorial.TutorialID }, tutorial);
        }

        return BadRequest("Imaginea este necesară.");
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var tutorial = await _ctx.RoboticsTutorials
            .Include(r => r.Author)
            .FirstOrDefaultAsync(r => r.TutorialID == id);

        if (tutorial == null)
            return NotFound("Tutorialul nu există.");

        return Ok(new
        {
            tutorial.TutorialID,
            tutorial.Title,
            tutorial.Description,
            tutorial.Content,
            tutorial.ImageUrl,
            tutorial.DatePublished,
            AuthorName = tutorial.Author?.Username
        });
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var tutorial = await _ctx.RoboticsTutorials.FindAsync(id);
        if (tutorial == null)
            return NotFound("Tutorialul nu există.");

        _ctx.RoboticsTutorials.Remove(tutorial);
        await _ctx.SaveChangesAsync();
        return NoContent();
    }
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] RoboticsDto dto)
    {
        var tutorial = await _ctx.RoboticsTutorials.FindAsync(id);
        if (tutorial == null) return NotFound("Tutorialul nu există.");

        tutorial.Title = dto.Title;
        tutorial.Description = dto.Description;
        tutorial.Content = dto.Content;
        tutorial.ImageUrl = dto.ImageUrl;
        tutorial.DatePublished = DateTime.UtcNow;

        await _ctx.SaveChangesAsync();
        return NoContent();
    }

}
