defmodule EshopRWeb.ShoppingCartController do
  use EshopRWeb, :controller

  alias EshopR.ShoppingCarts
  alias EshopR.ShoppingCarts.ShoppingCart

  action_fallback EshopRWeb.FallbackController

  plug EshopRWeb.Plugs.RequireAuth when action in [:create, :show]

  def create(conn, %{"data" => shopping_cart_params}) do
    shopping_cart_params = Map.put(shopping_cart_params, "cartid", conn.assigns[:current_user].id)
    with {:ok, %ShoppingCart{} = shopping_cart} <- ShoppingCarts.create_shopping_cart(shopping_cart_params) do
      send_resp(conn, 200, json(conn, %{success: "Added to Cart"}))
    end
  end

  def show(conn, _params) do
    shopping_cart = ShoppingCarts.get_shopping_cart!(conn.assigns[:current_user].id)
    render(conn, "show.json", shopping_cart: shopping_cart)
  end

  def update(conn, %{"id" => id, "shopping_cart" => shopping_cart_params}) do
    shopping_cart = ShoppingCarts.get_shopping_cart!(id)
    with {:ok, %ShoppingCart{} = shopping_cart} <- ShoppingCarts.update_shopping_cart(
      shopping_cart,
      shopping_cart_params
    ) do
      render(conn, "show.json", shopping_cart: shopping_cart)
    end
  end

  def delete(conn, %{"id" => id}) do
    shopping_cart = ShoppingCarts.get_shopping_cart!(id)

    with {:ok, %ShoppingCart{}} <- ShoppingCarts.delete_shopping_cart(shopping_cart) do
      send_resp(conn, :no_content, "")
    end
  end
end
