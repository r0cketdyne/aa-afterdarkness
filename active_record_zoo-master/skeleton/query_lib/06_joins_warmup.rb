# == Schema Information
#
# Table name: actors
#
#  id          :integer      not null, primary key
#  name        :string
#
# Table name: movies
#
#  id          :integer      not null, primary key
#  title       :string
#  yr          :integer
#  score       :float
#  votes       :integer
#  director_id :integer
#
# Table name: castings
#
#  movie_id    :integer      not null, primary key
#  actor_id    :integer      not null, primary key
#  ord         :integer

def films_from_sixty_two
  # List the films where the yr is 1962 [Show id, title]

end

def year_of_kane
  # Give year of 'Citizen Kane'.

end

def trek_films
  # List all of the Star Trek movies, include the id, title and yr (all of
  # these movies include the words Star Trek in the title). Order results by
  # year.

end

def films_by_id
  # What are the titles of the films with id 1119, 1595, 1768?

end

def glenn_close_id
  # What id number does the actress 'Glenn Close' have?

end

def casablanca_id
  # What is the id of the film 'Casablanca'?

end

def casablanca_cast
  # Obtain the cast list for 'Casablanca'. Use the id value that you obtained
  # in the previous question.

end

def alien_cast
  # Obtain the cast list for the film 'Alien'

end
