import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
// import fs from 'fs';
// import path from 'path';

import styles from '../../styles/Home.module.scss';

const axiosBase = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
  }
});

export async function getServerSideProps() {
  // const pathDirectory = path.join(process.cwd(), 'src', 'data', 'tasks', 'everyday.json');
  // const data = JSON.parse(fs.readFileSync(pathDirectory, 'utf-8'));
  const everydayTasks = await fetch('http://localhost:8080/api/v1/everydayTasks').then(res => {
    if(res.ok){
        return res.json();
    } else {
        throw new Error();
    }
  })
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

async function checkCount(taskId, addEverydayPoint) {
  const div = document.getElementById(taskId);
  const doneUrl = `http://localhost:8080/api/v1/everydayTasks/`;
  div.classList.toggle('checked');
  if (div.classList.contains('checked')) {
    await axiosBase.put(doneUrl + taskId, { id: taskId, done: 1 }).then(res => {
      console.log("更新したよ")
    })
    .catch(err => {
      if(err.response) {
        // レスポンスが200以外の時の処理
      }
    });
  } else {
    await axiosBase.put(doneUrl, { id: taskId, done: 0 }).then(res => {
      // レスポンスが200の時の処理
      console.log("更新したよ")
    })
    .catch(err => {
      if(err.response) {
        // レスポンスが200以外の時の処理
      }
    });
  }
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

// cors , http , node study