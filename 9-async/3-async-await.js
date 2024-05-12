// Promises é uma forma mais sofisticada de se trabalhar com callbacks.

const getId = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('3 - ...');
      resolve({ id: 5 });
    }, 1500);
  });
}

const getEmail = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('4 - ...');
      resolve({ id: id, email: 'douglasrpilar@gmail.com' });
    }, 2000);
  });
}

const sendMail = (email, body) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('5 - ...');
      const error = false;

      if (error) {
        reject('Full queue.');
      }
      else {
        resolve({
          email,
          body
        });
      }

    }, 3000);
  });
}


const getUsers = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          name: 'Name A',
          email: 'namea@email.com'
        },
        {
          name: 'Name B',
          email: 'nameb@email.com'
        },
        {
          name: 'Name C',
          email: 'namec@email.com'
        },
      ]);
    }, 3000);
  });
}

const foo1 = async () => {
  // Await só funciona com promises e dentro de funções async.
  var users = await getUsers();
  console.log(users);
}

const foo2 = async () => {
  var users = await getUsers();
  console.log(users);
}

main();


/*console.log('1 - Start');

getId().then(({ id }) => {
  getEmail(id).then(({ id, email }) => {
    sendMail('douglasrpilar@gmail.com', 'Corpo do e-mail')
      .then( ({ email, body }) => {
        console.log('E-mail sent to ', email);
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });
  });
});


console.log('2 - Email sending started.');
*/