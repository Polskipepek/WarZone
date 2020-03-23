using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Model.Database;

namespace WarZoneWebApp.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase {

        private readonly Context context;

        public CustomerController (Context context) {
            this.context = context;
        }

        //[HttpPost]
        //[Route("addcustomer")]
        //public async Task<IActionResult> AddCustomer (Customer customer) {

        //    await context.Receipts.AddAsync(new Receipt { CreationDate = DateTime.Now, ModifyDate = DateTime.Now, Customer = customer });
        //    await context.SaveChangesAsync();
        //    return Ok();
        //}
        [HttpPost]
        [Route("getcustomers")]
        public ActionResult<Receipt[]> GetCustomers () {
            //3. Handle request
            //4. return value

            return context.Receipts.Where(e => e.CloseDate == null).OrderByDescending(e => e.ModifyDate).ToArray();
        }



    }
}