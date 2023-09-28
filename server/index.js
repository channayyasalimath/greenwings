const express = require('express');
const app = express()
const mysql      = require('mysql');
const cors =require('cors');

app.use(express.json())
app.use(cors())



app.listen(3002, ()=>{
    console.log('Server is running on port 3002');
})

const db =mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'greenwings'
})

app.post('/register', function (req, res) {
  const setEmail= req.body.Email
  const setUserName= req.body.UserName
  const setPassword= req.body.Password

  const SQL='INSERT INTO users (email, username, password) VALUES (?, ?, ?)'
  const values = [setEmail, setUserName, setPassword]

  db.query(SQL, values, (err, results)=>{
    if(err){
        res.send(err)
    }else{
        console.log("User inserted successfully")
        res.send({message: 'User added!'})
    }
  })



})

app.post('/login', function (req, res){
  const setLoginUserName= req.body.LoginUserName
  const setLoginPassword= req.body.LoginPassword
console.log(setLoginUserName, setLoginPassword);
  const SQL='SELECT * FROM users WHERE username = ? && password = ?'    
  const values = [setLoginUserName, setLoginPassword]

  db.query(SQL, values, (err, results)=>{
    if(err){
      return res.send({error:err})
    }
    if(results.length > 0){
        res.send(results)
    }
    else{
        // console.log("User inserted successfully")
        res.send({message: 'Credentails Dont Match!'})
    }
  })
})