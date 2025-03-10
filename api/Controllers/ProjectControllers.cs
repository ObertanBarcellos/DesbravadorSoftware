using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DesbravadorSoftware.API.Models;
using System.Text.Json.Serialization;

[Route("api/project")]
[ApiController]
public class ProjectController: ControllerBase {
    private readonly AppDbContext _context;

    public ProjectController(AppDbContext context) {
        _context = context;
    }

    // GET: api/project
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProject() {
        var projects = await _context.Projects.Include(p => p.Employees).Select(p => new ProjectDto {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                StartDate = p.StartDate,
                EndDate = p.EndDate,
                Status = p.Status,
                Risk = p.Risk,
                Employees = p.Employees.Select(e => new EmployeeDto {
                    Id = e.Id,
                    Name = e.Name,
                    Email = e.Email,
                    ProjectId = e.ProjectId
                }).ToList()
            }).ToListAsync();

        return projects;
    }

    // GET: api/project/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectDto>> GetProject(int id) {
        var project = await _context.Projects.Include(p => p.Employees).Select(p => new ProjectDto {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                StartDate = p.StartDate,
                EndDate = p.EndDate,
                Status = p.Status,
                Risk = p.Risk,
                Employees = p.Employees.Select(e => new EmployeeDto {
                    Id = e.Id,
                    Name = e.Name,
                    Email = e.Email,
                    ProjectId = e.ProjectId
                }).ToList()
            }).FirstOrDefaultAsync(p => p.Id == id);

        if (project == null) {
            return NotFound();
        }

        return project;
    }

    // POST: api/project
    [HttpPost]
    public async Task<ActionResult<ProjectDto>> PostProject(Project project) {
        project.StartDate = DateTime.UtcNow;
        project.EndDate = project.EndDate.ToUniversalTime();
        project.Status = "IN_ANALYSIS";

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        var projectDto = new ProjectDto {
            Id = project.Id,
            Name = project.Name,
            Description = project.Description,
            StartDate = project.StartDate,
            EndDate = project.EndDate,
            Status = project.Status,
            Risk = project.Risk,
            Employees = project.Employees.Select(e => new EmployeeDto {
                Id = e.Id,
                Name = e.Name,
                Email = e.Email,
                ProjectId = e.ProjectId
            }).ToList()
        };

        return CreatedAtAction(nameof(GetProject), new { id = project.Id }, projectDto);
    }

    // PUT: api/project/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProject(int id, Project project) {
        if (id != project.Id) {
            return BadRequest();
        }

        if (project.Status == "CLOSED") {
            project.EndDate = DateTime.UtcNow;
        }

        _context.Entry(project).State = EntityState.Modified;

        try {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) {
            if (!ProjectExists(id)) {
                return NotFound();
            }
            else {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/project/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(int id) {
        var project = await _context.Projects.Include(p => p.Employees).FirstOrDefaultAsync(p => p.Id == id);

        if (project == null) {
            return NotFound();
        }

        _context.Employees.RemoveRange(project.Employees);

        // Remove o Project
        _context.Projects.Remove(project);

        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ProjectExists(int id) {
        return _context.Projects.Any(e => e.Id == id);
    }
}