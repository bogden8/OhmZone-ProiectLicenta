using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OhmZone_ProiectLicenta.Data;
using OhmZone_ProiectLicenta.Models;

namespace OhmZone_ProiectLicenta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _ctx;
        public CategoriesController(AppDbContext ctx) => _ctx = ctx;

        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cats = await _ctx.Categories
                                 .OrderBy(c => c.CategoryName)
                                 .ToListAsync();
            return Ok(cats);
        }

        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Category c)
        {
            
            var existing = await _ctx.Categories
                                    .FirstOrDefaultAsync(x => x.CategoryName == c.CategoryName);
            if (existing != null)
                return Ok(existing);

            _ctx.Categories.Add(c);
            await _ctx.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = c.CategoryID }, c);
        }
    }
}
