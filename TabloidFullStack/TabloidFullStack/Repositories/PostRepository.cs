using Microsoft.Extensions.Hosting;
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
                    cmd.CommandText = @"SELECT p.Id, p.Title, p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId, p.Content, p.ImageLocation, c.Name, up.DisplayName
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
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
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

        public Post GetById (int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.PublishDateTime, p.UserProfileId, p.CategoryId, up.DisplayName
                          FROM Post p
                               LEFT JOIN UserProfile up on up.Id = p.UserProfileId
                         WHERE p.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Post post = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        post = new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            }
                        };
                    }
                    reader.Close();

                    return post;
                }
            }
        }

        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Post (Title, Content, ImageLocation, 
                                                                 CreateDateTime, PublishDateTime, IsApproved, CategoryId, UserProfileId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Title, @Content, @ImageLocation, 
                                                @CreateDateTime, @PublishDateTime, @IsApproved, @CategoryId, @UserProfileId)";
                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", post.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@PublishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@IsApproved", post.IsApproved);
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Post WHERE Id = @Id;" +
                                        "DELETE FROM PostTag WHERE PostId = @PostId";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    DbUtils.AddParameter(cmd, "@PostId", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Post
                           SET Title = @Title,
                               Content = @Content,
                               ImageLocation = @ImageLocation,
                               CategoryId = @CategoryId,
                               IsApproved = @IsApproved
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@IsApproved", post.IsApproved);
                    DbUtils.AddParameter(cmd, "@Id", post.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Post> GetAllApprovedPostsByTagId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT p.Id, p.Title, p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId, c.Name, up.DisplayName, pt.PostId, pt.TagId
                                        FROM Post p
                                        LEFT JOIN Category c On c.Id = p.CategoryId
                                        LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                                        LEFT JOIN PostTag pt ON pt.PostId = p.Id
                                        WHERE p.IsApproved = 1 AND p.PublishDateTime <= CURRENT_TIMESTAMP AND pt.TagId = @Id
                                        ORDER BY p.PublishDateTime DESC"
                    ;

                    DbUtils.AddParameter(cmd, "@Id", id);

                    List<Post> posts = new List<Post>();

                    var reader = cmd.ExecuteReader();

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

        public List<Post> GetAllApprovedPostsByCategoryId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT p.Id, p.Title, p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId, c.Name, up.DisplayName
                                        FROM Post p
                                        LEFT JOIN Category c On c.Id = p.CategoryId
                                        LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                                        WHERE p.IsApproved = 1 AND p.PublishDateTime <= CURRENT_TIMESTAMP AND c.Id = @Id
                                        ORDER BY p.PublishDateTime DESC"
                    ;

                    DbUtils.AddParameter(cmd, "@Id", id);

                    List<Post> posts = new List<Post>();

                    var reader = cmd.ExecuteReader();

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

        public List<Post> GetAllApprovedPostsByUserId(int id)
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
                                        WHERE p.IsApproved = 1 AND p.PublishDateTime <= CURRENT_TIMESTAMP AND up.Id = @Id
                                        ORDER BY p.PublishDateTime DESC";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    List<Post> posts = new List<Post>();

                    var reader = cmd.ExecuteReader();

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
