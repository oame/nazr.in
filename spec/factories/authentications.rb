# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :authentication, :class => 'Authentications' do
    user nil
    uid "MyString"
    provider "MyString"
    token "MyString"
    token_secret "MyString"
  end
end
