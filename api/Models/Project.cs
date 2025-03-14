using System;
using System.Collections.Generic;

namespace DesbravadorSoftware.API.Models {
    public class Project {
        public int Id { get; set; }
        public string? Name { get; set; } 
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Status { get; set; }
        public string? Risk { get; set; }
        public List<Employee> Employees { get; set; } = new List<Employee>();
    }
}