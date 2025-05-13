using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OhmZone_ProiectLicenta.Migrations
{
    /// <inheritdoc />
    public partial class ExtendModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "RoboticsTutorials",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "RoboticsTutorials",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "RoboticsTutorials",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "Username",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_Username",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "RoboticsTutorials");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "RoboticsTutorials");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "RoboticsTutorials");

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

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
