Rails.application.routes.draw do
  root 'web/boards#show'

  scope module: :web do
    resource :board,  only: :show
    resource :session, only: %i[new create destroy]
    resources :developers, only: %i[new create]
  end

  namespace :admin do
    resources :users
  end

  namespace :api do
    namespace :v1 do
      resources :tasks, only: %i[index show create update destroy]
      resources :users, only: %i[index show]
    end
  end
end
