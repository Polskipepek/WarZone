using Logic.ControllersLogic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
using Model.Database;
using Model.Dto;
using System;
using System.Linq;

namespace WarZoneWebApp.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class ReceiptController : ControllerBase {

        private readonly Context context;
        private readonly TransactionControllerLogic transactionControllerLogic;

        public ReceiptController (Context context, TransactionControllerLogic transactionControllerLogic) {
            this.context = context;
            this.transactionControllerLogic = transactionControllerLogic;
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

        [HttpGet]
        [Route ("[action]")]
        public ActionResult UpdateReceipt (int receiptId, [FromBody]TransactionListDto[] transactionListDtos) {
            if (transactionListDtos == null || !transactionListDtos.Any ())
                return BadRequest ();

            var receipt = context.Receipts.Find (receiptId);
            if (receipt == null)
                return BadRequest ();

            var originalTransactionsDtos = transactionControllerLogic.GetTransactionsByReceiptId (receiptId);

            var receiptTransactions = context.Transactions.Where (t => t.ReceiptId == receiptId);

            var serviceIds = originalTransactionsDtos.Select (t => t.ServiceId).Concat (transactionListDtos.Select (t => t.ServiceId)).Distinct ();

            foreach (var serviceId in serviceIds) {
                var originalDto = originalTransactionsDtos.Select ((t) => (t.ServiceId, t.Count)).FirstOrDefault ((_tuple) => _tuple.ServiceId == serviceId);
                var newDto = transactionListDtos.Select ((t) => (t.ServiceId, t.Count)).FirstOrDefault ((_tuple) => _tuple.ServiceId == serviceId);

                var delta = originalDto.Count - newDto.Count;

                if (delta == 0)
                    continue;
                else if (delta > 0) {
                    for (int i = 0; i < delta; i++) {
                        context.Transactions.Add (new Transaction { CustomerId = receipt.CustomerId, ReceiptId = receiptId, ServiceId = serviceId });
                    }

                } else if (delta < 0) {
                    for (int i = delta; i < 0; i++) {
                        context.Transactions.Remove (receiptTransactions.First (t => t.ServiceId == serviceId));
                    }
                }
            }
            context.SaveChanges ();

            return Ok ();

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