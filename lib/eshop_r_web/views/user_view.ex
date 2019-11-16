defmodule EshopRWeb.UserView do
  use EshopRWeb, :view
  alias EshopRWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      email: user.email,
      password_hash: user.password_hash,
      firstname: user.firstname,
      lastname: user.lastname,
      type: user.type}
  end
end
