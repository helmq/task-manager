FactoryBot.define do
  factory :task do
    name { generate :string }
    description { generate :string }
    association :author, factory: :manager
    association :assignee, factory: :developer
  end
end
