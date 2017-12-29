require 'rails_helper'

# Test suite for the CourseRealTime model
RSpec.describe CourseRealTime, type: :model do
  # Association test
  # ensure CourseRealTime model has a 1:m relationship with the Item model
  it { should have_many(:items).dependent(:destroy) }
  # Validation tests
  # ensure columns title and created_by are present before saving
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:created_by) }
end
