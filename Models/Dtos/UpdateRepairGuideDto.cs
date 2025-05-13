namespace OhmZone_ProiectLicenta.Models.Dtos
{
    public class UpdateRepairGuideDto
    {
        /// <summary>
        /// Noul titlu (sau același)
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Poți muta ghidul într-o altă categorie
        /// </summary>
        public int CategoryID { get; set; }

        /// <summary>
        /// Textul actualizat al ghidului
        /// </summary>
        public string Content { get; set; }

        public int DeviceID { get; set; }
        public string Part { get; set; }
    }
}
