using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Linq.Models
{
    public class UserApprovedList
    {
        [Required]
        public int CategoryId { get; set; }

        public Category Category { get; set; }
        
        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}
