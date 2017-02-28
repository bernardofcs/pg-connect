const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port
});

const input = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE last_name = '${input}'`, output);
});

function output(err, result){
  if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.rows.length} result(s) matching '${input}'.`);
    result.rows.forEach(function(row, index){
      console.log(`- ${index + 1}: ${row.first_name} ${row.last_name}, born '${row.birthdate.toDateString()}'`);
    }); //output: 1
    client.end();
}

