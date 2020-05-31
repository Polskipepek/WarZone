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
        public ActionResult SetCustomers (int receiptId, Customer[] customersId) {
            if (receiptId == 0 || customersId.Length == 0) {
                return BadRequest ();
            }

            foreach (Customer c in customersId) {
                context.ReceiptAndCustomerBinders.Add (new ReceiptAndCustomerBinder () { ReceiptId = receiptId, CustomerId = c.Id });
            }
            context.SaveChanges ();
            return Ok ();
        }

        [HttpPost]
        [Route ("[action]")]
        public ActionResult<ReceiptAndCustomerBinder[]> GetCustomers ([FromBody]Receipt receipt) {
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
    }
}