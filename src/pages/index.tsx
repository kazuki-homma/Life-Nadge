import Head from 'next/head'
import Link from 'next/link'

import styles from '../../styles/Home.module.scss'
import { spled } from '../../ignoreData';

const Home =() => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Life Nadge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href={spled}>Life Nadge</a>
        </h1>

        <p className={styles.description}>
          現在のレベル{' '}
          <code className={styles.code}>LV.48</code>
        </p>

        <div className={styles.grid}>
          <Link href="/Everyday">
            <a className={styles.card}>
              <h3>Everyday Tasks &rarr;</h3>
              <p>毎日行うタスクを記述します</p>
            </a>
          </Link>

          <a href="/" className={styles.card}>
            <h3>OneTime Tasks &rarr;</h3>
            <p>一度だけ行うタスクを記述します</p>
          </a>

          <a
            href="/"
            className={styles.card}
          >
            <h3>Add Task &rarr;</h3>
            <p>
              タスクを追加します
            </p>
          </a>

          <a
            href="/"
            className={styles.card}
          >
            <h3>Learning &rarr;</h3>
            <p>
              継続しているタスクについて確認します。
            </p>
          </a>

          <a
            href="/"
            className={styles.card}
          >
            <h3>Recode &rarr;</h3>
            <p>今までの成績を確認します</p>
          </a>
        </div>
      </main>
    </div>
  )
}

export default Home;
