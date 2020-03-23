using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
using Model.Database;
using System.Linq;

namespace WarZoneWebApp.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase {

        private readonly Context context;

        public TransactionController (Context context) {
            this.context = context;
        }

        [HttpPost]
        [Route ("[action]")]
        public ActionResult<Transaction[]> GetTransactions ([FromBody]Receipt receipt) {
            if (receipt == null || receipt.Customer == null) {
                return BadRequest ();
            }
            context.Transactions.Include (e => e.Customer).Include (e => e.Service).Include (e => e.Receipt).Load ();
            var transactions = context.Transactions.Where (e => e.Receipt == receipt).OrderBy (e => e.ServiceId).ToArray ();

            return transactions;
        }




    }
}