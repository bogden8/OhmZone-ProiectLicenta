using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OhmZone_ProiectLicenta.Data;
using OhmZone_ProiectLicenta.Models;
using System.Security.Claims;

namespace OhmZone_ProiectLicenta.Controllers
{
    [ApiController]
    [Route("api/favorites")]
    public class FavoriteGuidesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FavoriteGuidesController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Adaugă un ghid la favorite
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("{guideId}")]
        public async Task<IActionResult> AddFavorite(int guideId)
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdStr, out int userId))
                return Unauthorized();

            var alreadyFavorite = await _context.FavoriteGuides
                .AnyAsync(f => f.GuideID == guideId && f.UserID == userId);

            if (alreadyFavorite)
                return BadRequest("Ghidul este deja la favorite.");

            var favorite = new FavoriteGuide
            {
                GuideID = guideId,
                UserID = userId,
                DateSaved = DateTime.UtcNow
            };

            _context.FavoriteGuides.Add(favorite);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // ❌ Elimină un ghid din favorite
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{guideId}")]
        public async Task<IActionResult> RemoveFavorite(int guideId)
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdStr, out int userId))
                return Unauthorized();

            var favorite = await _context.FavoriteGuides
                .FirstOrDefaultAsync(f => f.GuideID == guideId && f.UserID == userId);

            if (favorite == null)
                return NotFound();

            _context.FavoriteGuides.Remove(favorite);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // 📄 Returnează toate ghidurile favorite ale userului curent
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet]
        public async Task<IActionResult> GetFavorites()
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdStr, out int userId))
                return Unauthorized();

            var favorites = await _context.FavoriteGuides
                .Where(f => f.UserID == userId)
                .Include(f => f.Guide)
                    .ThenInclude(g => g.Device)
                .Select(f => new
                {
                    f.Guide.GuideID,
                    f.Guide.Title,
                    f.Guide.Part,
                    DeviceName = f.Guide.Device.Model, // 🛠️ fix aici
                    f.DateSaved                        // 🛠️ asigură-te că este în model
                })
                .ToListAsync();

            return Ok(favorites);
        }
    }
}
