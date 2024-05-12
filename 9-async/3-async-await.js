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

const app = async () => {
  var { id } = await getId();
  var { id, email } = await getEmail(id);

  /*sendMail(email, 'Corpo do e-mail')
    .then( ({ email, body }) => {
      console.log('6 - E-mail sent to ', email);
    })
    .catch((error) => {
      console.log('6 - Error: ' + error);
    });*/

  // or

  try {
    var { email, body } = await sendMail(email, 'Corpo do e-mail');
    console.log('6 - E-mail sent to ', email);
  }
  catch (error) {
    console.log('6 - Error: ' + error);
  }
}

console.log('1 - Start');
app();
console.log('2 - Email sending started.');