require 'singleton'
require 'sqlite3'

class MovieDatabase < SQLite3::Database
  include Singleton

  def initialize
    super(File.dirname(__FILE__) + "/../movie.db")

    self.results_as_hash = true
    self.type_translation = true
  end

  def self.execute(*args)
    self.instance.execute(*args)
  end
end

# 1. Obtain the cast list for the movie "Zoolander"; order by the
# actor's name.
def zoolander_cast
  MovieDatabase.execute(<<-SQL)
  SELECT
    actors.name
  FROM
    actors
  JOIN
    castings ON actors.id = castings.actor_id
  JOIN
    movies ON castings.movie_id = movies.id
  WHERE
    movies.title = 'Zoolander'
  ORDER BY
    actors.name
SQL
end

# 2. List the films in which 'Matt Damon' has appeared; order by
# movie title.
def matt_damon_films
  MovieDatabase.execute(<<-SQL)
  SELECT
    movies.title
  FROM
    actors
  JOIN
    castings ON actors.id = castings.actor_id
  JOIN
    movies ON castings.movie_id = movies.id
  WHERE
    actors.name = 'Matt Damon'
  ORDER BY
    movies.title
SQL
end

# 3. For each film released in 2000 or later in which 'Christopher
#    Walken' has appeared, list the movie title and the year. Order by
#    movie title.
def christopher_walken_21st_century_films
  MovieDatabase.execute(<<-SQL)
  SELECT
    movies.title, movies.yr
  FROM
    actors
  JOIN
    castings ON actors.id = castings.actor_id
  JOIN
    movies ON castings.movie_id = movies.id
  WHERE
    actors.name = 'Christopher Walken' AND yr >= 2000
  ORDER BY
    movies.title
SQL
end

# 4. List the films together with the leading star for all films
#    produced between 1906 and 1908 (inclusive). Order by movie title,
#    and label the actors as 'star'.
def old_films_and_their_star
  MovieDatabase.execute(<<-SQL)
  SELECT
    movies.title, actors.name AS star
  FROM
    actors
  JOIN
    castings ON actors.id = castings.actor_id
  JOIN
    movies ON castings.movie_id = movies.id
  WHERE
    (movies.yr BETWEEN 1906 AND 1908) AND castings.ord = 1
  ORDER BY
    movies.title
SQL
end

# 5. There is a movie from 1920 in our database for which there is no
#    associated casting information. Give the title of this movie.
def no_casting_info
  MovieDatabase.execute(<<-SQL)
  SELECT
    movies.title
  FROM
    movies
  LEFT OUTER JOIN
    castings ON movies.id = castings.movie_id
  WHERE
    movies.yr = 1920 AND castings.movie_id IS NULL
  ORDER BY
    movies.title
SQL
end

# 6. Obtain a list in alphabetical order of actors who've had >=26
# starring roles. Order by actor name.
def biggest_stars
  MovieDatabase.execute(<<-SQL)
  SELECT
    actors.name, COUNT(*) AS count
  FROM
    actors
  JOIN
    castings ON actors.id = castings.actor_id
  JOIN
    movies ON castings.movie_id = movies.id
  WHERE
    castings.ord = 1
  GROUP BY
    actors.id
  HAVING
    COUNT(*) >= 26
  ORDER BY
    actors.name
SQL
end

# 7. List the film title and the leading actor for all of the films
# 'Julie Andrews' played in. Order by movie title name. Be careful!
# There is a movie (Pink Panther) in which Julie Andrews appears in
# two roles; do not double count the star of that film (Peter
# Sellers).
def julie_andrews_stars
  MovieDatabase.execute(<<-SQL)
  SELECT
    movies.title, lead_actor.name
  FROM
    actors AS julie_actor
  JOIN
    castings AS julie_casting ON julie_actor.id = julie_casting.actor_id
  JOIN
    movies ON julie_casting.movie_id = movies.id
  JOIN
    castings AS lead_casting ON movies.id = lead_casting.movie_id
  JOIN
    actors AS lead_actor ON lead_casting.actor_id = lead_actor.id
  WHERE
    (julie_actor.name = "Julie Andrews" AND lead_casting.ord = 1)
  GROUP BY
    movies.id
  ORDER BY
    movies.title
SQL
end

# 8. Which were the busiest years for 'John Travolta'? List the year
# and the number of movies he made each year, for any year in which he
# made >2 movies. Order by year.
def busiest_john_travolta_years
  MovieDatabase.execute(<<-SQL)
  SELECT
    movies.yr, COUNT(*) AS count
  FROM
    actors
  JOIN
    castings ON actors.id = castings.actor_id
  JOIN
    movies ON castings.movie_id = movies.id
  WHERE
    actors.name = "John Travolta"
  GROUP BY
    movies.yr
  HAVING
    COUNT(*) > 2
SQL
end

