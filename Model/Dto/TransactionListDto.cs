namespace Model.Dto {
    public class TransactionListDto {
        public int ServiceId { get; set; }
        public string ServiceName { get; set; }

        public decimal Price { get; set; }

        public int Count { get; set; }

        public decimal TotalPrice { get; set; }
    }
}
