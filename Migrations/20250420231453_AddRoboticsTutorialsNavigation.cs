using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OhmZone_ProiectLicenta.Migrations
{
    /// <inheritdoc />
    public partial class AddRoboticsTutorialsNavigation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ForumReplies_Users_UserID",
                table: "ForumReplies");

            migrationBuilder.DropForeignKey(
                name: "FK_GuideComments_Users_UserID",
                table: "GuideComments");

            migrationBuilder.AddForeignKey(
                name: "FK_ForumReplies_Users_UserID",
                table: "ForumReplies",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GuideComments_Users_UserID",
                table: "GuideComments",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ForumReplies_Users_UserID",
                table: "ForumReplies");

            migrationBuilder.DropForeignKey(
                name: "FK_GuideComments_Users_UserID",
                table: "GuideComments");

            migrationBuilder.AddForeignKey(
                name: "FK_ForumReplies_Users_UserID",
                table: "ForumReplies",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_GuideComments_Users_UserID",
                table: "GuideComments",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
