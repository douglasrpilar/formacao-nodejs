const database = require('./database');

let games = [
  {
    name: 'Game ' + Date.now(),
    price: 50.77
  }
];

let studios = [
  {
    name: 'Studio ' + Date.now(),
    game: 2,
  }
]

database.insert(games).into('game')
  .then(total => {
    console.log('Insert', total, 'games');
  })
  .catch(err => {
    console.log(err);
  });

  database.insert(studios).table('studio')
  .then(total => {
    console.log('Insert', total, 'studios');
  })
  .catch(err => {
    console.log(err);
  });

database.select(['id', 'name', 'price']).orderBy('id', 'desc').table('game')
  .then(games => {
    // console.log(games);
  })
  .catch(err => {
    console.log(err);
  });

database.select().where({id: 1}).orWhere({id: 2}).table('game')
  .then(games => {
    //console.log(games);
  })
  .catch(err => {
    console.log(err);
  });

database.raw('Select * from game')
  .then(data => {
    //console.log(data);
  })
  .catch(err => {
    console.log(err);
  });

database.delete().where({id: 1}).table('game')
  .then(total => {
   // console.log('Delete total', total);
  })
  .catch(err => {
    console.log(err);
  });

/*database.where({id: 5}).update({price: 20.00}).table('game')
  .then(total => {
    console.log('Update total', total);
  })
  .catch(err => {
    console.log(err);
  });*/


/*database.select('game.*', 'studio.id as studio_id', 'studio.name as studio_name').table('game').innerJoin('studio', 'studio.game', 'game.id').where('game.id', 2)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
  console.log(err);
  });*/

  database.select([
    'studio.id as studioId',
    'studio.name as studioName',
    'game.id as gameId',
    'game.name as gameName',
    'game.price as gamePrice',
  ])
    .table('game_studio')
    .innerJoin('game', 'game.id', 'game_studio.game')
    .innerJoin('studio', 'studio.id', 'game_studio.studio')
    .orderBy('studio.id', 'asc')
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });


const transacion = async () => {
    try {
      await database.transaction(async trans => {
        await database.insert({name: `Studio Trans ${Date.now()} 1` }).table('studio');
        await database.insert({name: `Studio Trans ${Date.now()} 2` }).table('studio');
        await database.insert({name: `Studio Trans ${Date.now()} 3` }).table('tudio');
      });

    }
    catch(err) {
      console.log(err);
    }
}

transacion();