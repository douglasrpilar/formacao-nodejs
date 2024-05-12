// Formas de se usar programação assíncrona no JS:
// 1 - Callback
// 2 - Promise
// 3 - Async/Await

var sendMail = (to, body, callback) => {
  setTimeout(() => {
    var error = true;

    if (error) {
      callback(2, 'not found');
    }
    else {
      callback(2);
    }

  }, 2000); // 5 seconds.
}

console.log('Start');
sendMail('douglasrpilar@gmail.com', 'Corpo do e-mail', (time, error) => {
  console.log('');

  if (error == undefined) {
    console.log(`E-mail sent in ${time}s`);
  }
  else {
    console.log('E-mail not sent. Reason: ' + error);
  }

});
console.log('Início do envio de e-mail');