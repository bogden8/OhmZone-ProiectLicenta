using Microsoft.AspNetCore.Mvc;
using OhmZone_ProiectLicenta.Models.Dtos;
using OhmZone_ProiectLicenta.Services;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _auth;
    public AuthController(IAuthService auth) => _auth = auth;

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        try
        {
            var user = await _auth.RegisterAsync(dto.Username, dto.Email, dto.Password);
            return CreatedAtAction(null, new { id = user.UserID }, new { user.UserID, user.Username, user.Email });
        }
        catch (ApplicationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        try
        {
            var token = await _auth.LoginAsync(dto.UsernameOrEmail, dto.Password);
            return Ok(new { token });
        }
        catch (ApplicationException ex)
        {
            
            return Unauthorized(new { error = ex.Message });
        }
    }

}
