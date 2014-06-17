class Nazrin::V1::Base < Grape::API
  version 'v1', using: :path

  mount Links
end
