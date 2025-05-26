using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using OhmZone_ProiectLicenta.Models;
using OhmZone_ProiectLicenta.Data;

public class AuthService : IAuthService
{
    private readonly AppDbContext _ctx;
    private readonly IConfiguration _config;
    private readonly IPasswordHasher<Users> _hasher;

    public AuthService(AppDbContext ctx, IConfiguration config, IPasswordHasher<Users> hasher)
    {
        _ctx = ctx;
        _config = config;
        _hasher = hasher;
    }

    public async Task<Users> RegisterAsync(string username, string email, string password)
    {
        if (await _ctx.Users.AnyAsync(u => u.Email == email))
            throw new ApplicationException("Email deja folosit");
        if (await _ctx.Users.AnyAsync(u => u.Username == username))
            throw new ApplicationException("Username deja folosit");

        var user = new Users
        {
            Username = username,
            Email = email,
            Role = "User",
            CreatedAt = DateTime.UtcNow
        };
        user.PasswordHash = _hasher.HashPassword(user, password);

        _ctx.Users.Add(user);
        await _ctx.SaveChangesAsync();
        return user;
    }

    public async Task<string> LoginAsync(string usernameOrEmail, string password)
    {
        var user = await _ctx.Users.FirstOrDefaultAsync(u => u.Email == usernameOrEmail || u.Username == usernameOrEmail);

        if (user == null || _hasher.VerifyHashedPassword(user, user.PasswordHash, password) != PasswordVerificationResult.Success)
            throw new ApplicationException("Date de autentificare invalide");

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);

        var claims = new List<Claim>
{
    new Claim(JwtRegisteredClaimNames.Sub, user.UserID.ToString()),
    new Claim(ClaimTypes.NameIdentifier, user.UserID.ToString()),
    new Claim("nameid", user.UserID.ToString()), // 🔥 ESENȚIAL pentru backend
    new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
    new Claim(ClaimTypes.Name, user.Username),
    new Claim(ClaimTypes.Role, user.Role ?? "User")
};


        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(3),
            Issuer = _config["Jwt:Issuer"],
            Audience = _config["Jwt:Audience"],
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
