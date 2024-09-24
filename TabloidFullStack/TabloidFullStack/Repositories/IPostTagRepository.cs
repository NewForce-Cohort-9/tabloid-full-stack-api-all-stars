using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostTagRepository
    {
        List<Tag> GetByPostId(int id);
        void Add(PostTag postTag);
    }
}
