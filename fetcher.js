'use strict'
const request = require('request');
const fs = require('fs');
const { header } = require('express/lib/request');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const array = process.argv.slice(2);

request(array[0], (error, response, body) => {
  if (error) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    rl.close();
    return;
  } 
  // check if the file exist
  if (existsFile(array[1])) {
    rl.question(`file ${array[1]} exist. Do you want to replace? (yes/no) `, (answer) => {
      if (answer === 'yes') {
        fileWriter(body);
        rl.close();
      } else {
            // file exist and can't overwrites
        console.log(`We can't download a new file ${array[1]}`);
        rl.close();
      };
      });
  } else {
    fileWriter(body);
    rl.close();
  }
});

// util.js
const existsFile = function(file) {
  if (fs.existsSync(file)) {
    // path exists
    return true;
  } else {
    return false;
  }
}

const fileWriter = function(content) {
  // const content = 'Some content!'
  let array1 = '';
  for (let i = 0; i < 1235; i++) {
    array1 += content[i];
  }
  fs.writeFile(array[1], array1, err => {
      if (err) {
        console.error(err)
        return
      }
      //file written successfully
      console.log(`Download and save ${array1.length} bytes to ${array[1]}`);
  })
};

