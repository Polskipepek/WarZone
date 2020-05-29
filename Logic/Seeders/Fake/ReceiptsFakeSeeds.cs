using Model;
using Model.Database;
using System;
using System.Collections.Generic;

namespace Logic.Seeders.Fake {
    class ReceiptsFakeSeeds : SeedBase {
        public override void Seed (Context context) {
            var tempReceipts = new List<Receipt> ();
            for (int t = 0; t < 1; t++) {
                var creationDate = Faker.Generators.DateTimes.GetDateTime (DateTime.Now - TimeSpan.FromDays (351), DateTime.Now);
                var modifyDate = Faker.Generators.DateTimes.GetDateTime (creationDate, DateTime.Now);
                tempReceipts.Add (new Receipt {
                    CreationDate = creationDate,
                    ModifyDate = Faker.Generators.Booleans.Bool () ? modifyDate : creationDate,
                    CloseDate = Faker.Generators.Booleans.Bool () ? (DateTime?) Faker.Generators.DateTimes.GetDateTime (modifyDate, DateTime.Now) : null,
                }); ;
            }
            context.Receipts.AddRange (tempReceipts);
        }
    }
}
