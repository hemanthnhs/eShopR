defmodule EshopRWeb.CategoryController do
  use EshopRWeb, :controller

  alias EshopR.Categories
  alias EshopR.Categories.Category

  action_fallback EshopRWeb.FallbackController

  def index(conn, _params) do
    categories = Categories.list_categories()
    render(conn, "index.json", categories: categories)
  end
end
