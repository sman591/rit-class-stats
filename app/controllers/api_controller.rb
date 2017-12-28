class ApiController < ApplicationController
  def real_time_all
    render json: CourseRealTime.all
  end

  def import
    render json: nil
  end
end
