using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Linq.Models
{
    public class Link
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(55)]
        public string Title { get; set; }

        [Required]
        [MaxLength(28)]
        public string Url { get; set; }

        [Required]
        public Boolean IsFavorite { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }

        public int CategoryId { get; set; }

        public Category Category { get; set; }
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}
