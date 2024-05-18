const fs = require('fs');

const addUser = (user) => {
  fs.readFile('./users.json', { encoding: 'utf-8' }, (error, content) => {
    if (error) {
      console.log('Error: ' + error);
    }
    else {
      let users = JSON.parse(content);
      if (users) {
        users.push(user);

        fs.writeFile('./users.json', JSON.stringify(users), (error) => {
          if (error) {
            console.log('Error: ' + error);
          }
        });

        console.log(users);
      }
    }
  });
}

addUser({ a: 'a', b: 'b', c: 'c'});

