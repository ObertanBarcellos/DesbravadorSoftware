namespace DesbravadorSoftware.API.Models {
    public class Employee {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public int ProjectId { get; set; }
        public Project? Project { get; set; }
    }
}