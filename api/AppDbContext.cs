using DesbravadorSoftware.API.Models;
using Microsoft.EntityFrameworkCore;

public class AppDbContext: DbContext {
    public AppDbContext(DbContextOptions<AppDbContext> options): base(options) { }

    public DbSet<Project> Projects { get; set; }
    public DbSet<Employee> Employees { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        base.OnModelCreating(modelBuilder);
    }
}