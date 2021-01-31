import Head from 'next/head';
import Link from 'next/link'

import styles from '../../styles/Home.module.scss'

const Everyday = () => {
    return (
        <div className={styles.container}>
          <Head>
            <title>Life Nadge</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className={styles.main}>
            <h1 className={styles.title}>
             Everyday Tasks
            </h1>
              
              <Link href="/">Topに戻る</Link>
          </main>
        </div>
    );
}

export default Everyday;