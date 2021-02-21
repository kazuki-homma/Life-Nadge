const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const dbPath = "api/db/database.sqlite3";
const bodyParser = require('body-parser');
var methodOverride = require('method-override');

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header(
        'Access-Control-Allow-Headers',
        '*'
    )
    next()
}
app.use(allowCrossDomain);

// リクエストのbodyをparseする設定
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use( methodOverride() );


// Get all everydayTasks;
app.get('/api/v1/everydayTasks', (req, res) => {
    // Connect database;
    const db = new sqlite3.Database(dbPath)
    db.all('SELECT * FROM everydayTasks', (error,rows) => {
        res.json(rows);
    })

    db.close();
})

// Get a everydayTask;
app.get('/api/v1/everydayTasks/:id', (req, res) => {
    // Connect database;
    const db = new sqlite3.Database(dbPath)
    const id = req.params.id;

    db.get(`SELECT * FROM everydayTasks WHERE id = ${id}`, (error,row) => {
        res.json(row);
    })

    db.close();
})

// Search everydayTask matching keyword
app.get('/api/v1/search', (req, res) => {
    // Connect database;
    const db = new sqlite3.Database(dbPath)
    const keyword = req.query.q;

    db.get(`SELECT * FROM everydayTasks WHERE name LIKE "%${keyword}%"`, (error,row) => {
        res.json(row);
    })

    db.close();
})

const run = async (sql, db, res, message) => {
    return new Promise((resolve, reject) => {
        db.run(sql, (err) => {
            if (err) {
              res.status(500).send(err);
              return reject()
            } else {
                res.json({message: message});
                return resolve()
            }
        });
    })
}

// Create a new task
app.post('api/v1/everydayTasks', async (req, res) => {
    //Connect database
    const db = new sqlite3.Database(dbPath)
    const name = req.body.name;
    const profile = req.body.profile ? req.body.profile : "";
    const point = req.body.point ? req.body.point : 1;
    const time = req.body.time ? req.body.time : "";
    const done = req.body.done ? req.body.done : 0;

    await run(
        `INSERT INTO everydayTasks (name, profile, point, time, done) VALUES ("${name}", "${profile}", "${point}", "${time}", "${done}")`,
        db,
        res,
        "新規タスクを作成しました"
    )
    db.close()
})

// Update everydayTask data
app.put('api/v1/everydayTasks/:id', async (req, res) => {
    //Connect database
    const db = new sqlite3.Database(dbPath)
    const id = req.body.id;

    // 現在のタスク情報を取得する
    db.get(`SELECT * FROM everydayTasks WHERE id = ${id}`, async (error,row) => {
        const name = req.body.name ? req.body.name : row.name;
        const profile = req.body.profile ? req.body.profile : row.profile;
        const point = req.body.point ? req.body.point : row.point;
        const time = req.body.time ? req.body.time : row.time;
        const done = req.body.done ? req.body.done : row.done;

        await run(
            `UPDATE everydayTasks SET name="${name}", profile="${profile}", point="${point}", time="${time}", done="${done}" WHERE id=${id}`,
            db,
            res,
            "done!"
        )
    })
    db.close()
})

// DELETE everydayTask data
app.delete('api/v1/everydayTasks/:id', async (req, res) => {
    //Connect database
    const db = new sqlite3.Database(dbPath)
    const id = req.body.id;

    await run(
        `DELETE FROM everydayTasks WHERE id=${id}`,
        db,
        res,
        "タスク情報を削除しました"
    )

    db.close()
})

const port = process.env.PORT || 8080;
app.listen(port);
console.log(" Listen on port:" + port);