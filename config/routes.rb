Rails.application.routes.draw do
  root "web/board#show"

  scope module: :web do
    resource :board,  only: :show
    resource :session, only: :new
  end
end
