var gates = require("./src/gates.js");

var response = {
    content: {
        bar: true
    },
    statusCode: 200
};

gates.set(response.statusCode)
     .gate([200, response.content.bar === false], function() {
        console.log("Hello 200 callback and false bar!" );
     })
     .gate([200, response.content.bar], function() {
         console.log("Hello 200 callback and true bar!");
     })
     .gate(["*", "*"], function() {
        console.log("Hello * callback and whatever bar!");
     })
     .gate([300], function() {
        console.log("Hello 300 callback!");
     })
     .default(function() {
         console.log("Hello default callback!");
     });
