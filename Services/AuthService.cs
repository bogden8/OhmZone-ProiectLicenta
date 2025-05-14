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

    public AuthService(AppDbContext ctx,
                       IConfiguration config,
                       IPasswordHasher<Users> hasher)
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
        
        var user = await _ctx.Users.FirstOrDefaultAsync(u =>
            u.Email == usernameOrEmail ||
            u.Username == usernameOrEmail);

        
        if (user == null)
            throw new ApplicationException("Utilizator inexistent");

        
        var result = _hasher.VerifyHashedPassword(user, user.PasswordHash, password);
        if (result == PasswordVerificationResult.Failed)
            throw new ApplicationException("Parolă incorectă");

        
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub,  user.UserID.ToString()),
            new Claim(ClaimTypes.Name,              user.Username),
            new Claim(ClaimTypes.Role,              user.Role),
            new Claim("username",                   user.Username)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
