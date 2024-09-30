using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostReactionRepository
    {
        public List<PostReaction> GetReactionsByPostId(int id);
        public void Add(PostReaction postReaction);
    }
}
