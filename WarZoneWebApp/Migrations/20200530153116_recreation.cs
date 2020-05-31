using Microsoft.EntityFrameworkCore.Migrations;

namespace WarZoneWebApp.Migrations
{
    public partial class recreation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "ReceiptAndCustomerBinders",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ReceiptId",
                table: "ReceiptAndCustomerBinders",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ReceiptAndCustomerBinders_CustomerId",
                table: "ReceiptAndCustomerBinders",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_ReceiptAndCustomerBinders_ReceiptId",
                table: "ReceiptAndCustomerBinders",
                column: "ReceiptId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReceiptAndCustomerBinders_Customers_CustomerId",
                table: "ReceiptAndCustomerBinders",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReceiptAndCustomerBinders_Receipts_ReceiptId",
                table: "ReceiptAndCustomerBinders",
                column: "ReceiptId",
                principalTable: "Receipts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReceiptAndCustomerBinders_Customers_CustomerId",
                table: "ReceiptAndCustomerBinders");

            migrationBuilder.DropForeignKey(
                name: "FK_ReceiptAndCustomerBinders_Receipts_ReceiptId",
                table: "ReceiptAndCustomerBinders");

            migrationBuilder.DropIndex(
                name: "IX_ReceiptAndCustomerBinders_CustomerId",
                table: "ReceiptAndCustomerBinders");

            migrationBuilder.DropIndex(
                name: "IX_ReceiptAndCustomerBinders_ReceiptId",
                table: "ReceiptAndCustomerBinders");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "ReceiptAndCustomerBinders");

            migrationBuilder.DropColumn(
                name: "ReceiptId",
                table: "ReceiptAndCustomerBinders");
        }
    }
}
