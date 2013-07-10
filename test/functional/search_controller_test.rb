require 'test_helper'

class SearchControllerTest < ActionController::TestCase
  test "should get getURL" do
    get :getURL
    assert_response :success
  end

end
