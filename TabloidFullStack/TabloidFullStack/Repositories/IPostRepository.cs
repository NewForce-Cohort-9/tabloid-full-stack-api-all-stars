using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAllApprovedPosts();
        List<Post> GetAllByUserId(int userId);
        Post GetById(int id);
        void Add(Post post);
        void Delete(int id);
        void Update(Post post);
        List<Post> GetAllApprovedPostsByTagId(int id);
        List<Post> GetAllApprovedPostsByCategoryId(int id);
        List<Post> GetAllApprovedPostsByUserId(int id);
    }
}
