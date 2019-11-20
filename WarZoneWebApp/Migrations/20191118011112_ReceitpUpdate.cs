using Microsoft.EntityFrameworkCore.Migrations;

namespace WarZoneWebApp.Migrations
{
    public partial class ReceitpUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "Receipts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Receipts_CustomerId",
                table: "Receipts",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Receipts_Customers_CustomerId",
                table: "Receipts",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Receipts_Customers_CustomerId",
                table: "Receipts");

            migrationBuilder.DropIndex(
                name: "IX_Receipts_CustomerId",
                table: "Receipts");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "Receipts");
        }
    }
}
