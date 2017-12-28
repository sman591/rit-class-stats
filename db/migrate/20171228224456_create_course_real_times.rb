class CreateCourseRealTimes < ActiveRecord::Migration[5.1]
  def change
    enable_extension 'citext'

    create_table :course_real_times do |t|
      t.datetime :snapshot_at
      t.citext :college
      t.jsonb :capacity_data

      t.timestamps
    end
  end
end
