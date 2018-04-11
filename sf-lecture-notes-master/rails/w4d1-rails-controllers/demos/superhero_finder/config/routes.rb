Rails.application.routes.draw do
  # get 'superheroes', to: 'superheroes#index'
  # get 'superheroes/:id', to: 'superheroes#show'
  # post 'superheroes', to: 'superheroes#create'
  # patch 'superheroes/:id', to: 'superheroes#update'
  # put 'superheroes/:id', to: 'superheroes#update'
  # delete 'superheroes/:id', to: 'superheroes#destroy'
  # resources :superheroes, only: [:index, :show, :create, :update, :destroy]
  resources :superheroes do 
    resources :abilities, only: [:index]
  end

  resources :abilities, only: [:show, :update, :create, :destroy]
end
