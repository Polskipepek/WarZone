using Model;
using Model.Database;
using System.Collections.Generic;

namespace Logic.Seeders.Fake {
    class TransactionsFakeSeeds : SeedBase {
        public override void Seed (Context context) {
            var tempTransactions = new List<Transaction> ();
            for (int t = 0; t < 350; t++) {
                tempTransactions.Add (new Transaction {
                    CustomerId = Faker.Generators.Numbers.Int (1, 20),
                    ServiceId = Faker.Generators.Numbers.Int (1, 55),
                    ReceiptId = Faker.Generators.Numbers.Int (1, 25)
                });
            }

            context.Transactions.AddRange (tempTransactions);
        }
    }
}
