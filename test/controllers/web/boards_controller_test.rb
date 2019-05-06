require 'test_helper'

class Web::BoardsControllerTest < ActionDispatch::IntegrationTest
  def setup
    user = create(:user)
    sign_in_as user
  end

  test 'should get show' do
    get board_url
    assert_response :success
  end
end
