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
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var link = _linkRepository.GetById(id);
            var currentUser = GetCurrentUserProfile();

            if (link.UserProfileId != currentUser.Id)
            {
                return BadRequest();
            }
            if (link == null)
            {
                return NotFound();
            }
            return Ok(link);
        }

        [HttpPost]
        public IActionResult Post(Link link)
        {
            var currentUser = GetCurrentUserProfile();
            link.UserProfileId = currentUser.Id;
            _linkRepository.Add(link);
            return CreatedAtAction("Get", new { id = link.Id }, link);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Link link)
        {
            var currentUser = GetCurrentUserProfile();
            link.UserProfileId = currentUser.Id;
            if (id != link.Id)
            {
                return BadRequest();
            }

            _linkRepository.Update(link);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _linkRepository.Delete(id);
            return NoContent();
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
