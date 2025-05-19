using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OhmZone_ProiectLicenta.Data;
using OhmZone_ProiectLicenta.Models;

namespace OhmZone_ProiectLicenta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeviceController : ControllerBase
    {
        private readonly AppDbContext _ctx;
        public DeviceController(AppDbContext ctx) => _ctx = ctx;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var devices = await _ctx.Devices
                                    .OrderBy(d => d.Model) // 🔁 înlocuit Name cu Model
                                    .ToListAsync();
            return Ok(devices);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var device = await _ctx.Devices.FindAsync(id);
            if (device == null) return NotFound();
            return Ok(device);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Device d)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // 🔁 Verificare pe Brand + Model (în loc de Name)
            var existing = await _ctx.Devices
                                     .FirstOrDefaultAsync(x => x.Brand == d.Brand && x.Model == d.Model);
            if (existing != null)
                return Conflict("Device already exists.");

            _ctx.Devices.Add(d);
            await _ctx.SaveChangesAsync();

            return CreatedAtAction(
                nameof(Get),
                new { id = d.Id }, // 🔁 folosește Id
                d
            );
        }
    }
}
