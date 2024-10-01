using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostReactionController : ControllerBase
    {
        private readonly IPostReactionRepository _postReactionRepository;
        public PostReactionController(IPostReactionRepository postReactionRepository)
        {
            _postReactionRepository = postReactionRepository;
        }

        // GET: api/<PostReactionController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postReactionRepository.GetAll());
        }

        // GET api/<PostReactionController>/5
        [HttpGet("GetReactionsByPostId/{id}")]
        public IActionResult GetReactionsByPostId(int id)
        {
            var reactions = _postReactionRepository.GetReactionsByPostId(id);
            if (reactions == null)
            {
                return NotFound();
            }
            return Ok(reactions);
        }

        // POST api/<PostReactionController>
        [HttpPost]
        public IActionResult Post(PostReaction postReaction)
        {
            _postReactionRepository.Add(postReaction);
            return CreatedAtAction("Get", new { id = postReaction.Id }, postReaction);
        }
    }
}
