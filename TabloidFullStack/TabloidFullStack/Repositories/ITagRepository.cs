﻿using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAll();
        Tag GetById(int id);
        void Add(Tag tag);
        void Update(Tag tag);
        void Delete(int id);
    }
}
