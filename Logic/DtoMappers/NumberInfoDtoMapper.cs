using Model;
using Model.Dto.Statistics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Logic.DtoMappers {
    public class NumberInfoDtoMapper {
        private Context context;

        public NumberInfoDtoMapper(Context context) {
            this.context = context;
        }

        public NumberInfo GetDailyRevenues (DateTime date) {
            var totalReceipts = context.Receipts.Where (r => r.CreationDate.Date == date).ToList ();
            var subTotalReceipts = context.Receipts.Where (r => r.CreationDate.Date == date - TimeSpan.FromDays (7)).ToList ();

            return new NumberInfo (){
                Total = totalReceipts.Sum(e=>e.GetTotalPrice(context)),
                Subtotal = subTotalReceipts.Sum (e => e.GetTotalPrice (context)),
            };
        }
    }
}
