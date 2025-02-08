import Image from "next/image";
import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function Home() {
  const posts = (await db.query(`SELECT * FROM posts`)).rows;
  console.log(posts);

  return (
    <section className="feed">
      {posts.map((post) => (
        <div key={post.id} className="feed-post">
          <div className="post-header">
            <p className="post-username">{post.username}</p>
            <p className="post-timestamp">{post.timestamp.toDateString()}</p>
          </div>
          <Link href={`/posts/${post.id}`}>
            <h2 className="post-title">{post.post_title}</h2>
          </Link>
          <Image
            className="post-image"
            src={post.post_image}
            alt={post.post_alt}
            width="500"
            height="500"
          />
        </div>
      ))}
    </section>
  );
}
