using Logic.ControllersLogic;
using Microsoft.AspNetCore.Mvc;
using Model;
using Model.Database;
using Model.Dto;

namespace WarZoneWebApp.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase {

        private Context context;

        private readonly TransactionControllerLogic transactionControllerLogic;

        public TransactionController (Context context, TransactionControllerLogic transactionControllerLogic) {
            this.context = context;
            this.transactionControllerLogic = transactionControllerLogic;
        }

        [HttpPost]
        [Route ("[action]")]
        public ActionResult<TransactionListDto[]> GetTransactions ([FromBody]Receipt receipt) {
            if (receipt == null) {
                return BadRequest ();
            }
            return transactionControllerLogic.GetTransactionsByReceiptId (receipt.Id);
        }

    }
}