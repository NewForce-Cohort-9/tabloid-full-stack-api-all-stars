using Microsoft.Extensions.Hosting;
using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }

        public List<Comment> GetByPostId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id AS 'CommentId', c.PostId, c.UserProfileId, up.DisplayName, c.[Subject], c.Content, c.CreateDateTime, p.Title
                        FROM Comment c
                        JOIN Post p
                        ON c.PostId = p.Id
                        JOIN UserProfile up
                        ON c.UserProfileId = up.Id
                        WHERE c.PostId = @id
                        ORDER BY c.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();

                    while (reader.Read())
                    {
                        comments.Add(new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "CommentId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            Post = new Post()
                            {
                                Id = DbUtils.GetInt(reader, "PostId"),
                                Title = DbUtils.GetString(reader, "Title"),
                            },
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            },
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                        });
                    }

                    reader.Close();

                    return comments;
                }
            }
        }

        public void Add(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Comment (PostId, UserProfileId, [Subject], Content, CreateDateTime)
                        OUTPUT INSERTED.ID
                        VALUES (@postId, @userProfileId, @subject, @content, @createDateTime)";

                    DbUtils.AddParameter(cmd, "@postId", comment.PostId);
                    DbUtils.AddParameter(cmd, "@userProfileId", comment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@subject", string.IsNullOrEmpty(comment.Subject) ? (object)DBNull.Value : comment.Subject);
                    DbUtils.AddParameter(cmd, "@content", string.IsNullOrEmpty(comment.Content) ? (object)DBNull.Value : comment.Content);
                    DbUtils.AddParameter(cmd, "@createDateTime", comment.CreateDateTime);

                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Comment
                        SET [Subject] = @subject,
                            Content = @content
                        WHERE Id = @id;
                        ";

                    DbUtils.AddParameter(cmd, "@subject", comment.Subject);
                    DbUtils.AddParameter(cmd, "@content", comment.Content);
                    DbUtils.AddParameter(cmd, "@id", comment.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
