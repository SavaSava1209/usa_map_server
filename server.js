const express = require('express')
const cors = require('cors')

const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    searchPath: ['knex', 'public'],
});  

const app = express()
app.use(express.json())
app.use(cors());

app.get('/:state', (req, res) => {
    const {state} = req.params
    return 
    return db('usa_maps').where('state', '=', state.toLowerCase()).returning('*')
            .then(data => res.json(data))
            .catch(console.log)
})




app.listen(3010, ()=> {
    console.log('port is working on env')
})



