import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

import styles from '../../styles/Home.module.scss';

export async function getServerSideProps() {
  const pathDirectory = path.join(process.cwd(), 'src', 'data', 'tasks', 'everyday.json');
  const everydayTasks = JSON.parse(fs.readFileSync(pathDirectory, 'utf-8'));
  return {
    props: {
      everydayTasks
    }
  }
}

function tasksView(everydayTasks, addEverydayPoint) {
   return everydayTasks.map(task => {
       return (
        <label htmlFor={task.id} key={task.id}>
         <div className={styles.card}>
          { task.name }
          <input type="checkbox" defaultChecked={task.done} id={task.id} onChange={() => checkCount(task.id, addEverydayPoint)}/>
         </div>
        </label>
       );
   })
}

function checkCount(taskId, addEverydayPoint) {
  const div = document.getElementById(taskId);
  div.classList.toggle('checked');
  addEverydayPoint(document.getElementsByClassName('checked').length);
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
          <h3>現在のeveryday pointは<code className={styles.code}>{props.everydayPoint}</code></h3>
          <div className={styles.grid}>{tasksView(props.everydayTasks, props.addEverydayPoint)}</div>
          <Link href="/">Topに戻る</Link>
        </main>
      </div>
  );
}

export default Everyday;