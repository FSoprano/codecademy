var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./gold_medals.sqlite');

/*
Returns a SQL query string that will create the Country table with four columns: name (required), code (required), gdp, and population.
*/

const createCountryTable = () => {
  let sql = 'CREATE TABLE Country (name TEXT NOT NULL, code TEXT NOT NULL, \
                                   gdp INTEGER , population INTEGER)';
  return sql;
};

/*
Returns a SQL query string that will create the GoldMedal table with ten columns (all required): id, year, city, season, name, country, gender, sport, discipline, and event.
*/

const createGoldMedalTable = () => {
  let sql = 'CREATE TABLE GoldMedal (id INTEGER NOT NULL, year INTEGER NOT NULL, \
                                     city TEXT NOT NULL, season TEXT NOT NULL, \
                                     name TEXT NOT NULL, country TEXT NOT NULL, \
                                     gender TEXT NOT NULL, sport TEXT NOT NULL, \
                                     discipline TEXT NOT NULL, event TEXT NOT NULL, \
                                     PRIMARY KEY(id))';

  return sql;
};

/*
Returns a SQL query string that will find the number of gold medals for the given country.
*/

const goldMedalNumber = country => {
    
    let sql = `SELECT COUNT(*) FROM GoldMedal WHERE country = '${country}'`;

    return sql;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most summer medals, along with the number of medals aliased to 'count'.
*/

const mostSummerWins = country => {

  let sql = `SELECT year, COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}' \
            AND season = 'Summer' GROUP BY year`;

  return sql;

};

/*
Returns a SQL query string that will find the year where the given country 
won the most winter medals, along with the number of medals aliased to 'count'.
*/

const mostWinterWins = country => {
  let sql = `SELECT year, COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}' \
            AND season = 'Winter' GROUP BY year`;

  return sql;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestYear = country => {
  let sql = `SELECT year, COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}' \
             GROUP BY year ORDER BY year DESC`;

  return sql;
};

/*
Returns a SQL query string that will find the discipline this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestDiscipline = country => {
  let sql = `SELECT discipline, COUNT(*) FROM GoldMedal WHERE country = '${country}' \
             GROUP BY discipline`;

  return sql;
};

/*
Returns a SQL query string that will find the sport this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestSport = country => {
  let sql = `SELECT sport, COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}' \
             GROUP BY sport ORDER BY sport DESC`;

  return sql;
};

/*
Returns a SQL query string that will find the event this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestEvent = country => {
  let sql = `SELECT event, COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}' \
             GROUP BY event ORDER BY event DESC`;

  return sql;
};

/*
Returns a SQL query string that will find the number of male medalists.
*/

const numberMenMedalists = country => {
  let sql = `SELECT COUNT(DISTINCT name) FROM GoldMedal WHERE country = '${country}' \
            AND gender = 'Men'`;

  return sql;
};

/*
Returns a SQL query string that will find the number of female medalists.
*/

const numberWomenMedalists = country => {
  let sql = `SELECT COUNT(DISTINCT name) FROM GoldMedal WHERE country = '${country}' \
            AND gender = 'Women'`;

  return sql;
};

/*
Returns a SQL query string that will find the athlete with the most medals.
*/

const mostMedaledAthlete = country => {
  let sql = `SELECT name, COUNT(*) FROM GoldMedal WHERE country = '${country}' \
            GROUP BY 1 ORDER BY 1 DESC`;

  return sql;
};

/*
Returns a SQL query string that will find the medals a country has won
optionally ordered by the given field in the specified direction.
*/

const orderedMedals = (country, field, sortAscending) => {

  let ord = '';
  
  if (field) {
    if (sortAscending) {
      ord = `ORDER BY ${field} ASC`;  
    } else {
      ord = `ORDER BY ${field} DESC`;
    };

  }
  
  /*  This works fine when the app is run, except that the list is not populated at the beginning. 
  However, it starts to work when one clicks the sorting arrows. It fails the test though: Test 
  report is 'Uncaught TypeError: Cannot read property 'length' of undefined'. However, the test runs 
  error free if one ORDERs BY name or using the solution:

  sql = `SELECT * FROM GoldMedal WHERE country = '${country}' \
             ORDER BY ${field} ${ord}`;
  */
  let sql = `SELECT * FROM GoldMedal WHERE country = '${country}' ${ord}`;

  return sql;
};

/*
Returns a SQL query string that will find the sports a country has
won medals in. It should include the number of medals, aliased as 'count',
as well as the percentage of this country's wins the sport represents,
aliased as 'percent'. Optionally ordered by the given field in the specified direction.
*/

const orderedSports = (country, field, sortAscending) => {

  let ord = '';
  
  if (sortAscending) {
    ord = 'ASC';  
  } else {
    ord = 'DESC';
  };


  let sql = `SELECT sport, COUNT(sport) AS 'count' \ ,
            100.0 * COUNT(sport) / (SELECT COUNT(*) FROM GoldMedal WHERE country = '${country}') AS 'percent' 
            FROM GoldMedal WHERE country = '${country}' \
            GROUP BY sport ORDER BY sport ${ord}`; 



  return sql;
};

module.exports = {
  createCountryTable,
  createGoldMedalTable,
  goldMedalNumber,
  mostSummerWins,
  mostWinterWins,
  bestDiscipline,
  bestSport,
  bestYear,
  bestEvent,
  numberMenMedalists,
  numberWomenMedalists,
  mostMedaledAthlete,
  orderedMedals,
  orderedSports
};
