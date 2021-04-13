const express = require('express')
const mysql = require('mysql')
const app = express();
const port = process.env.PORT || 3000

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const sql = `INSERT INTO people(name) VALUES ("Full Cycle")`
connection.query(sql)

app.get("/", (req,res) => {

    connection.query('SELECT * FROM people', function (error, results, fields) {
        let items = "<ul>"
        if (error) throw error;
        results.forEach(result => {
            items += `<li>${result.name}</li>`
        })
        items += "</ul>"
        res.send(items)
    });
})

app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})
