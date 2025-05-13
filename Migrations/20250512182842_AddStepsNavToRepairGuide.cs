using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OhmZone_ProiectLicenta.Migrations
{
    /// <inheritdoc />
    public partial class AddStepsNavToRepairGuide : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DeviceID",
                table: "RepairGuides",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Part",
                table: "RepairGuides",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_RepairGuides_DeviceID",
                table: "RepairGuides",
                column: "DeviceID");

            migrationBuilder.AddForeignKey(
                name: "FK_RepairGuides_Devices_DeviceID",
                table: "RepairGuides",
                column: "DeviceID",
                principalTable: "Devices",
                principalColumn: "DeviceID",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RepairGuides_Devices_DeviceID",
                table: "RepairGuides");

            migrationBuilder.DropIndex(
                name: "IX_RepairGuides_DeviceID",
                table: "RepairGuides");

            migrationBuilder.DropColumn(
                name: "DeviceID",
                table: "RepairGuides");

            migrationBuilder.DropColumn(
                name: "Part",
                table: "RepairGuides");
        }
    }
}
