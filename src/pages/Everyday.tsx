import { useState } from 'react';
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

function tasksView(everydayTasks, countUp) {
   return everydayTasks.map(task => {
       return (
         <div className={styles.card} onClick={countUp} key={task.id}>
          { task.name }
         </div>
       );
   })
}

const Everyday = (props) => {
    const onSubmit = data => console.log(data);
    const [everydayPoint, addEverydayPoint] = useState(0);
    const countUp = () => {
        addEverydayPoint(everydayPoint+1);
    }
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
            <h3>現在のeveryday pointは<code className={styles.code}>{everydayPoint}</code></h3>
            <div className={styles.grid}>{tasksView(props.everydayTasks, countUp)}</div>
            <Link href="/">Topに戻る</Link>
          </main>
        </div>
    );
}

export default Everyday;