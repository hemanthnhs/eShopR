defmodule EshopRWeb.ShoppingCartView do
  use EshopRWeb, :view
  alias EshopRWeb.ShoppingCartView

  def render("show.json", %{shopping_cart: shopping_cart, total_val: total_val}) do
    %{data: render_one(shopping_cart, ShoppingCartView, "shopping_cart.json"), total_val: total_val}
  end

  def render("index.json", %{shopping_cart: shopping_cart, total_val: total_val}) do
    %{data: render_many(shopping_cart, ShoppingCartView, "shopping_cart.json"), total_val: total_val}
  end

  def render("cart_item.json", %{shopping_cart: shopping_cart}) do
    %{data: render_one(shopping_cart, ShoppingCartView, "shopping_cart.json")}
  end

  def render("shopping_cart.json", %{shopping_cart: shopping_cart}) do
    %{
      id: shopping_cart.id,
      product_id: shopping_cart.product_id,
      product_quantity: shopping_cart.product.options,
      product_name: shopping_cart.product.name,
      option_selected: shopping_cart.option_selected,
      quantity: shopping_cart.quantity,
      images: shopping_cart.product.images,
      selling_price: shopping_cart.product.selling_price,
      brand: shopping_cart.product.brand
    }
  end
end
