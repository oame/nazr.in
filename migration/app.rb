require 'bundler/setup'
require 'sequel'
require 'mongo'

# Sqlite3
sqlite_client = Sequel.connect('sqlite://database.db')
urls = sqlite_client[:urls]

# Mongodb
mongo_db = Mongo::Client.new(ENV['DB_URL'])
shortlinks = mongo_db['shortlinks']
identitycounters = mongo_db['identitycounters']

# Do migration
puts "Item count: #{urls.count}"
shortlinks.indexes.drop_all
shortlinks.drop
shortlinks.insert_many(urls.map{ |url|
  {
    numerical_id: url[:id],
    base62: url[:d62],
    url: url[:original_url]
  }
})

last_numerical_id = shortlinks.find().sort({numerical_id: -1}).first[:numerical_id]
puts "Last #{last_numerical_id}"

identitycounters.drop
identitycounters.insert_one({
  model: 'ShortLink',
  field: 'numerical_id',
  count: last_numerical_id
})

# mongodump -d nazrin
# mongorestore -h URL -d DB -u USER -p PASSWORD nazrin
