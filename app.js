const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt')

const maria = require('./database/connect/maria')
maria.connect();
app.use(bodyParser.json()) // parse application/json
app.use(bodyParser.urlencoded({extended: false})) // parse application/x-www-form-urlencoded

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.send('Hello, Express')
})

app.get('/test',(req,res) =>{
    maria.query('select * from pot.POT_USER', function(err, rows, fields){
        if(!err){
            console.log("succ");
            res.send(rows)
        }else{
            console.log("err :" + err)
        }
    })
})

app.post('/join',(req,res) =>{
    const {id ,password, nickName } = req.body;
    let status = 0
    maria.query('INSERT INTO pot.POT_USER(USER_ID,USER_PASSWORD,USER_NICKNAME) VALUES (?,?,?);'
    , [id , bcrypt.hashSync(password,10) , nickName]
    , function(err, rows, fields){
        if(!err){
            console.log("succ :" + err)
            status = 1
            res.json(status)
        }else{
            console.log("err :" + err)
            status = 0
            res.json(status)
        }
    })
})
app.post('/login',(req,res) =>{
    const {id ,password } = req.body;
    let status = 0
    maria.query('SELECT USER_PASSWORD FROM pot.POT_USER WHERE USER_ID = ?;'
    , [id]
    , function(err, rows, fields){
        console.log(rows)
        if(!err){
            let same = bcrypt.compareSync(password , rows[0].USER_PASSWORD)
            same ? status = 1 : status = 0
            console.log(same)
            res.json(status)
        }else{
            console.log("err :" + err)
            status = 0
            res.json(status)
        }
    })
    //console.log(status)
    
})



app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
})