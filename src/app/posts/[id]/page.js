import { db } from "@/utils/dbConnection";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }) {
  const pageParams = await params;
  const postData = (
    await db.query(`SELECT * FROM posts WHERE id = $1`, [pageParams.id])
  ).rows;
  // console.log(postData);
  return {
    title: `Img Blog - Post by ${postData[0].username}`,
    description: `A post by ${postData[0].username} titled ${postData[0].post_title}`,
  };
  // I know it's not really best practice to use index number instead of array.map but in this case it will only ever be one item in the array and it won't affect UX
}

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
  const commentQuery = (
    await db.query(`SELECT * FROM comments WHERE post_id = $1`, [postParams.id])
  ).rows;

  async function commentSubmit(formValues) {
    "use server";
    const formData = {
      username: formValues.get("username"),
      comment_text: formValues.get("comment_text"),
    };
    db.query(
      `INSERT INTO comments (username, timestamp, comment_text, post_id)
        VALUES ($1, current_timestamp, $2, $3)`,
      [formData.username, formData.comment_text, postParams.id]
    );
    revalidatePath(`/posts/${postParams.id}`);
    redirect(`/posts/${postParams.id}`);
  }

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
      <div className="comment-form">
        <form action={commentSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" required />
          <label htmlFor="comment_text">Enter your comment here:</label>
          <textarea name="comment_text" id="comment_text" required />
          <button type="submit">Submit comment</button>
        </form>
      </div>
      {commentQuery.map((comment) => (
        <div key={comment.id} className="comment">
          <div className="comment-header">
            <h2 className="comment-username">{comment.username}</h2>
            <p className="comment-timestamp">
              {comment.timestamp.toDateString()},&nbsp;
              {comment.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <p className="comment-text">{comment.comment_text}</p>
        </div>
      ))}
    </section>
  );
}
