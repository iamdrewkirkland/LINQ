using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Linq.Data;
using Linq.Models;
using Linq.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Linq.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LinkController : ControllerBase
    {

        private readonly LinkRepository _linkRepository;
        private readonly UserProfileRepository _userProfileRepository;
        
        public LinkController(ApplicationDbContext context)
        {
            _linkRepository = new LinkRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
            
        }

        [HttpGet]
        public IActionResult Get()
        {
            var currentUser = GetCurrentUserProfile();
            return Ok(_linkRepository.GetByUserId(currentUser.Id));
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
