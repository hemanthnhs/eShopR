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
  end

  scope "/", EshopRWeb do
    pipe_through :browser
    get "/googleSignIn", AuthController, :index
    get "/*path", PageController, :index

  end

  scope "/auth", EshopRWeb do
    pipe_through :browser

    get "/:provider", AuthController, :index
    get "/:provider/callback", AuthController, :callback
    delete "/logout", AuthController, :delete
  end

  # Other scopes may use custom stacks.
  # scope "/api", EshopRWeb do
  #   pipe_through :api
  # end
end
