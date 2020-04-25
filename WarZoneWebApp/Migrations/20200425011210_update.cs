using Microsoft.EntityFrameworkCore.Migrations;

namespace WarZoneWebApp.Migrations {
    public partial class update : Migration {
        protected override void Up (MigrationBuilder migrationBuilder) {
            migrationBuilder.AlterColumn<decimal> (
                name: "ServicePrice",
                table: "Services",
                nullable: false,
                oldClrType: typeof (float),
                oldType: "real");
        }
    }
}
