Rails.application.routes.draw do
  root 'web/boards#show'

  scope module: :web do
    resource :board,  only: :show
    resource :session, only: %i[new create destroy]
  end
end
