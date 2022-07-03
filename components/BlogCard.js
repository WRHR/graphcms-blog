import Link from "next/link";
import styles from "../styles/BlogCard.module.css";

const BlogCard = ({ title, author, coverPhoto, datePublished, slug }) => {
  return (
    <div className={styles.card}>
      <Link href={"/posts/" + slug}>
        <div className={styles.imgContainer}>
          <img src={coverPhoto.url} alt="" />
        </div>
      </Link>
      <div>
        <h2>{title}</h2>
        <div>
          <img src={author.avatar.url} />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
