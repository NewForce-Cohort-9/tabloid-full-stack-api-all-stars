using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostTagRepository
    {
        List<PostTag> GetByPostId(int id);
        void Add(PostTag postTag);
    }
}
