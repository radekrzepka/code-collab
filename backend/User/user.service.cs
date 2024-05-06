using CodeCollab.Database;
using CodeCollab.Models.UserModel;

namespace CodeCollab.Services.UserService
{
  public class UserService(ApplicationDbContext dbContext)
  {
    private readonly ApplicationDbContext _dbContext = dbContext;

    public IEnumerable<User> GetAllUsers()
    {
      return _dbContext.Users.ToList();
    }

    public User GetUserById(int id)
    {
      return _dbContext.Users.FirstOrDefault(u => u.Id == id);
    }

    public User AddUser(User user)
    {
      _dbContext.Users.Add(user);
      _dbContext.SaveChanges();
      return user;
    }
  }
}
