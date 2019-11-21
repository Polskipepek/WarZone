using Model.Database;
using System;
using System.Collections.Generic;
using System.Text;
using WarZoneWebApp.Database.Seeds;

namespace Model.Seeds.FakeSeeds {
    class TransactionsFakeSeeds : SeedBase {
        public override void Seed (Context context) {
            var tempTransactions = new List<Transaction>();
            for (int t = 0; t < 50; t++) {
                tempTransactions.Add(new Transaction { CustomerId = Faker.Generators.Numbers.Int(1, 50),
                    ServiceId = Faker.Generators.Numbers.Int(1, 55),
                    ReceiptId = Faker.Generators.Numbers.Int(1, 50) });
            }

            context.Transactions.AddRange(tempTransactions);
        }
    }
}
