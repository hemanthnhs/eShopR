defmodule EshopRWeb.ShoppingCartController do
  use EshopRWeb, :controller

  alias EshopR.ShoppingCarts
  alias EshopR.ShoppingCarts.ShoppingCart

  action_fallback EshopRWeb.FallbackController

  plug EshopRWeb.Plugs.RequireAuth when action in [:create, :show, :update, :delete]

  def create(conn, %{"data" => shopping_cart_params}) do
    shopping_cart_params = Map.put(shopping_cart_params, "cartid", conn.assigns[:current_user].id)
    unless(ShoppingCarts.check_if_exist(shopping_cart_params["cartid"], shopping_cart_params["product_id"], shopping_cart_params["option_selected"])) do
      with {:ok, %ShoppingCart{} = shopping_cart} <- ShoppingCarts.create_shopping_cart(shopping_cart_params) do
        render(conn, "cart_item.json", shopping_cart: shopping_cart)
      end
    else
      send_resp(conn, 200, Jason.encode!(%{warning: "Item already in cart."}))
    end
  end

  def show(conn, _params) do
    shopping_cart = ShoppingCarts.get_shopping_cart!(conn.assigns[:current_user].id)
    total_val = Enum.reduce shopping_cart, 0, fn cart, acc ->
      acc + (cart.product.selling_price * cart.quantity)
    end
    render(conn, "index.json", shopping_cart: shopping_cart, total_val: total_val)
  end

  def update(conn, shopping_cart_params) do
    {id, ""} = Integer.parse(shopping_cart_params["id"])
    shopping_cart = ShoppingCarts.get_shopping_cart_by_id!(id)
    with {:ok, %ShoppingCart{} = shopping_cart} <- ShoppingCarts.update_shopping_cart(
      shopping_cart,
      shopping_cart_params
    ) do
      shopping_carts = ShoppingCarts.get_shopping_cart!(conn.assigns[:current_user].id)
      total_val = Enum.reduce shopping_carts, 0, fn cart, acc ->
        acc + (cart.product.selling_price * cart.quantity)
      end
      render(conn, "show.json", shopping_cart: shopping_cart, total_val: total_val)
    end
  end

 def delete(conn, %{"id" => id}) do
    {id, ""} = Integer.parse(id)
    shopping_cart = ShoppingCarts.get_shopping_cart_by_id!(id)
    with {:ok, %ShoppingCart{}} <- ShoppingCarts.delete_shopping_cart(shopping_cart) do
      shopping_carts = ShoppingCarts.get_shopping_cart!(conn.assigns[:current_user].id)
      total_val = Enum.reduce shopping_carts, 0, fn cart, acc ->
        acc + (cart.product.selling_price * cart.quantity)
      end
      send_resp(conn, 200, Jason.encode!(%{success: "Item removed", total_val: total_val}))
    end
  end
end
