using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAllApprovedPosts();
        List<Post> GetAllByUserId(int userId);
        Post GetById(int id);
    }
}
