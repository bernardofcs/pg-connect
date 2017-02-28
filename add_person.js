const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port
  }
});


const firstName = process.argv[2];
const lastName = process.argv[3];
const birthDate = process.argv[4];

const insert1 = {first_name: firstName, last_name: lastName, birthdate: birthDate}
knex.insert(insert1).into('famous_people').then(function (id) {
  console.log(id);
})
.finally(function() {
  knex.destroy();
});

