module.exports = (app) =>{
    const controller = require('./controller')  // to call the function which is exported in controller.js file
    const router = require('express').Router()

    router.get('/mobiles',controller.getmobiles)

    router.get('/getuser',controller.getuser)

    router.get('/topOffer',controller.top)

    router.get('/cart/:id',controller.getcart)

    router.post('/addCart',controller.addcart)

    router.delete('/:id',controller.delete)

    router.get('/allItems/:name',controller.getitems)

    router.get('/autos/:name',controller.forautos)

    router.post('/signup',controller.save)

    router.post('/login',controller.login)

    router.get('/logout',controller.logout)

    app.use(router)
}