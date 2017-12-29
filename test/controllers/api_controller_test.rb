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
    body = parse_json_body
    assert_equal "bar", body['capacity_data']['foo']
  end

  test "should return error on failed validation" do
    post api_import_url, params: {}
    assert_response :unprocessable_entity
    body = parse_json_body
    assert_not_empty body['message']
  end

  private

  def parse_json_body
    JSON.parse(@response.body)
  end

  def valid_params
    model = build(:course_real_time)
    model.attributes
  end
end
