import { db } from "@/utils/dbConnection";
import Image from "next/image";

export default async function DynamicPost({ params }) {
  const postParams = await params;
  const postQuery = (
    await db.query(
      //   `SELECT post.username, posts.timestamp, posts.post_title, posts.post_image, posts.post_alt, comments.username, comments.timestamp, comments.comment_text
      //     JOIN comments ON posts.id = comments.post_id
      //     WHERE posts.id = $1 AND comments.post_id = $2`,
      `SELECT * FROM posts WHERE id = $1`,
      [postParams.id]
    )
  ).rows;

  return (
    <section className="post-page">
      {postQuery.map((post) => (
        <div key={post.id} className="dynamic-post">
          <div className="dynamic-header">
            <p className="dynamic-username">{post.username}</p>
            <p className="dynamic-timestamp">
              {post.timestamp.toDateString()},&nbsp;
              {post.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <h2 className="dynamic-title">{post.post_title}</h2>
          <Image
            className="post-image"
            src={post.post_image}
            alt={post.post_alt}
            width="500"
            height="500"
          />
        </div>
      ))}
      {/* map through comments here */}
    </section>
  );
}
