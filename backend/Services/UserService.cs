using backend.Database;
using backend.Models;
using backend.Models.User;
using backend.Models.User.Dto;

namespace backend.Services
{
  public class UserService(ApplicationDbContext dbContext)
  {
    public User GetUserById(int id)
    {
      return dbContext.Users.FirstOrDefault(u => u.Id == id);
    }

    public void AddUser(UserRegisterDto user)
    {
      Console.WriteLine(user);
      // dbContext.Users.Add(user);
      // dbContext.SaveChanges();
      // return user;
    }
  }
}