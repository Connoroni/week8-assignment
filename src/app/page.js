import Image from "next/image";
import { db } from "@/utils/dbConnection";
import Link from "next/link";

export const metadata = {
  title: "Img Blog - Home",
  description: "See images posted by yourself and other users.",
};

export default async function Home({ searchParams }) {
  const posts = (await db.query(`SELECT * FROM posts`)).rows;
  // console.log(posts);

  const query = await searchParams;
  if (query.sort === "desc") {
    posts.reverse();
  }

  return (
    <section className="feed">
      <div className="sorts">
        <Link href={"/?sort=asc"}>Sort Posts ↑ (newest first)</Link>
        <Link href={"/?sort=desc"}>Sort Posts ↓ (oldest first)</Link>
      </div>
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <div className="feed-post">
            <div className="post-header">
              <p className="post-username">{post.username}</p>
              <p className="post-timestamp">
                {post.timestamp.toDateString()},&nbsp;
                {post.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <h2 className="post-title">{post.post_title}</h2>
            <Image
              className="post-image"
              src={post.post_image}
              alt={post.post_alt}
              width="500"
              height="500"
            />
          </div>
        </Link>
      ))}
    </section>
  );
}
