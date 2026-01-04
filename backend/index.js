const express=require('express');
const cors=require('cors');
const bcrypt=require('bcrypt');
const app=express();
const PORT=process.env.PORT ||  3000;
//middlewares
app.use(cors());
app.use(express.urlencoded({extended:true}));
//database connectivity
const  mysql=require('mysql2');
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'MYsql1234',
    database:'journal'
});
connection.connect((err)=>{
    if(err)
    {
        console.error("error connecting to the database",err);
    }
    console.log("connected to the database");
});
//base route
app.get('/',(req,res)=>{
    console.log(req);
    res.status(200);
})
app.post('/registeruser',async(req,res)=>{
    console.log(req.body);
    const{email,password}=req.body;
    try{
        //hash the password
        const hashpassword=await bcrypt.hash(password,10);
        connection.query(`insert into user(emailid,hashpassword)values('${email}','${hashpassword}')`,(err,result)=>{
            if(err)
            {
                 return res.status(500).send("no");
            }
            res.status(200).send("ok");
        });


    }
    catch(err){
        console.log(err);
        res.send(500).send('error while hashing password');
    }

})
app.post('/loginuser', async (req, res) => {
    const { email, password } = req.body;

    connection.query(
        `SELECT id, hashpassword FROM user WHERE emailid='${email}'`,
        async (err, result) => {
            if (err) {
                return res.status(500).json({ message: "DB error" });
            }

            if (result.length === 0) {
                return res.status(401).json({ message: "User not found" });
            }

            const hashpassword = result[0].hashpassword;
            const userid = result[0].id;

            const match = await bcrypt.compare(password, hashpassword);

            if (match) {
                return res.status(200).json({ userid });
            } else {
                return res.status(401).json({ message: "Wrong password" });
            }
        }
    );
});

//post
app.post('/userpost',async(req,res)=>{
    const{posttitle,postarea,userid}=req.body;
    connection.query(`insert into posts(userid,posttitle,postarea) values('${userid}',"${posttitle}","${postarea}")`,async(err,response)=>{
        if(err)
        {
            res.status(500);
            return;
        }
        res.status(200);
    })

})
//only i can see my posts and i can read them
app.get('/getmyposts',async(req,res)=>{
    connection.query(`select * from posts where userid='${req.query.userid}'`,(err,result)=>{
        if(err)
        {
            res.status(500);
            return;
        }
        res.status(200).send(result);
    })
})

app.listen(PORT,()=>{
    console.log("server started");
})
