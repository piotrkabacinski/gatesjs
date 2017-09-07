const gates = require('./dist/gates.min.js'),
      request = require('request'),
      express = require('express'),
      fs = require('fs'),
      app = express();

/**
 * Set response with random code and json's property value
 */
app.get('/mock', function(request, response) {

    let httpResponses = [200, 404, 503],
        jsonStatusValue = [true, false],
        data = {
            foo: jsonStatusValue[Math.floor(Math.random() * jsonStatusValue.length)]
        },
        status = httpResponses[Math.floor(Math.random() * httpResponses.length)];

    console.log(`Response: ${status}, ${data.foo}`);

    response.status(status).send(data);

});

app.listen('8080', () => { console.log('http://localhost:8080/'); });

request('http://localhost:8080/mock', (error, response, body) => {

    body = JSON.parse(body);

    new gates().set(response.statusCode)
        .gate([200, !body.foo], () => { console.log('Hello 200 callback and false foo!'); } )
        .gate([200, body.foo], () => { console.log('Hello 200 callback and true foo!'); })
        .gate([404, '*'], () => { console.log('Hello 404 callback and whatever foo!'); })
        .gate([503, body.foo], () => { console.log('Hello 503 callback and true foo!'); })
        .gate(['*', '*'], () => { console.log('Hello whatever callback!'); })
        .default(() => { console.log('Hello default callback!'); });

});
