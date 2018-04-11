require_relative 'piece'
require_relative 'slideable'

class Queen < Piece
  include Slideable

  def symbol
    '♛'.colorize(color)
  end

  protected
  #this move_dirs will overwrite the MODULE move_dirs
  def move_dirs
    horizontal_dirs + diagonal_dirs
  end
end
