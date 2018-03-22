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
    courses = params.delete(:courses)
    @snapshot = ScrapeSnapshot.new(import_params)
    @snapshot.courses = courses
    @snapshot.save!
    ScrapeSnapshotConsumerJob.perform_later(snapshot_id: @snapshot.id)
    head :ok
  end

  private

  def import_params
    params.permit(
      :snapshot_at,
      :college
    )
  end
end
