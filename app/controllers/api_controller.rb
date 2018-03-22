# frozen_string_literal: true

class ApiController < ApplicationController
  include Response
  include ExceptionHandler

  skip_before_action :verify_authenticity_token

  def real_time_all
    json_response(
      CourseRealTime.select('DISTINCT ON(college) *').order('college, snapshot_at DESC')
    )
  end

  def import
    @snapshot = ScrapeSnapshot.new(import_params)
    @snapshot.save!
    ScrapeSnapshotConsumerJob.perform_later(@snapshot.id)
    head :ok
  end

  private

  def import_params
    courses_params = (params[:courses] || [{}])[0].keys
    params.permit(
      :snapshot_at,
      :college,
      courses: [courses_params]
    )
  end
end
