const express = require("express")
const uuid = require("uuid")
const { Pool } = require("pg")
const app = express()

app.use(express.json())
const pool = new Pool({
    user: 'postgres',
    host: "localhost",
    database:"posts",
    password: "sufanhk",
    port: 5432
})

const listAll = (req, res)=>{
    let onDone = (error, result)=>{
        if(error){
            return res.send(JSON.stringify(error))
        }

        return res.json(result.rows)
    }

    pool.query('SELECT * FROM posts', onDone)
}

app.get('/api/posts', listAll)

app.get('/api/posts/:id', (req, res)=>{
    const { id } = req.params
    const getStatement = `SELECT * FROM posts WHERE id = '${id}'`

    let onDone = (error, result)=>{
        if(error){
            return res.send(JSON.stringify(error))
        }
        return res.json(result.rows)
    }
    pool.query(getStatement, onDone)
})

app.post('/api/posts', (req, res)=>{

    console.log('Incoming data', req.body)
    const id = uuid()
    const createdat = new Date()
    const { title, author, imageurl, content } = req.body
    console.log(title, author, imageurl, content)
    const addStatement = `INSERT INTO posts(id, title, author, imageurl, content, createdat)
                          VALUES('${id}','${title}','${author}','${imageurl}','${content}','${createdat}')`

    let onDone =(error)=>{
        if(error){
            return res.send(JSON.stringify(error))
        }
        return res.send('adding post')
    }
    pool.query(addStatement, onDone)
})

app.delete('/api/posts/:id', (req, res)=>{
    const { id } = req.params
    let onDone = (error)=>{
        if(error){
            return res.send(JSON.stringify(error))
        }
        return res.send('deleting post')
    }
    pool.query(`DELETE FROM posts WHERE id = '${id}'`, onDone)
})

app.put('/api/posts/:id', (req, res)=>{
    const { id } = req.params
    const  { title, imageurl, content } = req.body
    const updateStatement = `UPDATE posts SET title= '${title}', imageurl= '${imageurl}', content= '${content}'
                             WHERE id = '${id}'`

    let onDone = (error)=>{
        if(error){
            return res.send(JSON.stringify(error))
        }
        return res.send("updating post")
    }
    pool.query(updateStatement, onDone)
})


app.listen(8000,()=>{
    console.log('app is running')
})

