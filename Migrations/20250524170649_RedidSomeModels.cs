using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OhmZone_ProiectLicenta.Migrations
{
    /// <inheritdoc />
    public partial class RedidSomeModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "CreatedAt",
                table: "Steps");

            migrationBuilder.DropColumn(
                name: "MainImageUrl",
                table: "Steps");

            migrationBuilder.DropColumn(
                name: "Order",
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
                name: "ThumbnailUrlsJson",
                table: "Steps",
                newName: "ImagePath");

            migrationBuilder.RenameColumn(
                name: "Text",
                table: "Steps",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "StepID",
                table: "Steps",
                newName: "GuideStepID");

            migrationBuilder.RenameColumn(
                name: "DeviceId",
                table: "RepairGuides",
                newName: "DeviceID");

            migrationBuilder.RenameIndex(
                name: "IX_RepairGuides_DeviceId",
                table: "RepairGuides",
                newName: "IX_RepairGuides_DeviceID");

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

            migrationBuilder.AddColumn<int>(
                name: "BrandID",
                table: "Devices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Subcategories",
                columns: table => new
                {
                    SubcategoryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nmae = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subcategories", x => x.SubcategoryID);
                    table.ForeignKey(
                        name: "FK_Subcategories_Categories_CategoryID",
                        column: x => x.CategoryID,
                        principalTable: "Categories",
                        principalColumn: "CategoryID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Brands",
                columns: table => new
                {
                    BrandID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SubcategoryID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brands", x => x.BrandID);
                    table.ForeignKey(
                        name: "FK_Brands_Subcategories_SubcategoryID",
                        column: x => x.SubcategoryID,
                        principalTable: "Subcategories",
                        principalColumn: "SubcategoryID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Devices_BrandID",
                table: "Devices",
                column: "BrandID");

            migrationBuilder.CreateIndex(
                name: "IX_Brands_SubcategoryID",
                table: "Brands",
                column: "SubcategoryID");

            migrationBuilder.CreateIndex(
                name: "IX_Subcategories_CategoryID",
                table: "Subcategories",
                column: "CategoryID");

            migrationBuilder.AddForeignKey(
                name: "FK_Devices_Brands_BrandID",
                table: "Devices",
                column: "BrandID",
                principalTable: "Brands",
                principalColumn: "BrandID",
                onDelete: ReferentialAction.Cascade);

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
                name: "FK_Devices_Brands_BrandID",
                table: "Devices");

            migrationBuilder.DropForeignKey(
                name: "FK_RepairGuides_Devices_DeviceID",
                table: "RepairGuides");

            migrationBuilder.DropTable(
                name: "Brands");

            migrationBuilder.DropTable(
                name: "Subcategories");

            migrationBuilder.DropIndex(
                name: "IX_Devices_BrandID",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "BrandID",
                table: "Devices");

            migrationBuilder.RenameColumn(
                name: "ImagePath",
                table: "Steps",
                newName: "ThumbnailUrlsJson");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Steps",
                newName: "Text");

            migrationBuilder.RenameColumn(
                name: "GuideStepID",
                table: "Steps",
                newName: "StepID");

            migrationBuilder.RenameColumn(
                name: "DeviceID",
                table: "RepairGuides",
                newName: "DeviceId");

            migrationBuilder.RenameIndex(
                name: "IX_RepairGuides_DeviceID",
                table: "RepairGuides",
                newName: "IX_RepairGuides_DeviceId");

            migrationBuilder.RenameColumn(
                name: "DeviceID",
                table: "Devices",
                newName: "Id");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Steps",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "MainImageUrl",
                table: "Steps",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Order",
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
    }
}
