﻿using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        // GET: api/<PostController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAllApprovedPosts());
        }

        [HttpGet("GetAllByUserId/{id}")]
        public IActionResult GetAllByUserId(int id)
        {
            var posts = _postRepository.GetAllByUserId(id);
            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }

        // GET api/<PostController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetById(id);

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        // POST api/<PostController>
        [HttpPost]
        public IActionResult Post(Post post)
        {
            post.CreateDateTime = DateTime.Now;
            post.PublishDateTime = DateTime.Now;
            _postRepository.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        // PUT api/<PostController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.Update(post);
            return NoContent();
        }

        // DELETE api/<PostController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("GetAllApprovedPostsByTagId/{id}")]
        public IActionResult GetAllApprovedPostsByTagId(int id)
        {
            var posts = _postRepository.GetAllApprovedPostsByTagId(id);
            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }

        [HttpGet("GetAllApprovedPostsByCategoryId/{id}")]
        public IActionResult GetAllApprovedPostsByCategoryId(int id)
        {
            var posts = _postRepository.GetAllApprovedPostsByCategoryId(id);
            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }

        [HttpGet("GetAllApprovedPostsByUserId/{id}")]
        public IActionResult GetAllApprovedPostsByUserId(int id)
        {
            var posts = _postRepository.GetAllApprovedPostsByUserId(id);
            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }

        // PUT api/<PostController>/5
        [HttpPatch("{id}")]
        public IActionResult Patch( int id)
        {
            //if (id != post.Id)
            //{
            //    return BadRequest();
            //}

            _postRepository.IsApproved(id);
            return NoContent();
        }
    }
}
