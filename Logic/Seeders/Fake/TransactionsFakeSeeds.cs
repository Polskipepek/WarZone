using Model;
using Model.Database;
using System.Collections.Generic;

namespace Logic.Seeders.Fake {
    class TransactionsFakeSeeds : SeedBase {
        public override void Seed (Context context) {
            var tempTransactions = new List<Transaction> ();
            for (int t = 0; t < 20; t++) {
                tempTransactions.Add (new Transaction {
                    ServiceId = Faker.Generators.Numbers.Int (1,20),
                    ReceiptId = Faker.Generators.Numbers.Int (1, 20)
                });
            }

            context.Transactions.AddRange (tempTransactions);
        }
    }
}
