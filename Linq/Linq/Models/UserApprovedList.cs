using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Linq.Models
{
    public class UserApprovedList
    {
        public int Id { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public Category Category { get; set; }
        
        [Required]
        public int SharedUserId { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}
