using Logic.ControllersLogic;
using Logic.DtoMappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
using Model.Database;
using Model.Dto;
using Namotion.Reflection;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
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
        public ActionResult SetReceiptCustomers (int receiptId, int[] customers) {
            if (receiptId == 0 || customers.Length == 0) {
                return BadRequest ();
            }

            var query = context.ReceiptAndCustomerBinders.Where (r => r.ReceiptId == receiptId);
            foreach (var item in query) {
                context.ReceiptAndCustomerBinders.Remove (item);
            }

            foreach (var c in customers) {
                context.ReceiptAndCustomerBinders.Add (new ReceiptAndCustomerBinder () { ReceiptId = receiptId, CustomerId = c });
            }
            context.SaveChanges ();
            return Ok ();
        }

        [HttpPost]
        [Route ("[action]")]
        public ActionResult<ReceiptAndCustomerBinder[]> GeReceiptCustomers ([FromBody]Receipt receipt) {
            List<ReceiptAndCustomerBinder> dtos = new List<ReceiptAndCustomerBinder> ();

            if (receipt == null) {
                return BadRequest ();
            }
            var data = context.ReceiptAndCustomerBinders.Where (r => r.ReceiptId == receipt.Id);
            foreach (var item in data) {
                dtos.Add (item);
            }

            return dtos.ToArray ();
        }

        [HttpPost]
        [Route("[action]")]
        public ActionResult<Customer[]> GetAvailableCustomers () {
            List<Customer> availableCustomers = new List<Customer> ();
            var allCustomersIds = context.Customers.Select (s => s.Id);
            var bindCustomers = context.ReceiptAndCustomerBinders.Select (s => s.Id);

            foreach (var id in allCustomersIds) {
                if(!context.ReceiptAndCustomerBinders.Where (r => r.CustomerId == id).Any ()) {
                    var tempCustomer = context.Customers.Where (w => w.Id == id).FirstOrDefault ();
                    availableCustomers.Add (tempCustomer);
                }   
            }
            return availableCustomers.ToArray();
        }
    }
}