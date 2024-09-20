using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetByPostId(int id);
        void Add(Comment comment);
        void Delete(int id);
    }
}
