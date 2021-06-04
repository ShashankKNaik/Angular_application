const express=require("express")
const mongoose=require("mongoose")
// const cors=require("cors")			// used when node and angular running in deferent ports
const session = require("express-session")
const MongoStore = require("connect-mongo")
const app=express()

const PORT = process.env.PORT || 3000
const mongoURI=process.env.mongoURI

// app.use(cors({
// 	origin:'http://localhost:4200/',    // Angular app running in this address
// 	Credential:true
// }))

app.use(express.json())
app.use(express.urlencoded({
	extended:false
}))

const path=__dirname+'/views/'

app.use(express.static(path))  // to serve the static files

mongoose.connect(mongoURI,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

mongoose.set('useCreateIndex', true)

db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"))
db.once('open', ()=>{
	console.log("connection sucessful")
})

app.use(session({
	secret:'5^$#8gtg(2esff-)87',
	resave:true,                // it updates the database session each time we visit the page
	rolling:true,				// it updates the cookie maxAge each time we visit the page
	saveUninitialized:false,
	store:MongoStore.create({
		mongoUrl:mongoURI
	}),
	cookie:{
		maxAge: 1000*60*60*24*7  // 7 Days
	}
}))

app.get('/',(req,res)=>{
	res.sendFile(path + 'index.html');
});

require('./routes/router')(app)  // calling the function which is in router.js file

app.get('*',(req,res)=>{
	res.sendFile(path + 'index.html');
});

app.listen(PORT,()=>{
	console.log('(ctrl + click) http://localhost:3000/')
})
