using Microsoft.Extensions.Hosting;
using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class PostTagRepository : BaseRepository, IPostTagRepository
    {
        public PostTagRepository(IConfiguration configuration) : base(configuration) { }
        public List<PostTag> GetByPostId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT pt.Id, pt.PostId, pt.TagId, p.Title, t.Name
                          FROM PostTag pt
                               LEFT JOIN Post p on p.Id = pt.PostId
                               LEFT JOIN Tag t ON t.Id = pt.TagId
                         WHERE p.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    List<PostTag> postTags = new List<PostTag> ();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        postTags.Add(new PostTag()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            TagId = DbUtils.GetInt(reader, "TagId"),
                            Tag = new Tag()
                            {
                                Name = DbUtils.GetString(reader, "Name")
                            }
                        });
                        
                    }
                    reader.Close();

                    return postTags;
                }
            }
        }

        public void Add(PostTag postTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO PostTag (PostId, TagId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@PostId, @TagId)";
                    DbUtils.AddParameter(cmd, "@PostId", postTag.PostId);
                    DbUtils.AddParameter(cmd, "@TagId", postTag.TagId);

                    postTag.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = "DELETE FROM PostTag WHERE Id = @Id;";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
