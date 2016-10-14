var gates = require("./src/gates.js"),
    request = require('request'),
    express = require('express'),
    fs = require('fs'),
    app = express();

    /**
     * Set response with random code and json's property value
     */
    app.get('/mock' , function(request, response) {

      var httpResponses = [ 200, 404, 503 ],
          jsonStatusValue = [ true, false ],
          data = { foo: jsonStatusValue[ Math.floor( Math.random() * jsonStatusValue.length ) ] },
          status = httpResponses[ Math.floor( Math.random() * httpResponses.length ) ];

          console.log( "Response: " + status , data.foo );

          response.status( status ).send(data);

    });

    app.listen('8080', function() {
    	console.log('http://localhost:8080/');
    });


    request('http://localhost:8080/mock', function (error, response, body) {

      var body = JSON.parse( body );

      gates.set( response.code )

           .gate([ 200 , !body.foo ], function() {
              console.log( "Hello 200 callback and false foo!" );
           })
           .gate([ 200 , body.foo ], function() {
              console.log( "Hello 200 callback and true foo!" );
           })
           .gate([ 404 , "*" ], function() {
              console.log( "Hello 404 callback and whatever foo!" );
           })
           .gate([ 503 , body.foo ], function() {
              console.log( "Hello 503 callback and true foo!" );
           })
           .gate([ "*" , "*" ], function() {
              console.log( "Hello whatever callback!" );
           })
           .default(function() {
               console.log( "Hello default callback!" );
           });

    });
