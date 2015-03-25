object @link => nil

attribute :address => :target
attribute :token
node(:url){ |l| 'http://nazr.in/' + l.token }
