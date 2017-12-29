require 'test_helper'

class ApiControllerTest < ActionDispatch::IntegrationTest
  test "#real_time_all should succeed" do
    get api_real_time_all_url
    assert_response :success
  end

  test "#real_time_all should return an entry per college" do
    create_list(:course_real_time, 5, college: 'foo')
    create_list(:course_real_time, 5, college: 'bar')
    create_list(:course_real_time, 5, college: 'baz')

    get api_real_time_all_url
    assert_response :success
    body = parse_json_body

    assert_equal 3, body.count
  end

  test "#real_time_all should return most recent entry" do
    recent_time = 1.day.ago.iso8601(3)
    create(:course_real_time, college: 'foo', snapshot_at: 5.days.ago)
    create(:course_real_time, college: 'foo', snapshot_at: recent_time)
    create(:course_real_time, college: 'foo', snapshot_at: 7.days.ago)

    get api_real_time_all_url
    assert_response :success
    body = parse_json_body

    assert_equal 1, body.count
    assert_match recent_time, body[0]["snapshot_at"]
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
