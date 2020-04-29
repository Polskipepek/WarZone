using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
using Model.Database;
using System;
using System.Linq;

namespace WarZoneWebApp.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class ReceiptController : ControllerBase {

        private readonly Context context;

        public ReceiptController (Context context) {
            this.context = context;
        }

        [HttpPost]
        [Route ("[action]")]
        public IActionResult AddReceipt ([FromBody]Customer customer) {
            if (string.IsNullOrWhiteSpace (customer?.CustomerName) || string.IsNullOrWhiteSpace (customer?.CustomerSurname)) {
                return BadRequest ();
            }
            Customer existingCustomer = context.Customers.FirstOrDefault (c => c.CustomerName == customer.CustomerName && c.CustomerSurname == customer.CustomerSurname);
            if (existingCustomer == null) {
                var receipt = new Receipt {
                    CreationDate = DateTime.Now,
                    ModifyDate = DateTime.Now,
                    Customer = customer
                };
                context.Transactions.Add (new Transaction { Customer = customer, Receipt = receipt, ServiceId = GetEntryServiceId () });
            } else {
                context.Receipts.Add (new Receipt { CreationDate = DateTime.Now, ModifyDate = DateTime.Now, CustomerId = existingCustomer.Id });
            }
            context.SaveChanges ();
            return Ok ();
        }
        [HttpGet]
        [Route ("[action]")]
        public ActionResult<Receipt[]> GetReceipts () {
            //3. Handle request
            //4. return value
            context.Receipts.Include (e => e.Customer).Load ();
            var receipts = context.Receipts.Where (e => e.Id != -1).OrderByDescending (e => e.ModifyDate).ToList ();
            receipts.ForEach (e => e.GetTotalPrice (context));

            return receipts.ToArray ();
        }

        private int GetEntryServiceId () {
            switch (DateTime.Now.DayOfWeek) {
                case DayOfWeek.Monday:
                case DayOfWeek.Tuesday:
                case DayOfWeek.Wednesday:
                case DayOfWeek.Thursday:
                case DayOfWeek.Friday:
                    return 1;
                case DayOfWeek.Saturday:
                case DayOfWeek.Sunday:
                    return 2;
            }
            return 1;
        }


    }
}