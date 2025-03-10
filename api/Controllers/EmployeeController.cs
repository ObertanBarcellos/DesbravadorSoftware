using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DesbravadorSoftware.API.Models;

[Route("api/employee")]
[ApiController]
public class EmployeeController: ControllerBase
{
    private readonly AppDbContext _context;

    public EmployeeController(AppDbContext context) {
        _context = context;
    }

    // GET: api/employee
    [HttpGet]
    public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployees() {
        var employees = await _context.Employees.Select(e => new EmployeeDto {
                Id = e.Id,
                Name = e.Name,
                Email = e.Email,
                ProjectId = e.ProjectId
            }).ToListAsync();

        return employees;
    }

    // GET: api/employee/5
    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployee(int id) {
        var employees = await _context.Employees.Where(e => e.ProjectId == id).Select(e => new EmployeeDto {
                Id = e.Id,
                Name = e.Name,
                Email = e.Email,
                ProjectId = e.ProjectId
            }).ToListAsync();

        return employees;
    }

    // POST: api/employee
    [HttpPost]
    public async Task<ActionResult<EmployeeDto>> PostEmployee(Employee employee) {
        var projectExists = await _context.Projects.AnyAsync(p => p.Id == employee.ProjectId);
        if (!projectExists) {
            return BadRequest("ProjectId inválido. O projeto especificado não existe.");
        }

        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        var employeeDto = new EmployeeDto {
            Id = employee.Id,
            Name = employee.Name,
            Email = employee.Email,
            ProjectId = employee.ProjectId
        };

        return CreatedAtAction("GetEmployee", new { id = employee.Id }, employeeDto);
    }

    // DELETE: api/employee/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(int id) {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null) {
            return NotFound();
        }

        _context.Employees.Remove(employee);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool EmployeeExists(int id) {
        return _context.Employees.Any(e => e.Id == id);
    }
}