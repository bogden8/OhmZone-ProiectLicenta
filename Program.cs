using Microsoft.EntityFrameworkCore;
using OhmZone_ProiectLicenta.Data; // Make sure to use your actual namespace

var builder = WebApplication.CreateBuilder(args);

// ✅ Configure SQL Server using appsettings.json
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.Run();
