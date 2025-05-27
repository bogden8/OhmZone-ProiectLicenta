using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OhmZone_ProiectLicenta.Data;
using OhmZone_ProiectLicenta.Models;
using OhmZone_ProiectLicenta.Models.Dtos;
using System.Security.Claims;

namespace OhmZone_ProiectLicenta.Controllers
{
    [ApiController]
    [Route("api/forum-posts")]
    public class ForumPostController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ForumPostController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<IActionResult> CreatePost([FromForm] CreateForumPostDto dto)

        {
            Console.WriteLine("✔ Autentificat: " + User.Identity?.IsAuthenticated);
            Console.WriteLine("✔ CLAIMURI:");
            foreach (var claim in User.Claims)
            {
                Console.WriteLine($"  {claim.Type} => {claim.Value}");
            }

            var userIdStr = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            Console.WriteLine("✔ userIdStr extras: " + userIdStr);

            if (!int.TryParse(userIdStr, out int userId))
                return Unauthorized();

            string? imagePath = null;

            if (dto.Image != null)
            {
                var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Image.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(stream);
                }

                imagePath = $"/uploads/{fileName}";
            }

            var thread = new ForumPost
            {
                Title = dto.Title,
                CategoryID = dto.CategoryID,
                AuthorID = userId, // 🔁 Folosim userul din JWT
                Content = dto.Content,
                DatePosted = DateTime.UtcNow,
                Type = dto.Type,
                About = dto.About,
                Device = dto.Device,
                ImageUrl = imagePath
            };

            _context.ForumThreads.Add(thread);
            await _context.SaveChangesAsync();

            return Ok(thread);
        }




        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var posts = await _context.ForumThreads
                .Include(t => t.Author)
                .OrderByDescending(t => t.DatePosted)
                .Select(t => new
                {
                    ThreadID = t.ThreadID,
                    Title = t.Title,
                    Content = t.Content,
                    ImageUrl = t.ImageUrl,
                    Type = t.Type,
                    About = t.About,
                    Device = t.Device,
                    DatePosted = t.DatePosted,
                    Author = new
                    {
                        Username = t.Author.Username
                    }
                })
                .ToListAsync();

            return Ok(posts);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var post = await _context.ForumThreads
                .Include(t => t.Author)
                .Include(t => t.ForumReplies)
                    .ThenInclude(r => r.User)
                .FirstOrDefaultAsync(t => t.ThreadID == id);

            if (post == null)
                return NotFound();

            return Ok(new
            {
                post.ThreadID,
                post.Title,
                post.Content,
                post.ImageUrl,
                post.Type,
                post.About,
                post.Device,
                post.DatePosted,

                AuthorID = post.AuthorID, // 🔥 asta lipsește acum
                Author = new
                {
                    Username = post.Author?.Username
                },

                ForumReplies = post.ForumReplies.Select(r => new
                {
                    r.ReplyID,
                    r.Content,
                    r.DatePosted,
                    r.UserID, // 🔥 verifică că apare și acesta
                    User = new
                    {
                        Username = r.User?.Username
                    }
                }).ToList()
            });
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id, [FromQuery] bool hard = false)
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            if (!int.TryParse(userIdStr, out int userId))
                return Unauthorized();

            var post = await _context.ForumThreads.FindAsync(id);
            if (post == null)
                return NotFound();

            if (hard)
            {
                if (userRole != "Admin")
                    return Forbid();

                _context.ForumThreads.Remove(post);
                await _context.SaveChangesAsync();
                return NoContent();
            }

            if (post.AuthorID != userId && userRole != "Admin")
                return Forbid();

            post.Title = "[Postare ștearsă de autor]";
            post.Content = "Această postare a fost ștearsă de utilizator.";
            post.ImageUrl = null;

            await _context.SaveChangesAsync();
            return NoContent();
        }





    }
}
