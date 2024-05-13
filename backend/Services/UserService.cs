using backend.Database;
using backend.Models;

namespace backend.Services
{
  public class UserService(ApplicationDbContext dbContext)
  {
    public IEnumerable<User> GetAllUsers()
    {
      return dbContext.Users.ToList();
    }

    public User GetUserById(int id)
    {
      return dbContext.Users.FirstOrDefault(u => u.Id == id);
    }

    public User AddUser(User user)
    {
      dbContext.Users.Add(user);
      dbContext.SaveChanges();
      return user;
    }
  }
}
