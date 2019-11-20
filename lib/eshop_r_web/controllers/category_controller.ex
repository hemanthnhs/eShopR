defmodule EshopRWeb.CategoryController do
  use EshopRWeb, :controller

  alias EshopR.Categories
  alias EshopR.Categories.Category
  alias EshopRWeb.ProductView

  action_fallback EshopRWeb.FallbackController

  def index(conn, _params) do
    categories = Categories.list_categories()
    render(conn, "index.json", categories: categories)
  end

  def show(conn, %{"id" => id}) do
    products = Categories.get_products(id)
    conn = put_view(conn, EshopRWeb.ProductView)
    render(conn, "index.json", products: products)
  end
end
