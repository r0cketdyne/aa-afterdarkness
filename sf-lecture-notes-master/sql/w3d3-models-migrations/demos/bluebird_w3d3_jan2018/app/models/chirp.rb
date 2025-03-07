# == Schema Information
#
# Table name: chirps
#
#  id         :integer          not null, primary key
#  body       :text             not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Chirp < ApplicationRecord
  # validates :body, presence: true
  # validate :body_too_long

  def body_too_long
    if body && body.length > 140
      # self.errors 
      errors[:body] << "too long"
    end 
  end 

  belongs_to :author,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :User

  has_many :likes, 
    primary_key: :id,
    foreign_key: :chirp_id,
    class_name: :Like
end
