Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # except excludes routes that will be generated by resources; opposite of only
  resources :cats, except: :destroy
  resources :cat_rental_requests, only: [:new, :create] do
    # on: :member adds :id wildcard to the route
    post 'approve', on: :member
    post 'deny', on: :member
  end

  root to: redirect('/cats')
end
