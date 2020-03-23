using Microsoft.AspNetCore.Mvc;
using Model;
using Model.Database;
using System.Threading.Tasks;

namespace WarZoneWebApp.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class ConsentController : ControllerBase {

        private readonly Context context;

        public ConsentController (Context context) {
            this.context = context;
        }

        [HttpPost]
        [Route ("[action]")]
        public async Task<IActionResult> AddCustomer ([FromBody]Customer customer) {
            if (string.IsNullOrWhiteSpace (customer.CustomerName) || string.IsNullOrWhiteSpace (customer.CustomerSurname)) {
                return BadRequest ();
            }
            await context.Customers.AddAsync (customer);
            await context.SaveChangesAsync ();
            return Ok ();
        }




    }
}