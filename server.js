const express = require('express')
const cors = require('cors')

const knex = require('knex')

const db = knex({
    client: 'pg',
    version: '7.2',
    connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'usa_map'
    }
});  

const app = express()
app.use(express.json())
app.use(cors());

app.get('/:state', (req, res) => {
    const { state } = req.params  
    return db("usa_map").select('*').from('location').where('state', '=', state.toLowerCase()).returning('*')
            .then(data => res.status(200).json(data) )
            .catch(console.log)
})

app.listen(3010, () => {
    console.log('port is working on env')
})



