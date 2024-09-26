using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }
}
