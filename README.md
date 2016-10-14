# Gates.js

[![Build Status](https://travis-ci.org/piotrkabacinski/gatesJs.svg?branch=master)](https://travis-ci.org/piotrkabacinski/gatesJs)

Set specific callbacks for specific responses.

## Usage

Install gatesJs module:

```bash
$ npm i gatesJs
```

Include gates module in your project:

```JavaScript
var gates = require('gatesJs');
```

Set up your gates in main request callback. Usining `set` method pass response's code value:

```JavaScript
gates.set( response.code )
```

Each gate needs two parameters: array with condition rules and callback functions. The first array's element is an expected status code (required, in example below `200`), the second one is an optional expression (`foo === true`):

```JavaScript
request('http://example.com/foo.json', function (error, response, body) {

  var body = JSON.parse( body ); // => { foo: true }

  gates.set( response.code )

       .gate([ 200 , body.foo === true ], function() {
          console.log( "Hello 200 callback and true foo!" );
       })

});
```
If there's a possibility the condition could not been met, set default callback using `default` method:

```JavaScript
 .default(function() {
     console.log( "Hello default callback!" );
 });
```

For any kind of reponse codes or any expression use asterisk `*` argument:

```JavaScript
 .gate([ "*", data.foo === false ], function() {
    console.log( "Hello callback for whatever status and falsy foo!" );
 })
```

When you clone the repistory don't forget to check the live example by launching `$ node index.js` after `$ npm install`.

## License

MIT.
