import Head from 'next/head';
import Link from 'next/link';

import styles from '../../styles/Home.module.scss'
// add task compo
const AddTask = () => {
    return (
      <div className={styles.container}>
        <Head>
          <title>Life Nadge</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <Link href="/">Topに戻る</Link>
        </main>
      </div>
    )
}

export default AddTask;