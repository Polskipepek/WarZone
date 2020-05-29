using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
using Model.Database;
using Model.Dto;
using Namotion.Reflection;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Linq;

namespace WarZoneWebApp.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class ReceiptAndCustomerBinderController : ControllerBase {

        private readonly Context context;

        public ReceiptAndCustomerBinderController (Context context) {
            this.context = context;
        }

        [HttpPost]
        [Route ("[action]")]
        public ActionResult SetCustomers (int receiptId, int[] customersId) {
            if (receiptId == 0 || customersId.Length == 0) {
                return BadRequest ();
            }
            foreach (int customerId in customersId) {
                context.ReceiptAndCustomerBinders.Add (new ReceiptAndCustomerBinder () { ReceiptId = receiptId, CustomerId = customerId });
            }
            context.SaveChanges ();
            return Ok ();
        }

        [HttpPost]
        [Route ("[action]")]
        public ActionResult<ReceiptWithCustomerDto[]> GetCustomers ([FromBody]Receipt receipt) {
            if (receipt == null) {
                return BadRequest ();
            }
            
            var customersId = context.ReceiptAndCustomerBinders.Where (r => r.ReceiptId == receipt.Id).Select (s => s.ReceiptId).ToList ();

            var query = from receiptAndCustomerBinds in customersId
                        join customer in context.Customers on receiptAndCustomerBinds equals customer.Id into gj
                        from subCustomer in gj.DefaultIfEmpty ()
                        select new ReceiptWithCustomerDto { receipt = receipt, customer = subCustomer };

            return query.ToArray ();
        }
    }
}