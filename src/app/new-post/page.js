import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import formStyles from "@/app/new-post/new-post.module.css";

export const metadata = {
  title: "Img Blog - Create Post",
  description: "Post an image for others to see.",
};

export default async function PostForm() {
  async function submitHandler(formValues) {
    "use server";
    const formData = {
      username: formValues.get("username"),
      post_title: formValues.get("post_title"),
      post_image: formValues.get("post_image"),
      post_alt: formValues.get("post_alt"),
    };

    db.query(
      `INSERT INTO posts (username, timestamp, post_title, post_image, post_alt)
        VALUES ($1, current_timestamp, $2, $3, $4)`,
      [
        formData.username,
        formData.post_title,
        formData.post_image,
        formData.post_alt,
      ]
    );
    revalidatePath("/");
    redirect("/");
  }
  return (
    <div className="content-box post-form">
      <form className="form" action={submitHandler}>
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
        <label className="form-label" htmlFor="post_title">
          Post Title:
        </label>
        <input
          className="input"
          type="text"
          name="post_title"
          id="post_title"
          required
        />
        <label className="form-label" htmlFor="post_image">
          Image URL:
        </label>
        <input
          className="input"
          type="url"
          name="post_image"
          id="post_image"
          required
        />
        <label className="form-label" htmlFor="post_alt">
          Enter alt text for your image
        </label>
        <textarea className="input" name="post_alt" id="post_alt" required />
        <button type="submit" className="submit-button">
          Create Post
        </button>
      </form>
    </div>
  );
}
