const express = require('express')
const cors = require('cors')
const knex = require('knex');
const fetch = require('node-fetch');

const db = knex({
    client: 'pg',
    connection: {     
       connectionString: process.env.DATABASE_URL,
       ssl: {
           rejectUnauthorized: false
       }
    }
});

const app = express()
app.use(express.json())
app.use(cors());

app.get('/', (req, res) => res.send('working'))
app.get('/filterState/:input', (req, res) => {
    const { input } = req.params
    console.log(input.charAt(0).toUpperCase() + input.slice(1))
    return db("usa-state-map").select('state').from('location').where('state', 'like', `${input.charAt(0).toUpperCase() + input.slice(1)}%` ).then(data => res.status(200).json(data))
})
app.get('/:state', (req, res) => {
    const { state } = req.params        
    // fetch(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-state-boundaries&q=&facet=name&refine.name=${state.charAt(0).toUpperCase()+state.slice(1)}`)
    // .then(resp => resp.json()).then(data => {

    //     res.json(data.records[0].fields.st_asgeojson.coordinates[0][0])

    // }).catch(console.log)
})

app.listen(process.env.PORT, () => {
    console.log(`port is working on env ${process.env.PORT}`)
})



