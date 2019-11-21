using Model.Database;
using System;
using System.Collections.Generic;
using System.Text;
using WarZoneWebApp.Database.Seeds;

namespace Model.Seeds.FakeSeeds {
    class CustomersFakeSeeds : SeedBase {
        public override void Seed (Context context) {
            var tempCustomers = new List<Customer>();
            for (int t = 0; t < 50; t++) {
                tempCustomers.Add(new Customer{ CustomerName = Faker.Generators.Names.First(),
                    CustomerSurname = Faker.Generators.Names.Last()});
            }

            context.Customers.AddRange(tempCustomers);
        }
    }
}
