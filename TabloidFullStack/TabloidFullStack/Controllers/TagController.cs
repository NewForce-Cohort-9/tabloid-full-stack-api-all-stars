
using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    public class TagController : Controller
    {
        private readonly ITagRepository _tagRepository;

        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tagRepository.GetAllTags());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _tagRepository.GetTagById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        //// GET: TagController/Create
        //public ActionResult Create()
        //{
        //    return View();
        //}

        //// POST: TagController/Create
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Create(Tag tag)
        //{
        //    try
        //    {
        //        _tagRepository.Add(tag);
        //        return RedirectToAction("Index");
        //    }
        //    catch (Exception ex)
        //    {
        //        return View(tag);
        //    }
        //}

        //// GET: TagController/Edit/5
        //public ActionResult Edit(int id)
        //{
        //    Tag tag = _tagRepository.GetTagById(id);

        //    return View();
        //}

        //// POST: TagController/Edit/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Edit(int id, Tag tag)
        //{
        //    try
        //    {
        //        _tagRepository.Update(tag);
        //        return RedirectToAction("Index");
        //    }
        //    catch
        //    {
        //        return View(tag);
        //    }
        //}

        //// GET: TagController/Delete/5
        //public ActionResult Delete(int id)
        //{
        //    Tag tag = _tagRepository.GetTagById(id);

        //    return View(tag);
        //}

        //// POST: TagController/Delete/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Delete(int id, Tag tag)
        //{
        //    try
        //    {
        //        _tagRepository.Delete(id);

        //        return RedirectToAction("Index");
        //    }
        //    catch
        //    {
        //        return View(tag);
        //    }
        //}
    }
}
