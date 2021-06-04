const item = require('../models/item.schema')
const cart = require('../models/cart.schema')
const user = require('../models/user.schema')

exports.save = (req,res) =>{
    if(req.body.pwd === req.body.cpwd){
            let newUser = new user({
                email:req.body.email,
                name:req.body.name,
                password:req.body.pwd,
            })
        
            newUser.save((err,b)=>{
                if(err){
                    res.json('Email already present')
                }
                else{
                    res.json('Signup Successful')
                }
            })
    }else
    res.json('Password is not matching')
}

exports.login=(req,res)=>{
    user.findOne({email:req.body.email}).exec((err,data)=>{
        if(data){
            if(req.body.pwd === data.password){
                req.session.userId = data._id
                res.json('Login Successful')
            }
            else
            res.json('Wrong Password')
        }
        else
        res.json('Signup before login')
    })
}

exports.getmobiles=(req,res)=>{
    item.find({}).where('category').equals('mobile phones').sort('-_id').limit(6).exec((err, result)=>{
        if(err) throw err;
        res.send(result)
    })
}

exports.getitems=(req,res)=>{
    n = req.params.name
    let query;
    pattern = new RegExp(n,'i')
    if(n == "null")
        query = item.find({})
    else
        query = item.find({$or: [{ category: pattern }, { brand: pattern }]})
    query.exec((err, result)=>{
        if(err) throw err;
        res.send(result)
    })
}
exports.getuser=(req,res)=>{   
    if(req.session.userId == undefined)
        res.json('nope')
    else
        res.json(req.session.userId)
}
exports.top=(req,res)=>{
    item.find({}).where('price').lt(1000).limit(6).exec((err, result)=>{
        if(err) throw err;
        res.send(result)
    })
}
exports.getcart=(req,res)=>{
    userId = req.params.id
    if(userId != 'nope'){
        cart.find({}).populate('itemId').where("userId").equals(userId).exec((err, data)=>{
            if(err) throw err;
            let result=[];
            for(x of data){
                result.push(x.itemId)
            }
        res.send(result)
        })
    }
}

exports.addcart=(req,res)=>{
    newItem = new cart({
        userId : req.body.userId,
        itemId : req.body._id
    })
    newItem.save((err)=>{
        if(err) throw err
        console.log('1 cart item inserted')
    })
}

exports.delete=(req,res)=>{
    objId = req.params.id
    cart.deleteOne().where('itemId').equals(objId).exec((err)=>{
        if(err) throw err;
        console.log('deleted '+objId)
    })
}

exports.forautos=(req,res)=>{
    n = req.params.name
    pattern = new RegExp(n,'i')
    
    item.aggregate().match({category:pattern}).group({_id: '$category'}).limit(5).exec((err,data1)=>{
        item.aggregate().match({brand:pattern}).group({_id: '$brand'}).limit(5).exec((err,data2)=>{			
            data = data1.concat(data2)
            res.send(data)
        })
    })
}


exports.logout=(req,res)=>{
    if(req.session){
        req.session.destroy((err)=>{
            if (err) {
				console.log('error')
			} else {
                res.clearCookie('connect.sid')
				console.log('Logged out')
			}
        })
    }
}