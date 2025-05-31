using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OhmZone_ProiectLicenta.Data;

namespace OhmZone_ProiectLicenta.Controllers
{
    [ApiController]
    [Route("api/lookup")]
    public class LookupController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LookupController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories() =>
            Ok(await _context.Categories
                .Select(c => new
                {
                    c.CategoryID,
                    c.CategoryName,
                    c.Slug,
                    c.ImageUrl // ✅ adăugat
                })
                .ToListAsync());

        [HttpGet("subcategories")]
        public async Task<IActionResult> GetSubcategories() =>
            Ok(await _context.Subcategories
                .Select(s => new { s.SubcategoryID, s.Name, s.ImageUrl }) // ✅ adăugat ImageUrl
                .ToListAsync());

        [HttpGet("subcategories/{categoryId}")]
        public async Task<IActionResult> GetSubcategoriesByCategoryId(int categoryId) =>
            Ok(await _context.Subcategories
                .Where(s => s.CategoryID == categoryId)
                .Select(sc => new { sc.SubcategoryID, sc.Name, sc.Slug, sc.ImageUrl }) // ✅ adăugat
                .ToListAsync());

        [HttpGet("brands")]
        public async Task<IActionResult> GetAllBrands() =>
            Ok(await _context.Brands
                .Select(b => new { b.BrandID, b.Name, b.Slug, b.ImageUrl }) // ✅ adăugat
                .ToListAsync());

        [HttpGet("brands/{subcategoryId}")]
        public async Task<IActionResult> GetBrandsBySubcategoryId(int subcategoryId) =>
            Ok(await _context.Brands
                .Where(b => b.SubcategoryID == subcategoryId)
                .Select(b => new { b.BrandID, b.Name, b.Slug, b.ImageUrl }) // ✅ adăugat
                .ToListAsync());

        [HttpGet("devices/{brandId}")]
        public async Task<IActionResult> GetDevices(int brandId) =>
            Ok(await _context.Devices
                .Where(d => d.BrandID == brandId)
                .Select(d => new { d.DeviceID, d.Model, d.Slug, d.ImageUrl }) // ✅ dacă vrei și la device
                .ToListAsync());

        [HttpGet("guides/{deviceId}")]
        public async Task<IActionResult> GetGuidesByDevice(int deviceId) =>
            Ok(await _context.RepairGuides
                .Where(g => g.DeviceID == deviceId)
                .ToListAsync());

        [HttpGet("subcategories/by-category-slug/{slug}")]
        public async Task<IActionResult> GetSubcategoriesByCategorySlug(string slug)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Slug == slug);
            if (category == null)
                return NotFound("Categoria nu a fost găsită.");

            var subcategories = await _context.Subcategories
                .Where(sc => sc.CategoryID == category.CategoryID)
                .Select(sc => new {
                    sc.SubcategoryID,
                    sc.Name,
                    sc.Slug,
                    sc.ImageUrl // ✅ adăugat
                })
                .ToListAsync();

            return Ok(subcategories);
        }

        [HttpGet("brands/by-subcategory-slug/{slug}")]
        public async Task<IActionResult> GetBrandsBySubcategorySlug(string slug)
        {
            var subcategory = await _context.Subcategories.FirstOrDefaultAsync(sc => sc.Slug == slug);
            if (subcategory == null)
                return NotFound("Subcategoria nu a fost găsită.");

            var brands = await _context.Brands
                .Where(b => b.SubcategoryID == subcategory.SubcategoryID)
                .Select(b => new {
                    b.BrandID,
                    b.Name,
                    b.Slug,
                    b.ImageUrl // ✅ adăugat
                })
                .ToListAsync();

            return Ok(brands);
        }
    }
}
