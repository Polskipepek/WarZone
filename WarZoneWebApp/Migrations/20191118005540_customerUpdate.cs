using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WarZoneWebApp.Migrations
{
    public partial class customerUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CloseDate",
                table: "Receipts",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Receipts",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifyDate",
                table: "Receipts",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CloseDate",
                table: "Receipts");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Receipts");

            migrationBuilder.DropColumn(
                name: "ModifyDate",
                table: "Receipts");
        }
    }
}
