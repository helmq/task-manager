class Admin::ApplicationController < ApplicationController
  include Concerns::AuthHelper
  helper_method :current_user
  before_action :authenticate_user!, :authorize

  def authorize
    render(file: Rails.root.join('public', '403.html'), status: :forbidden, layout: false) if forbidden?
  end

  def forbidden?
    !current_user.is_a?(Admin)
  end
end
