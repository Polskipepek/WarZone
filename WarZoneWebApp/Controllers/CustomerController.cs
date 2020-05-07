using Microsoft.AspNetCore.Mvc;
using Model;
using Model.Database;
using System.Linq;

namespace WarZoneWebApp.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase {

        private readonly Context context;

        public CustomerController (Context context) {
            this.context = context;
        }

        [HttpPost]
        [Route ("[action]")]
        public ActionResult<Receipt[]> GetCustomers () {
            //3. Handle request
            //4. return value

            return context.Receipts.Where (e => e.CloseDate == null).OrderByDescending (e => e.ModifyDate).ToArray ();
        }
    }
}