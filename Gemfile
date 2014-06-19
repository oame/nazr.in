source 'https://rubygems.org'
source 'https://rails-assets.org'

ruby '2.1.2'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.1.1'

# Build JSON
gem 'rabl'
gem 'oj'

# API
gem 'grape'
gem 'grape-rabl'

# Global settings
gem 'settingslogic'

# Assets libralies
gem 'sass-rails', '~> 4.0.3'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.0.0'
gem 'slim-rails'
gem 'compass-rails'
gem 'jquery-rails'
gem 'ceaser-easing'

gem 'font-awesome-rails'
gem 'rails-assets-nouislider', '6.0.0'

# Authentication
gem 'devise'
gem 'omniauth'
gem 'omniauth-twitter'

# Authorization
gem 'cancancan'

# Model helpers
gem 'paranoia'

# Pagination
gem 'kaminari'

# I18n
gem 'rails-i18n', '~> 4.0.0'
gem 'i18n_generators'

# Ajax
gem 'turbolinks'
gem 'jquery-turbolinks'
gem 'nprogress-rails'

# Monitoring
gem 'newrelic_rpm'

# Admin
#gem 'activeadmin', github: 'gregbell/active_admin'

gem 'action_args'


group :production do
  gem 'mysql'

  gem 'therubyracer', platform: :ruby
end

group :development, :test do
  gem 'sqlite3'

  gem 'quiet_assets'
  gem 'letter_opener'
  gem 'annotate'

  # Test
  gem 'rspec-rails'
  gem 'factory_girl_rails'
  gem 'faker'
  gem 'faker-japanese'
  gem 'capybara'
  gem 'database_cleaner'
  gem 'accept_values_for'
  gem 'spring'
  gem 'spring-commands-rspec'

  # Auto-generate API documents
  gem 'grape-swagger'
  gem 'grape-swagger-ui'

  # Improve error analytics
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'pry-rails'
  gem 'hirb'
  gem 'hirb-unicode'
  gem 'awesome_print'
  gem 'tapp'

  # Detect vulnerability
  gem 'brakeman', require: false

  # Detect N+1
  gem 'bullet'

  # Deployment
  # gem 'capistrano', '~> 3.0', require: false
  # gem 'capistrano-rails', require: false
  # gem 'capistrano-bundler', require: false
  # gem 'capistrano-rbenv', require: false
  # gem 'capistrano-maintenance', require: false
end
