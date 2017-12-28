class ApiController < ApplicationController
  include Response
  include ExceptionHandler

  skip_before_action :verify_authenticity_token

  def real_time_all
    json_response(CourseRealTime.all)
  end

  def import
    @course_real_time = CourseRealTime.new(import_params)
    @course_real_time.save
    json_response(@course_real_time)
  end

  private

  def import_params
    params.require(:import).permit(
      :snapshot_at,
      :college,
      :capacity_data
    )
  end
end
