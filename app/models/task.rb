class Task < ApplicationRecord
  belongs_to :author, class_name: 'User', inverse_of: :my_tasks
  belongs_to :assignee, class_name: 'User', optional: true, inverse_of: :assigned_tasks
  validates :name, presence: true
  validates :description, presence: true
  validates :author, presence: true
  validates :description, length: { maximum: 500 }

  state_machine initial: :new_task do
    event :develop do
      transition %i[new_task in_qa in_code_review] => :in_development
    end
    event :archive do
      transition %i[new_task released] => :archived
    end
    event :qa do
      transition in_development: :in_qa
    end
    event :review do
      transition in_qa: :in_code_review
    end
    event :ready do
      transition in_code_review: :ready_for_release
    end
    event :release do
      transition ready_for_release: :released
    end
  end
end
