using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAllApprovedPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, p.Title, p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId, c.Name, up.DisplayName
                                        FROM Post p
                                        LEFT JOIN Category c On c.Id = p.CategoryId
                                        LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                                        WHERE p.IsApproved = 1 AND p.PublishDateTime <= CURRENT_TIMESTAMP
                                        ORDER BY p.PublishDateTime DESC";

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Category = new Category()
                            {
                                Name = DbUtils.GetString(reader, "Name")
                            },
                            UserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            }
                        });
                    }
                    
                    reader.Close();

                    return posts;
                }
            }
        }

        public List<Post> GetAllByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, p.Title, p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId, c.Name, up.DisplayName
                                        FROM Post p
                                        LEFT JOIN Category c On c.Id = p.CategoryId
                                        LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                                        WHERE p.UserProfileId = @id AND p.IsApproved = 1 AND p.PublishDateTime <= CURRENT_TIMESTAMP
                                        ORDER BY p.PublishDateTime DESC";

                    cmd.Parameters.AddWithValue("@id", userId);

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Category = new Category()
                            {
                                Name = DbUtils.GetString(reader, "Name")
                            },
                            UserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            }
                        });
                    }

                    reader.Close();

                    return posts;
                }
            }
        }
    }
}
