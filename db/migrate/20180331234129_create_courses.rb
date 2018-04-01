class CreateCourses < ActiveRecord::Migration[5.1]
  def change
    create_table :courses do |t|
      t.datetime :snapshot_at
      t.citext :college
      t.citext :department
      t.string :course_id
      t.jsonb :data
      t.jsonb :capacity_data

      t.timestamps
    end
  end
end
