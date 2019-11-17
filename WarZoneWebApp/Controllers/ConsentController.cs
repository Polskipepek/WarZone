using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Model.Database;

namespace WarZoneWebApp.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ConsentController : ControllerBase {

        private readonly Context context;

        public ConsentController (Context context) {
            this.context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddCustomer([FromBody]Customer customer) {
            //3. Handle request
            //4. return value
            if (string.IsNullOrWhiteSpace(customer.CustomerName) || string.IsNullOrWhiteSpace(customer.CustomerSurname)) {
                return BadRequest();
            }
            await context.Customers.AddAsync(customer);
            await context.SaveChangesAsync();
            return Ok();
        }


    }
}