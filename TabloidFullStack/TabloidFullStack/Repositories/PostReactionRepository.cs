﻿using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class PostReactionRepository : BaseRepository, IPostReactionRepository
    {
        public PostReactionRepository(IConfiguration configuration) : base(configuration) { }
        public List<PostReaction> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                            pr.PostId,
                            pr.ReactionId,
                            pr.UserProfileId,
                            r.Name, 
                            r.ImageLocation
                        FROM PostReaction pr
                        LEFT JOIN Reaction r ON r.Id = pr.ReactionId";

                    var reader = cmd.ExecuteReader();

                    var postReactions = new List<PostReaction>();

                    while (reader.Read())
                    {
                        postReactions.Add(new PostReaction()
                        {
                            Id = DbUtils.GetInt(reader, "ReactionId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            ReactionId = DbUtils.GetInt(reader, "ReactionId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Reaction = new Reaction()
                            {
                                Id = DbUtils.GetInt(reader, "ReactionId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                            }
                        });
                    }

                    reader.Close();

                    return postReactions;
                }
            }
        }
        public List<PostReaction> GetReactionsByPostId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                            pr.PostId,
                            pr.ReactionId,
                            r.Name, 
                            r.ImageLocation, 
                            COUNT(pr.ReactionId) as ReactionCount
                        FROM PostReaction pr
                        LEFT JOIN Reaction r ON r.Id = pr.ReactionId
                        WHERE pr.PostId = @id
                        GROUP BY pr.PostId, pr.ReactionId, r.Name, r.ImageLocation";

                    DbUtils.AddParameter(cmd, "@id", id);

                    List<PostReaction> postReactions = new List<PostReaction>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        postReactions.Add(new PostReaction()
                        {
                            Id = DbUtils.GetInt(reader, "ReactionId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            ReactionId = DbUtils.GetInt(reader, "ReactionId"),
                            Reaction = new Reaction()
                            {
                                Id = DbUtils.GetInt(reader, "ReactionId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                            },
                            ReactionCount = DbUtils.GetInt(reader, "ReactionCount")
                        });

                    }
                    reader.Close();

                    return postReactions;
                }
            }
        }
        public void Add(PostReaction postReaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO PostReaction (PostId, ReactionId, UserProfileId)
                                    OUTPUT INSERTED.ID
                                    VALUES (@PostId, @ReactionId, @UserProfileId)";
                    DbUtils.AddParameter(cmd, "@PostId", postReaction.PostId);
                    DbUtils.AddParameter(cmd, "@ReactionId", postReaction.ReactionId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", postReaction.UserProfileId);

                    postReaction.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
