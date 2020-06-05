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
        public ActionResult SetReceiptCustomers (int receiptId, [FromBody]int[] customers) {
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
        public ActionResult<Customer[]> GetReceiptCustomers (int receiptId) {
            if (receiptId < 1) {
                return BadRequest ();
            }
            var customersIds = context.ReceiptAndCustomerBinders.Where (e => e.ReceiptId == receiptId).Select(binding=>binding.CustomerId).ToArray();

            if (customersIds == null) {
                return BadRequest ();
            }

            return context.Customers.Where (cus => customersIds.Contains (cus.Id)).ToArray ();
        }

        [HttpPost]
        [Route("[action]")]
        public ActionResult<Customer[]> GetAvailableCustomers (string searchString) {
            return context.Customers.Where(w=>w.CustomerName.ToLower().Contains(searchString.ToLower()) || w.CustomerSurname.ToLower ().Contains (searchString.ToLower ())).ToArray();
        }
    }
}