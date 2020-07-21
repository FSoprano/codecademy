-- How many entries in the database are from Africa?
select count(*) from countries where continent="Africa";

select * from countries where continent="Africa";


-- What was the total population of Oceania in 2005?
SELECT continent, sum(population) from countries join population_years on countries.id = population_years.country_id WHERE continent = "Oceania" and year=2005;



-- What is the average population of countries in South America in 2003?
SELECT round(AVG(population),2) from countries join population_years on countries.id = population_years.country_id WHERE continent ="South America" and year=2003;



-- What country had the smallest population in 2007?
SELECT name, min(population) from countries join population_years on countries.id = population_years.country_id WHERE year=2007;



-- What is the average population of Poland during the time period covered by this dataset?
SELECT round(avg(population),2) from countries join population_years on countries.id = population_years.country_id WHERE name = "Poland";



-- How many countries have the word "The" in their name?
SELECT count(*) FROM countries WHERE name like '% The%';



-- What was the total population of each continent in 2010?
SELECT continent, sum(population) from countries join population_years on countries.id = population_years.country_id WHERE  year=2010 GROUP BY continent;

