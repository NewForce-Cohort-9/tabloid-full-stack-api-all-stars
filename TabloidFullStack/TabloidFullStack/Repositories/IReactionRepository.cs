using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IReactionRepository
    {
        public List<Reaction> GetAll();
        public void Add(Reaction reaction);
    }
}
