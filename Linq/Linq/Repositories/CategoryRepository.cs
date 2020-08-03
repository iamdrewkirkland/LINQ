using Linq.Data;
using Linq.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Linq.Repositories
{
    public class CategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Category GetById(int id)
        {
            return _context.Categories
                            .Include(c => c.UserProfile)
                            .FirstOrDefault(c => c.Id == id);
        }
        public Category GetByCategoryName(UserProfile user, string categoryName)
        {
            return _context.Categories
                            .Include(c => c.UserProfile)
                            .FirstOrDefault(c => c.Name == categoryName && c.UserProfileId == user.Id );
        }

        public List<Category> GetByUserId(int id)
        {
            return _context.Categories
                            .Include(c => c.UserProfile)
                            .Where(c => c.UserProfileId == id)
                            .OrderByDescending(c => c.IsFavorite)
                            .ToList();
        }
        public void Add(Category category)
        {
            _context.Add(category);
            _context.SaveChanges();
        }

        public void Update(Category category)
        {
            _context.Entry(category).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(Category category)
        {
            foreach (var link in _context.Links
                .Where(l => l.CategoryId == category.Id))
            {
                link.CategoryId = null;
                _context.Links.Update(link);
            }

            _context.Categories.Remove(category);
            _context.SaveChanges();
        }
    }
}
