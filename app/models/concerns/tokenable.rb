module Tokenable
  extend ActiveSupport::Concern
  include Rails.application.routes.url_helpers

  class Digitize
    @@chars = [('0'..'9'), ('a'..'z'), ('A'..'Z')].map {|r| r.to_a }.flatten
    @@n = @@chars.size
    @@chars_hash = Hash[*(@@chars).zip((0..@@n).to_a).flatten]

    class << self
      def to(i)
        digit = []
        begin
          i, c = i.divmod @@n
          digit << @@chars[c]
        end while i > 0

        return digit.reverse.join ''
      end

      def from(str)
        i = str.split('').size - 1
        r = 0
        str.split('').each_with_index do |c, n|
          r += @@n ** (i-n) * @@chars_hash[c]
        end
        r
      end
    end
  end

  included do
    after_create :generate_token
  end

  protected

  def generate_token
    self.token = Digitize.to(self.id)
    self.save
  end

  def generate_random_token
    self.token = loop do
      random_token = SecureRandom.urlsafe_base64(nil, false)
      break random_token unless self.class.exists?(token: random_token)
    end
    self.save
  end
end
