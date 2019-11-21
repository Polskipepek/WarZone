using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
using Model.Database;

namespace WarZoneWebApp.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ReceiptController : ControllerBase {

        private readonly Context context;

        public ReceiptController (Context context) {
            this.context = context;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddReceipt (Customer customer) {

            await context.Receipts.AddAsync(new Receipt { CreationDate = DateTime.Now, ModifyDate = DateTime.Now, Customer = customer });
            await context.SaveChangesAsync();
            return Ok();
        }
        [HttpGet]
        [Route("[action]")]
        public ActionResult<Receipt[]> GetReceipts () {
            //3. Handle request
            //4. return value
            context.Receipts.Include(e => e.Customer).Load();
            var receipts = context.Receipts.Where(e=>e.Id != -1).OrderByDescending(e => e.ModifyDate).ToList();
            receipts.ForEach(e => e.GetTotalPrice(context));

            return receipts.ToArray();
        }



    }
}