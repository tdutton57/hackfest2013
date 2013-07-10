require 'test_helper'

class StaticPagesControllerTest < ActionController::TestCase
  test "should get getURL" do
    get :getURL
    assert_response :success
  end

end
