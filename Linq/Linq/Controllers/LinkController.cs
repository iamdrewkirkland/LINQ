using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Linq.Data;
using Linq.Models;
using Linq.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Linq.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LinkController : ControllerBase
    {

        private readonly LinkRepository _linkRepository;
        private readonly UserProfileRepository _userProfileRepository;
        private readonly CategoryRepository _categoryRepository;


        public LinkController(ApplicationDbContext context)
        {
            _linkRepository = new LinkRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
            _categoryRepository = new CategoryRepository(context);

        }

        [HttpGet]
        public IActionResult Get()
        {
            var currentUser = GetCurrentUserProfile();
            return Ok(_linkRepository.GetByUserId(currentUser.Id));
        }

        [AllowAnonymous]
        [HttpGet("{username}/{categoryName}")]
        public IActionResult Get(string username, string categoryName)
        {

            var user = _userProfileRepository.GetByUsername(username);
            
            var requestingUser = GetCurrentUserProfile();


            var category = _categoryRepository.GetByCategoryName(user, categoryName);
            if (category == null || user == null)
            {
                return NotFound();
            }
            if (category.IsPublic || requestingUser.Id == category.UserProfileId)
            {
                var links = _linkRepository.GetByCategoryName(user, category);

                return Ok(links);

            }


            if (requestingUser == null)
            {
                return Unauthorized();
            }


            var requestedLinks = _linkRepository.GetRequestedLinks(requestingUser.Id, category.Id);

            return Ok(requestedLinks);



        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var link = _linkRepository.GetById(id);
            var currentUser = GetCurrentUserProfile();

            if (link.UserProfileId != currentUser.Id)
            {
                return Unauthorized();
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
            if (link.CategoryId != null)
            {
                var category = _categoryRepository.GetById((int)link.CategoryId);

                if (category.UserProfileId != currentUser.Id)
                {

                    return BadRequest();

                }
            }

            link.UserProfileId = currentUser.Id;
            link.CreateDate = DateTime.Now;
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
            var currentUser = GetCurrentUserProfile();
            var link = _linkRepository.GetById(id);
            if (link.UserProfileId != currentUser.Id)
            {
                return Unauthorized();
            }
            _linkRepository.Delete(link);
            return NoContent();
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
