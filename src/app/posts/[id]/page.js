import { db } from "@/utils/dbConnection";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Delete_Post from "@/../public/assets/delete_post.png";
// import Delete from "@/app/components/Delete";

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
    await db.query(`SELECT * FROM posts WHERE id = $1`, [postParams.id])
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

  async function deletePost() {
    "use server";
    db.query(`DELETE FROM posts WHERE id = $1;`, [postParams.id]);
    db.query(`DELETE FROM comments WHERE post_id = $1`, [postParams.id]);
    revalidatePath("/");
    redirect("/");
  }

  return (
    <>
      {postQuery.map((post) => (
        <div key={post.id} className="content-box dynamic-post">
          <div className="post-header">
            <p className="username dynamic-username">{post.username}&nbsp;</p>
            <p className="timestamp dynamic-timestamp">
              {post.timestamp.toDateString()},&nbsp;
              {post.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <h2 className="title dynamic-title">{post.post_title}</h2>
          <Image
            className="post-image"
            src={post.post_image}
            alt={post.post_alt}
            width="500"
            height="500"
          />

          {/* <Delete /> */}
          {/* I was just about to start making the delete button as a separate component and pass deletePost to it as a function in props
      but then I remembered I could just use a server action with an Image as the button to keep everything in the server */}
          <form action={deletePost} className="delete-button">
            <button type="submit">
              <Image
                src={Delete_Post}
                alt="A black and white icon showing a dustbin; this is the icon for 'Delete Post'."
                width="50"
                height="50"
              />
            </button>
          </form>
        </div>
      ))}
      <div className="content-box comment-form flex flex-row">
        <form action={commentSubmit}>
          <label className="form-label" htmlFor="username">
            Username:
          </label>
          <input
            className="input"
            type="text"
            name="username"
            id="username"
            required
          />
          <label className="form-label" htmlFor="comment_text">
            Enter your comment here:
          </label>
          <textarea
            className="input"
            name="comment_text"
            id="comment_text"
            required
          />
          <button type="submit" className="submit-button">
            Submit comment
          </button>
        </form>
      </div>
      {commentQuery.map((comment) => (
        <div key={comment.id} className="content-box comment">
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
    </>
  );
}
