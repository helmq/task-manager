class User < ApplicationRecord
  has_secure_password
  has_many :my_tasks, class_name: 'Task', foreign_key: 'author_id', dependent: :destroy, inverse_of: :user
  has_many :assigned_tasks, class_name: 'Task', foreign_key: 'asignee_id', dependent: :destroy, inverse_of: :user
  validates :first_name, presence: true, length: { minimum: 2 }
  validates :last_name, presence: true, length: { minimum: 2 }
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: /@/ }
end
