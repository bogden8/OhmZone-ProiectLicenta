using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OhmZone_ProiectLicenta.Migrations
{
    /// <inheritdoc />
    public partial class RemoveIFixitColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContentJson",
                table: "RepairGuides");

            migrationBuilder.DropColumn(
                name: "Difficulty",
                table: "RepairGuides");

            migrationBuilder.DropColumn(
                name: "ExternalGuideId",
                table: "RepairGuides");

            migrationBuilder.DropColumn(
                name: "ExternalUrl",
                table: "RepairGuides");

            migrationBuilder.DropColumn(
                name: "ImportedAt",
                table: "RepairGuides");

            migrationBuilder.DropColumn(
                name: "TimeRequired",
                table: "RepairGuides");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContentJson",
                table: "RepairGuides",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Difficulty",
                table: "RepairGuides",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ExternalGuideId",
                table: "RepairGuides",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExternalUrl",
                table: "RepairGuides",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "ImportedAt",
                table: "RepairGuides",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TimeRequired",
                table: "RepairGuides",
                type: "int",
                nullable: true);
        }
    }
}
