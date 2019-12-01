defmodule EshopRWeb.UserController do
  use EshopRWeb, :controller

  alias EshopR.Users
  alias EshopR.Users.User

  plug EshopRWeb.Plugs.RequireAuth when action in [:index, :show]

  action_fallback EshopRWeb.FallbackController

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def create(conn, %{"data" => user_params}) do
    user_params = Map.put(user_params, "password_hash", Argon2.add_hash(user_params["password"]).password_hash)
        with {:ok, %User{} = user} <- Users.create_user(user_params) do
          send_resp(
            conn,
            200,
            Jason.encode!(%{success: "User created"})
          )
        end
  end

end
