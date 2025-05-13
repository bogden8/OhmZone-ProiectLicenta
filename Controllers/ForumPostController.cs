using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OhmZone_ProiectLicenta.Data;
using OhmZone_ProiectLicenta.Models;
using OhmZone_ProiectLicenta.Models.Dtos;

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

        // ✅ Creare postare (cu imagine opțională)
        [HttpPost]
        public async Task<IActionResult> CreatePost([FromForm] CreateForumPostDto dto)
        {
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
                AuthorID = dto.AuthorID,
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

        // ✅ Returnează doar datele utile – fără recursivitate infinită
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

        // ✅ Detalii postare + răspunsuri
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var post = await _context.ForumThreads
                .Where(t => t.ThreadID == id)
                .Select(t => new
                {
                    t.ThreadID,
                    t.Title,
                    t.Content,
                    t.ImageUrl,
                    t.Type,
                    t.About,
                    t.Device,
                    t.DatePosted,
                    Author = new
                    {
                        t.Author.Username
                    },
                    ForumReplies = t.ForumReplies.Select(r => new
                    {
                        r.ReplyID,
                        r.Content,
                        r.DatePosted,
                        r.UserID,
                        User = new
                        {
                            r.User.Username
                        }
                    })
                })
                .FirstOrDefaultAsync();

            if (post == null)
                return NotFound();

            return Ok(post);
        }
    }
}
