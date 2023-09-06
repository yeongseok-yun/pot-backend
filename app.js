const express = require('express');
const app = express();

const maria = require('./database/connect/maria')
maria.connect();

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

app.get('/join',(req,res) =>{
    maria.query('select * from pot.POT_USER', function(err, rows, fields){
        if(!err){
            console.log("succ");
            res.send(rows)
        }else{
            console.log("err :" + err)
        }
    })
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
})