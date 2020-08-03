using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Linq.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(55)]
        public string Name { get; set; }

        [StringLength(7, MinimumLength = 7)]
        public string Color { get; set; }

        [Required]
        public Boolean IsPublic { get; set; }

        [Required]
        public Boolean IsFavorite { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        public List<Link> UserLinks { get; set; }


    }
}
