using Microsoft.EntityFrameworkCore;
using OhmZone_ProiectLicenta.Data;
using OhmZone_ProiectLicenta.Services;
using Microsoft.OpenApi.Models;

// —— Adaugă aceste using-uri deasupra celorlalte ——
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using OhmZone_ProiectLicenta.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ✅ Configure SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ✅ CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// ✅ Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// —— START: noua secțiune pentru Auth ——

// 1) DI pentru PasswordHasher și AuthService
builder.Services.AddScoped<IPasswordHasher<Users>, PasswordHasher<Users>>();
builder.Services.AddScoped<IAuthService, AuthService>();

// 2) Configurează JWT Bearer
var jwt = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwt["Key"]);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(opts =>
{
    opts.RequireHttpsMetadata = false;
    opts.SaveToken = true;
    opts.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwt["Issuer"],
        ValidAudience = jwt["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ClockSkew = TimeSpan.Zero
    };
});

// 3) Adaugă Authorization (roluri)
builder.Services.AddAuthorization();

// —— END: noua secțiune pentru Auth ——

// ✅ MVC + API Controllers
builder.Services.AddControllersWithViews();

// ✅ Alte servicii
builder.Services.AddScoped<IRepairGuideService, RepairGuideService>();

var app = builder.Build();

// Seeding admin
using (var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var hasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher<Users>>();

    if (!ctx.Users.Any(u => u.Role == "Admin"))
    {
        var admin = new Users
        {
            Username = "admin",
            Email = "admin@ohmzone.local",
            Role = "Admin",
            CreatedAt = DateTime.UtcNow
        };
        admin.PasswordHash = hasher.HashPassword(admin, "Admin!234");
        ctx.Users.Add(admin);
        ctx.SaveChanges();
    }
}
// ✅ Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// ✅ CORS
app.UseCors("AllowReactApp");

// —— START: Authentication & Authorization ——
// Must come after UseRouting() & UseCors(), before UseAuthorization()
app.UseAuthentication();
app.UseAuthorization();
// —— END: Authentication & Authorization ——

// ✅ Map Controllers
app.MapControllers();

app.Run();
