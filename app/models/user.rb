class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :recoverable, :validatable

  has_many :links

  after_create :update_access_token!

  validates :email, presence: true

  private

  def update_access_token!
    self.access_token = "#{self.id}:#{Devise.friendly_token}"
    save
  end
end
