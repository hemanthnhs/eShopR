defmodule EshopRWeb.ShoppingCartController do
  use EshopRWeb, :controller

  alias EshopR.ShoppingCarts
  alias EshopR.ShoppingCarts.ShoppingCart

  action_fallback EshopRWeb.FallbackController

  plug EshopRWeb.Plugs.RequireAuth when action in [:create, :show]

  def create(conn, %{"data" => shopping_cart_params}) do
    shopping_cart_params = Map.put(shopping_cart_params, "cartid", conn.assigns[:current_user].id)
    with {:ok, %ShoppingCart{} = shopping_cart} <- ShoppingCarts.create_shopping_cart(shopping_cart_params) do
      render(conn, "cart_item.json", shopping_cart: shopping_cart)
    end
  end

  def show(conn, _params) do
    shopping_cart = ShoppingCarts.get_shopping_cart!(conn.assigns[:current_user].id)
    render(conn, "show.json", shopping_cart: shopping_cart)
  end

  def update(conn, shopping_cart_params) do
    {id, ""} = Integer.parse(shopping_cart_params["id"])
    shopping_cart = ShoppingCarts.get_shopping_cart_by_id!(id)
    with {:ok, %ShoppingCart{} = shopping_cart} <- ShoppingCarts.update_shopping_cart(
      shopping_cart,
      shopping_cart_params
    ) do
      render(conn, "cart_item.json", shopping_cart: shopping_cart)
    end
  end

  def delete(conn, %{"id" => id}) do
    {id, ""} = Integer.parse(id)
    shopping_cart = ShoppingCarts.get_shopping_cart_by_id!(id)
    with {:ok, %ShoppingCart{}} <- ShoppingCarts.delete_shopping_cart(shopping_cart) do
      send_resp(conn, 200, Jason.encode!(%{success: "Item removed"}))
    end
  end
end
