using Logic.ControllersLogic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
using Model.Database;
using Model.Dto;
using System;
using System.Collections.Generic;
using System.Linq;

namespace WarZoneWebApp.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class ReceiptController : ControllerBase {

        private readonly Context context;
        private readonly TransactionControllerLogic transactionControllerLogic;

        public const int ReceiptsPerPage = 6;

        public ReceiptController (Context context, TransactionControllerLogic transactionControllerLogic) {
            this.context = context;
            this.transactionControllerLogic = transactionControllerLogic;
        }

        [HttpPost]
        [Route ("[action]")]
        public IActionResult AddReceipt () {
            var receipt = new Receipt { CreationDate = DateTime.Now, ModifyDate = DateTime.Now };
            context.Receipts.Add (receipt);
            context.Transactions.Add (new Transaction { Receipt = receipt, ServiceId = GetEntryServiceId () });

            context.SaveChanges ();
            return Ok ();
        }

        [HttpGet]
        [Route ("[action]")]
        public ActionResult<Receipt[]> GetOpenReceipts () {
            var receipts = context.Receipts.Where (e => e.Id != -1 && !e.CloseDate.HasValue).OrderByDescending (e => e.ModifyDate)/*.Skip ((page - 1) * ReceiptsPerPage).Take (ReceiptsPerPage)*/.ToList ();
            receipts.ForEach (e => e.GetTotalPrice (context));

            return receipts.ToArray ();
        }

        [HttpGet]
        [Route ("[action]")]
        public ActionResult<Receipt[]> GetClosedReceipts () {
            var receipts = context.Receipts.Where (e => e.Id != -1 && e.CloseDate.HasValue).OrderByDescending (e => e.ModifyDate)/*.Skip ((page - 1) * ReceiptsPerPage).Take (ReceiptsPerPage)*/.ToList ();
            receipts.ForEach (e => e.GetTotalPrice (context));

            return receipts.ToArray ();
        }

        [HttpPost]
        [Route ("[action]")]
        public ActionResult UpdateReceipt (int receiptId, [FromBody] TransactionListDto[] transactionListDtos) {
            if (transactionListDtos == null || !transactionListDtos.Any ())
                return BadRequest ();

            var receipt = context.Receipts.Find (receiptId);
            if (receipt == null)
                return BadRequest ();

            var originalTransactionsDtos = transactionControllerLogic.GetTransactionsByReceiptId (receiptId);

            var receiptTransactions = context.Transactions.Where (t => t.ReceiptId == receiptId);

            var serviceIds = originalTransactionsDtos.Select (t => t.ServiceId).Concat (transactionListDtos.Select (t => t.ServiceId)).Distinct ();

            foreach (var serviceId in serviceIds) {
                // var originalDto = originalTransactionsDtos.Select ((t) => (t.ServiceId, t.Count)).FirstOrDefault ((_tuple) => _tuple.ServiceId == serviceId);
                var (ServiceId, Count) = originalTransactionsDtos.Select ((t) => (t.ServiceId, t.Count)).FirstOrDefault ((_tuple) => _tuple.ServiceId == serviceId);

                var newDto = transactionListDtos.Select ((t) => (t.ServiceId, t.Count)).FirstOrDefault ((_tuple) => _tuple.ServiceId == serviceId);

                var delta = newDto.Count - Count;

                List<int> removedTransactionIds = new List<int> ();

                if (delta == 0)
                    continue;
                else if (delta > 0) {
                    for (int i = 0; i < delta; i++) {
                        context.Transactions.Add (new Transaction { ReceiptId = receiptId, ServiceId = serviceId });
                    }

                } else if (delta < 0) {
                    for (int i = delta; i < 0; i++) {
                        var transactionToRemove = receiptTransactions.First (t => t.ServiceId == serviceId && !removedTransactionIds.Any (usedId => usedId == t.Id));
                        removedTransactionIds.Add (transactionToRemove.Id);
                        context.Transactions.Remove (transactionToRemove);
                    }
                }
            }
            receipt.ModifyDate = DateTime.Now;
            context.Receipts.Update (receipt);
            context.SaveChanges ();

            return Ok ();
        }


        [HttpPost]
        [Route ("[action]")]
        public ActionResult<Receipt> GetReceipt (int receiptId) {
            var receipt = context.Receipts.Find (receiptId);
            receipt?.GetTotalPrice (context);
            return receipt;
        }

        [HttpPost]
        [Route ("[action]")]
        public ActionResult CloseReceipt (int receiptId) {
            var receipt = context.Receipts.Find (receiptId);
            if (receipt != null) {
                receipt.CloseDate = DateTime.Now;
                context.Receipts.Update (receipt);
                context.SaveChanges ();
            }
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