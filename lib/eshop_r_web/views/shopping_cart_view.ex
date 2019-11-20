defmodule EshopRWeb.ShoppingCartView do
  use EshopRWeb, :view
  alias EshopRWeb.ShoppingCartView

  def render("index.json", %{shoppingcarts: shoppingcarts}) do
    %{data: render_many(shoppingcarts, ShoppingCartView, "shopping_cart.json")}
  end

  def render("show.json", %{shopping_cart: shopping_cart}) do
    %{data: render_many(shopping_cart, ShoppingCartView, "shopping_cart.json")}
  end

  def render("shopping_cart.json", %{shopping_cart: shopping_cart}) do
    %{
      product_id: shopping_cart.product_id,
      product_name: shopping_cart.product.name,
      option_selected: shopping_cart.option_selected,
      quantity: shopping_cart.quantity}
  end
end
