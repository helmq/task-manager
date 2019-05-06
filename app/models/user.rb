class User < ApplicationRecord
  has_secure_password
  has_many :my_tasks, class_name: 'Task', foreign_key: 'author_id', dependent: :destroy, inverse_of: :author
  has_many :assigned_tasks, class_name: 'Task', foreign_key: 'assignee_id', dependent: :destroy, inverse_of: :assignee
  validates :first_name, presence: true, length: { minimum: 2 }
  validates :last_name, presence: true, length: { minimum: 2 }
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: /@/ }

  def name
    "#{first_name} #{last_name}"
  end
end
