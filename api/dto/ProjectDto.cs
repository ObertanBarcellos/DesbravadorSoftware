public class ProjectDto {
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string? Status { get; set; }
    public string? Risk { get; set; }
    public List<EmployeeDto> Employees { get; set; } = new List<EmployeeDto>();
}