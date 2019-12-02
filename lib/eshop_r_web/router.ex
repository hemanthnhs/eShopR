defmodule EshopRWeb.Router do
  use EshopRWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :ajax do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/ajax", EshopRWeb do
    pipe_through :ajax
    resources "/sessions", SessionController, only: [:create], singleton: true
    get "/categories", CategoryController, :index
    resources "/categories", CategoryController, only: [:show]
    resources "/orders", OrderController, only: [:index, :show, :update]
    get "/manageAddress", AddressController, :index
    post "/addAddress", AddressController, :create
    post "/createProduct", ProductController, :create
    resources "/products", ProductController,only: [:show, :index]
    resources "/shoppingcarts", ShoppingCartController, except: [:new, :edit]
    get "/viewCart", ShoppingCartController, :show
    get "/search", ProductController, :search
    resources "/adminconfigs", AdminConfigController, only: [:create, :show]
    post "/placeOrder", OrderController, :create
    get "/status", StatusController, :index
    get "/trackingStatus", OrderController, :tracking_status
    get "/seller_metrics", OrderController, :seller_metrics
    post "/newRegistration", UserController, :create
  end

  scope "/", EshopRWeb do
    pipe_through :browser
    get "/*path", PageController, :index

  end
  # Other scopes may use custom stacks.
  # scope "/api", EshopRWeb do
  #   pipe_through :api
  # end
end
