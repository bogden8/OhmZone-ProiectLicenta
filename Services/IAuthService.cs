using System.Threading.Tasks;
using OhmZone_ProiectLicenta.Models;

public interface IAuthService
{
    Task<Users> RegisterAsync(string username, string email, string password);
    Task<string> LoginAsync(string usernameOrEmail, string password);
}
