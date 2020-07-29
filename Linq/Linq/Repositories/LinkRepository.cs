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

        public List<Link> GetByUserId(int id)
        { 
            return _context.Links
                            .Include(l => l.Category)
                            .Include(l => l.UserProfile)
                            .Where(l => l.UserProfileId == id)
                            .OrderByDescending(l => l.CreateDate)
                            .ToList();
        }
            



    }
}
