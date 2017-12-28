require 'test_helper'

class ApiControllerTest < ActionDispatch::IntegrationTest
  test "should get real_time_all" do
    get api_real_time_all_url
    assert_response :success
  end

  test "should post import" do
    post api_import_url, params: { import: { snapshot_at: Time.now.to_s } }
    assert_response :success
  end

  test "should post import with capacity_data" do
    post api_import_url, params: { import: { capacity_data: { foo: 'bar' } } }
    assert_response :success
    body = JSON.parse(@response.body)
    assert_equal "bar", body['capacity_data']['foo']
  end
end
