using Microsoft.EntityFrameworkCore;
using Model.Database;
using System;

namespace Model {
    public class Context : DbContext {
        public const string CONNECTION_STRING = "Host=localhost;Port=5433;Database=WarzoneDB;Username=postgres;Password=postgres";
        public DbSet<Weapon> Weapons { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Receipt> Receipts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql(CONNECTION_STRING, b => b.MigrationsAssembly("WarZoneWebApp"));
    }
}
