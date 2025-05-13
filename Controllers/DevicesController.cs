using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OhmZone_ProiectLicenta.Data;
using OhmZone_ProiectLicenta.Models;

namespace OhmZone_ProiectLicenta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DevicesController : ControllerBase
    {
        private readonly AppDbContext _ctx;
        public DevicesController(AppDbContext ctx) => _ctx = ctx;

        // 1️⃣ GET /api/devices
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var devices = await _ctx.Devices
                                    .OrderBy(d => d.Name)
                                    .ToListAsync();
            return Ok(devices);
        }

        // 2️⃣ GET /api/devices/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var device = await _ctx.Devices.FindAsync(id);
            if (device == null) return NotFound();
            return Ok(device);
        }

        // 3️⃣ POST /api/devices
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Device d)
        {
            // Deduplicate by name
            var existing = await _ctx.Devices
                                     .FirstOrDefaultAsync(x => x.Name == d.Name);
            if (existing != null)
                return Ok(existing);

            _ctx.Devices.Add(d);
            await _ctx.SaveChangesAsync();

            // Correctly point at the GET by id action
            return CreatedAtAction(
                nameof(Get),
                new { id = d.DeviceID },
                d
            );
        }
    }
}
