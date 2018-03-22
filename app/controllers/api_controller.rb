class ApiController < ApplicationController
  include Response
  include ExceptionHandler

  skip_before_action :verify_authenticity_token

  def real_time_all
    json_response(
      CourseRealTime.select("DISTINCT ON(college) *").order("college, snapshot_at DESC")
    )
  end

  def import
    @snapshot = ScrapeSnapshot.new(import_params)
    @snapshot.save!
    json_response({ message: "Data imported" })
  end

  private

  def import_params
    params.permit(
      :snapshot_at,
      :college,
      courses: [{}]
    )
  end
end
