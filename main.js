const fastify = require('fastify')({
    logger: true
  })
 
let users = []



  // Declare a route
  fastify.get('/', function (request, reply) {
    console.log(request.query)
    let a = request.query.firstNumber 
    let b = request.query.secondNumber
    let  c = Number(a)+Number(b)
    reply.send({c})

  })
  
  // Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    // Server is now listening on ${address}
  })
  
  // post zapros
  // create
fastify.post('/users/add', function (request,reply){
    try{
      const login = request.body.login
      const password = request.body.password
      if (password.length<8){
        reply.status(400)
        reply.send({message:'pasword menee 8 symb'})
        return
      }
      if (login.length===0){
        reply.status(400)
        reply.send({message:'net logina'})
        return
      }
      users.push({login,password})
      console.log(users)
      reply.send({message:{succes:true}})
    }
    catch(e){
      console.log(e)
      reply.send({message:'sad'})
    }
  })

  // read
fastify.get('/users/read', function (request, reply){
  try{
    reply.send(users)
    console.log(users)
  }
  catch(e){
    console.log(e)
    reply.send({message:'sad'})
  }
})
  // update
fastify.post('/users/update/:login',function(request,reply){
  try{
    let oldLogin = request.params.login 
    for (let user of users){
      if (user.login === oldLogin){
        let newLogin = request.body.login 
        let newPassword = request.body.password
        if (newPassword.length<8){
          reply.status(400)
          reply.send({message:'pasword menee 8 symb'})
          return
        }
        if (newLogin.length===0){
          reply.status(400)
          reply.send({message:'net logina'})
          return
        }
        user.login = newLogin
        user.password = newPassword
        console.log(users)
        reply.send({message:{succes:true}})
      }
      }
    }
  catch(e){
    console.log(e)
    reply.send({message:'sad'})
  }
})

// delete
fastify.post('/users/delete', function(request, reply){
  try{
    let delLogin = request.body.login 
    for (let i = 0; i < users.length;i++){
      if (users[i].login===delLogin){
        users.splice(i,1)
      }
    }
    console.log(users)
    reply.send({message:{succes:true}})
  }
  catch(e){
    console.log(e)
    reply.send({message:'sad'})
  }
})