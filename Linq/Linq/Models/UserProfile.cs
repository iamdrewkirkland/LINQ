using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Linq.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required]
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(28)]
        public string Username { get; set; }

        [Required]
        [MaxLength(55)]
        public string Email { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }
    }
}
