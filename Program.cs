using Microsoft.EntityFrameworkCore;
using OhmZone_ProiectLicenta.Data;
using OhmZone_ProiectLicenta.Services;
using Microsoft.OpenApi.Models;


var builder = WebApplication.CreateBuilder(args);

// ✅ Configure SQL Server using appsettings.json
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ✅ Adaugă CORS pentru a permite frontendului să comunice cu backendul
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // adresa default a React-ului în dev
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// ✅ Add Swagger (opțional, dar util pentru testare API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Add services
builder.Services.AddControllersWithViews();
builder.Services.AddScoped<IRepairGuideService, RepairGuideService>();

var app = builder.Build();

// ✅ Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors("AllowReactApp"); // trebuie înainte de Authorization

app.UseAuthorization();

app.MapControllers();

app.Run();
