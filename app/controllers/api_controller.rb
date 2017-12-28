class ApiController < ApplicationController
  include Response
  include ExceptionHandler

  def real_time_all
    json_response(CourseRealTime.all)
  end

  def import
    render json: nil
  end
end
