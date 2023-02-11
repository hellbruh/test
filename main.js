const fastify = require('fastify')({
    logger: true
  })
 
  // Declare a route
  fastify.get('/:firstNumber/:secondNumber', function (request, reply) {
    console.log(request.params)
    let a = request.params.firstNumber 
    let b = request.params.secondNumber
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
  