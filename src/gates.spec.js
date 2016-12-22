describe('Gates.js unit tests', function() {

  var gates = gatesJs;

  var responseCode = {
      content: {
          foo: true
      },
      statusCode: 200
  };

  var value;

  it('Check true response and true expression', function() {

    gates.set(responseCode.statusCode)
         .gate([200, responseCode.content.foo === true], function() {
            value = true;
          })
          .default(function (){
            value = false;
          });

    expect(value).toEqual(true);

  });

  it('Launch whatever response and whatever expression', function() {

    gates.set(responseCode.statusCode)
         .gate([200, responseCode.content.foo === false], function() {
            value = false;
          })
          .gate(["*", "*"], function() {
             value = true;
           })
          .default(function (){
            value = false;
          });

    expect(value).toEqual(true);

  });

});
