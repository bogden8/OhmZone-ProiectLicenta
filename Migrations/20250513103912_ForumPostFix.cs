using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OhmZone_ProiectLicenta.Migrations
{
    /// <inheritdoc />
    public partial class ForumPostFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "About",
                table: "ForumThreads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Device",
                table: "ForumThreads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "ForumThreads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "ForumThreads",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "About",
                table: "ForumThreads");

            migrationBuilder.DropColumn(
                name: "Device",
                table: "ForumThreads");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "ForumThreads");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "ForumThreads");
        }
    }
}
