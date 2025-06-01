using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OhmZone_ProiectLicenta.Migrations
{
    /// <inheritdoc />
    public partial class FavoriteGuide : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FavoriteGuides",
                columns: table => new
                {
                    UserID = table.Column<int>(type: "int", nullable: false),
                    GuideID = table.Column<int>(type: "int", nullable: false),
                    FavoriteID = table.Column<int>(type: "int", nullable: false),
                    DateSaved = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RepairGuideGuideID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FavoriteGuides", x => new { x.UserID, x.GuideID });
                    table.ForeignKey(
                        name: "FK_FavoriteGuides_RepairGuides_GuideID",
                        column: x => x.GuideID,
                        principalTable: "RepairGuides",
                        principalColumn: "GuideID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FavoriteGuides_RepairGuides_RepairGuideGuideID",
                        column: x => x.RepairGuideGuideID,
                        principalTable: "RepairGuides",
                        principalColumn: "GuideID");
                    table.ForeignKey(
                        name: "FK_FavoriteGuides_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FavoriteGuides_GuideID",
                table: "FavoriteGuides",
                column: "GuideID");

            migrationBuilder.CreateIndex(
                name: "IX_FavoriteGuides_RepairGuideGuideID",
                table: "FavoriteGuides",
                column: "RepairGuideGuideID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FavoriteGuides");
        }
    }
}
