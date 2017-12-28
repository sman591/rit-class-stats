require 'test_helper'

class ApiControllerTest < ActionDispatch::IntegrationTest
  test "should get real_time_all" do
    get api_real_time_all_url
    assert_response :success
  end

  test "should post import" do
    post api_import_url
    assert_response :success
  end
end
