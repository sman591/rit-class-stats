require 'test_helper'

class ApiControllerTest < ActionDispatch::IntegrationTest
  test "should get real_time_all" do
    get api_real_time_all_url
    assert_response :success
  end

  test "should post import" do
    post api_import_url, params: valid_params
    assert_response :success
  end

  test "should post import with capacity_data" do
    params = valid_params
    params[:capacity_data] = { foo: 'bar' }
    post api_import_url, params: params
    assert_response :success
    body = JSON.parse(@response.body)
    assert_equal "bar", body['capacity_data']['foo']
  end

  private

  def valid_params
    model = build(:course_real_time)
    model.attributes
  end
end
