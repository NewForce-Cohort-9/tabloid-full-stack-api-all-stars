using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IReactionRepository
    {
        public List<Reaction> GetAll();
    }
}
