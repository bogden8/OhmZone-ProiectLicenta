using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OhmZone_ProiectLicenta.Migrations
{
    /// <inheritdoc />
    public partial class RenameDeviceIDToDeviceRepID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RepairGuides_Devices_DeviceID",
                table: "RepairGuides");

            migrationBuilder.RenameColumn(
                name: "DeviceID",
                table: "RepairGuides",
                newName: "DeviceId");

            migrationBuilder.RenameIndex(
                name: "IX_RepairGuides_DeviceID",
                table: "RepairGuides",
                newName: "IX_RepairGuides_DeviceId");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Devices",
                newName: "Model");

            migrationBuilder.RenameColumn(
                name: "DeviceID",
                table: "Devices",
                newName: "Id");

            migrationBuilder.AddColumn<int>(
                name: "StepNumber",
                table: "Steps",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "DeviceId",
                table: "RepairGuides",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "DeviceRepID",
                table: "RepairGuides",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Brand",
                table: "Devices",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Devices",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_RepairGuides_DeviceRepID",
                table: "RepairGuides",
                column: "DeviceRepID");

            migrationBuilder.AddForeignKey(
                name: "FK_RepairGuides_Devices_DeviceId",
                table: "RepairGuides",
                column: "DeviceId",
                principalTable: "Devices",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RepairGuides_Devices_DeviceRepID",
                table: "RepairGuides",
                column: "DeviceRepID",
                principalTable: "Devices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RepairGuides_Devices_DeviceId",
                table: "RepairGuides");

            migrationBuilder.DropForeignKey(
                name: "FK_RepairGuides_Devices_DeviceRepID",
                table: "RepairGuides");

            migrationBuilder.DropIndex(
                name: "IX_RepairGuides_DeviceRepID",
                table: "RepairGuides");

            migrationBuilder.DropColumn(
                name: "StepNumber",
                table: "Steps");

            migrationBuilder.DropColumn(
                name: "DeviceRepID",
                table: "RepairGuides");

            migrationBuilder.DropColumn(
                name: "Brand",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Devices");

            migrationBuilder.RenameColumn(
                name: "DeviceId",
                table: "RepairGuides",
                newName: "DeviceID");

            migrationBuilder.RenameIndex(
                name: "IX_RepairGuides_DeviceId",
                table: "RepairGuides",
                newName: "IX_RepairGuides_DeviceID");

            migrationBuilder.RenameColumn(
                name: "Model",
                table: "Devices",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Devices",
                newName: "DeviceID");

            migrationBuilder.AlterColumn<int>(
                name: "DeviceID",
                table: "RepairGuides",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_RepairGuides_Devices_DeviceID",
                table: "RepairGuides",
                column: "DeviceID",
                principalTable: "Devices",
                principalColumn: "DeviceID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
