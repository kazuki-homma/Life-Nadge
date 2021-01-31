import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

import styles from '../../styles/Home.module.scss';

export async function getStaticProps() {
    const pathDirectory = path.join(process.cwd(), 'src', 'data', 'tasks', 'everyday.json');
    const everydayTasks = JSON.parse(fs.readFileSync(pathDirectory, 'utf-8'));
    return {
        props: {
            everydayTasks
        }
    }
}

function tasksView(everydayTasks) {
   return everydayTasks.map(task => {
       return <div>{ task.name }</div>
   })
}

const Everyday = (props) => {
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
              <div>{tasksView(props.everydayTasks)}</div>
              <Link href="/">Topに戻る</Link>
          </main>
        </div>
    );
}

export default Everyday;