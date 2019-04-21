require 'test_helper'

class Api::V1::TasksControllerTest < ActionDispatch::IntegrationTest
  test 'should get show' do
    author = create :user
    task = create :task, author: author
    get :show, params: { id: task.id, format: :json }
    assert_response :success
  end

  test 'should get index' do
    get :index, params: { format: :json }
    assert_response :success
  end

  test 'should post create' do
    author = create :user
    sign_in(author)
    assignee = create :user
    task_attributes = attributes_for(:task)
      .merge(author_id: author.id, assignee_id: assignee.id)
      .stringify_keys

    patch :update, params: { id: task.id, format: :json, task: task_attributes }
    assert_response :success

    task.reload
    assert_equal task.slice(*task_attributes.keys), task_attributes
  end

  test 'should delete destroy' do
    author = create :user
    task = create :task, author: author
    delete :destroy, params: { id: task.id, format: :json }
    assert_response :success

    assert_not Task.where(id: task.id).exists?
  end
end
