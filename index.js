const gates = require('./dist/gates.min.js'),
      request = require('request'),
      express = require('express'),
      fs = require('fs'),
      app = express(),
      jsdom = require("jsdom");

const { JSDOM } = jsdom;

app.listen('8080', () => { console.log('http://localhost:8080/'); });

const parseHTML = (html) => {
    if(!html) return undefined;

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const h1 = document.querySelector("h1").textContent;
    const uls = [];

    document.querySelectorAll("ul li").forEach((li) => {
        uls.push(li.textContent)
    });

    return {
        h1,
        uls
    }
}

const getWidgetHTMLCode = () => {
    return new Promise((resolve, reject) => {
        request('http://studio363.info/temp/lambda-aws.html', (error, response, body) => {
          if(error) reject(error);
          resolve(parseHTML(body));
        });
    });
}

getWidgetHTMLCode().then((data) => {
    console.log({ foo: JSON.stringify(data) });
});
