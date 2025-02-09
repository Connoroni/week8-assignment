import Image from "next/image";
import TechEd from "@/../public/assets/TE_Logo_Negative_Green_Large.png";

export const metadata = {
  title: "Img Blog - About",
  description: "Read about the site Img Blog.",
};

export default function AboutPage() {
  return (
    <>
      <h1>About the Site</h1>
      <p>
        This site is the work of Connor Mitchell, a student on the Tech
        Educators software development bootcamp.
      </p>
      <Image
        src={TechEd}
        alt="The logo of Tech Educators, it has a purple and green double helix structure on the left with the words Tech Educators on the right."
        width="500"
        height="200"
      />
      <p>
        It&apos;s a simple app that lets users post images and comment on each
        other&apos;s posts. All of this is handled through a database that
        stores all posts and comments then renders them on the page. Users first
        access the home page where they can see all posts, then they can
        interact with the posts by clicking the title to be taken to a dynamic
        page unique to each post where they can comment on it.
      </p>
      <p>
        I tried making a similar app using React.js for a previous assignment
        but had a bit of a nightmare making it work so it was incomplete. Now
        I&apos;m redeeming myself making this with Next.js which is so much
        easier with routes and dynamic pages.
      </p>
    </>
  );
}
