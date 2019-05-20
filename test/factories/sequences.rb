FactoryBot.define do
  sequence :email do |n|
    "email#{n}@factory.com"
  end
  sequence(:string, aliases: %i[first_name last_name password name description]) do |n|
    "string#{n}"
  end
end
