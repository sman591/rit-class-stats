# frozen_string_literal: true

require File.expand_path('../../config/environment', __FILE__)

# simplecov must be started before rails/test_help
if ['manual', 'travis'].include?(ENV['RUN_COVERAGE'])
  require 'simplecov'
  SimpleCov.add_filter 'vendor/'
  SimpleCov.start 'rails'
  puts 'required simplecov'
end

require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...

  include FactoryBot::Syntax::Methods

  def post_json(location, params)
    params ||= {}
    params[:headers] ||= {}
    params[:headers]['content-type'] ||= 'application/json'
    params[:params] = params[:params].to_json
    post location, params
  end
end
