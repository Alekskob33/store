import Link from 'next/link';
import styles from './first-post.module.sass';

export default function FirstPost() {
  return (
    <>
      <h1 className={styles.title}>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}