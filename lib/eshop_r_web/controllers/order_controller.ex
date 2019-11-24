defmodule EshopRWeb.OrderController do
  use EshopRWeb, :controller

  alias EshopR.Orders
  alias EshopR.Orders.Order
  alias EshopR.ShoppingCarts
  alias EshopR.ShoppingCarts.ShoppingCart

  action_fallback EshopRWeb.FallbackController

  plug EshopRWeb.Plugs.RequireAuth when action in [:create, :index]

  def index(conn, _params) do
    if conn.assigns[:current_user].type == 0 do
      orders = Orders.list_orders(conn.assigns[:current_user].id)
      render(conn, "index.json", orders: orders)
    else
      orders = Orders.sold_orders(conn.assigns[:current_user].id)
      render(conn, "index.json", orders: orders)
    end
  end

  def create(conn, order_params) do
    shopping_cart = ShoppingCarts.get_shopping_cart!(conn.assigns[:current_user].id)
    seller_ids = Enum.reduce shopping_cart, MapSet.new(), fn cart, acc ->
      MapSet.put(acc, cart.product.owner_id)
    end
    Enum.each Enum.to_list(seller_ids), fn seller_id ->
      order_items = Enum.reduce shopping_cart, Map.new(), fn cart, acc ->
        if cart.product.owner_id == seller_id do
          {display_name, display_img} = Enum.at(cart.product.images, 0)
          Map.put(
            acc,
            "#{cart.product.id}_#{cart.option_selected}",
            %{
              name: cart.product.name,
              display_img: display_img,
              sold_price: cart.product.selling_price,
              listed_price: cart.product.marked_price,
              quantity: 1,
              option_selected: cart.option_selected
            }
          )
        end
      end
      attrs = %{}
      attrs = Map.put(attrs, "buyer_id", conn.assigns[:current_user].id)
      attrs = Map.put(attrs, "seller_id", seller_id)
      attrs = Map.put(attrs, "order_items", order_items)
      attrs = Map.put(attrs, "status_id", 1)
      order = Orders.create_order(attrs)
      IO.inspect(order)
    end
    send_resp(conn, 200, json(conn, %{success: "Order placed."}))
  end

  def show(conn, %{"id" => id}) do
    order = Orders.get_order!(id)
    render(conn, "show.json", order: order)
  end

  def update(conn, order_params) do
    order = Orders.get_order!(order_params["id"])

    with {:ok, %Order{} = order} <- Orders.update_order(order, order_params) do
      render(conn, "show.json", order: order)
    end
  end

  def delete(conn, %{"id" => id}) do
    order = Orders.get_order!(id)

    with {:ok, %Order{}} <- Orders.delete_order(order) do
      send_resp(conn, :no_content, "")
    end
  end
end
