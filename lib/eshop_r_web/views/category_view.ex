defmodule EshopRWeb.CategoryView do
  use EshopRWeb, :view
  alias EshopRWeb.CategoryView

  def render("index.json", %{categories: categories}) do
    %{data: categories}
  end
end
