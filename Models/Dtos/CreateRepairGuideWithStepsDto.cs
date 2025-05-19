namespace OhmZone_ProiectLicenta.Models.Dtos
{
    public class CreateRepairGuideWithStepsDto
    {
        public string Title { get; set; }
        public int? DeviceID { get; set; }  // null dacă se adaugă un device nou
        public string? NewDeviceName { get; set; }
        public string? Part { get; set; }
        public string? Content { get; set; }
        public List<IFormFile> StepImages { get; set; } = new();
        public List<string> StepTexts { get; set; } = new();
    }
}
