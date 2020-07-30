using Linq.Data;
using Linq.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Linq.Repositories
{
    public class LinkRepository
    {
        private readonly ApplicationDbContext _context;

        public LinkRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        //public List<Link> GetAll() 
        //{
        //    return _context.Links
        //                .Include(l => l.Category)
        //                .Include(l => l.UserProfile)
        //                .ToList();
        //}

        public Link GetById(int id)
        {
            return _context.Links
                            .Include(l => l.Category)
                            .Include(l => l.UserProfile)
                            .FirstOrDefault(l => l.Id == id);
        }

        public List<Link> GetByUserId(int id)
        { 
            return _context.Links
                            .Include(l => l.Category)
                            .Include(l => l.UserProfile)
                            .Where(l => l.UserProfileId == id)
                            .OrderByDescending(l => l.CreateDate)
                            .ToList();
        }
        public void Add(Link link)
        {
            _context.Add(link);
            _context.SaveChanges();
        }

        public void Update(Link link)
        {
            _context.Entry(link).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(Link link)
        {
                        
            _context.Links.Remove(link);
            _context.SaveChanges();
        }



    }
}
