using Microsoft.Extensions.Hosting;
using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class ReactionRepository : BaseRepository, IReactionRepository
    {
        public ReactionRepository(IConfiguration configuration) : base(configuration) { }

        public List<Reaction> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT r.Id, r.[Name], r.ImageLocation FROM Reaction r";

                    var reader = cmd.ExecuteReader();

                    var reactions = new List<Reaction>();

                    while (reader.Read())
                    {
                        reactions.Add(new Reaction()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                        });
                    }

                    reader.Close();

                    return reactions;
                }
            }
        }
        public void Add(Reaction reaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Reaction (Name, ImageLocation)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Name, @ImageLocation)";
                    DbUtils.AddParameter(cmd, "@Name", reaction.Name);
                    DbUtils.AddParameter(cmd, "@ImageLocation", reaction.ImageLocation);

                    reaction.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
