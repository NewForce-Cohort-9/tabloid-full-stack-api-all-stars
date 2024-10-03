using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ISubscriptionRepository
    {
        List<Subscription> GetAll();
        List<Subscription> GetByUserId(int id);
        void Add(Subscription subscription);
        public void Update(Subscription subscription);
    }
}