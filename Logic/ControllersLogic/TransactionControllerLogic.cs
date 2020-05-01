using Logic.DtoMappers;
using Microsoft.EntityFrameworkCore;
using Model;
using Model.Dto;
using System.Linq;

namespace Logic.ControllersLogic {
    public class TransactionControllerLogic {
        readonly Context context;

        public TransactionControllerLogic (Context context) {
            this.context = context;
        }

        public TransactionListDto[] GetTransactionsByReceiptId (int receiptId) {
            context.Transactions.Include (e => e.Customer).Include (e => e.Service).Include (e => e.Receipt).Load ();
            var transactions = context.Transactions.Where (e => e.ReceiptId == receiptId).OrderBy (e => e.ServiceId).ToArray ();

            return new TransactionListDtoMapper ().Map (transactions);
        }
    }
}
