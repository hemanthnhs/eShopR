defmodule EshopRWeb.OrderController do
  use EshopRWeb, :controller

  alias EshopR.Orders
  alias EshopR.Orders.Order
  alias EshopR.ShoppingCarts
  alias EshopR.ShoppingCarts.ShoppingCart
  alias EshopR.Products

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
    errors = Enum.reduce(
      shopping_cart,
      [],
      fn cart, acc ->
        product = Products.get_product!(cart.product.id)
        {:ok, current_stock} = Map.fetch(product.options, cart.option_selected)
        if(current_stock == 0) do
          acc ++ ["#{product.name} is out of stock"]
        else
          if(current_stock - cart.quantity < 0) do
            acc ++ [
              "#{product.name} (#{cart.option_selected}) has only quantity of #{current_stock} available in stock"
            ]
          end
        end
      end
    )
    if(Enum.count(errors) > 0) do
      send_resp(
        conn,
        200,
        json(conn, %{error: "Some of the items are out of stock or have limited stock", items: errors})
      )
    end
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
              quantity: cart.quantity,
              option_selected: cart.option_selected
            }
          )
          product = Products.get_product!(cart.product.id)
          options = product.options
          #          Attribution https://dockyard.com/blog/2016/02/01/elixir-best-practices-deeply-nested-maps
          options = update_in(options, [cart.option_selected], &(&1 - cart.quantity))
          prd_attrs = %{}
          prd_attrs = Map.put(prd_attrs, "options", options)
          Products.update_product(product, prd_attrs)
        end
      end
      attrs = %{}
      attrs = Map.put(attrs, "buyer_id", conn.assigns[:current_user].id)
      attrs = Map.put(attrs, "seller_id", seller_id)
      attrs = Map.put(attrs, "order_items", order_items)
      attrs = Map.put(attrs, "status_id", 1)
      attrs = Map.put(attrs, "address_id", order_params["address_id"])

      order = Orders.create_order(attrs)
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

  def tracking_status(conn, %{"tracking_order" => order_id}) do
    IO.puts("==================---------5788888")
    #    url = "https://api.aftership.com/v4"
    #    url = "https://jsonplaceholder.typicode.com/todos/1"
    #    IO.inspect(HTTPoison.get(url, [{:"aftership-api-key", "05e3a14c-c328-4546-abb0-e8a8739bd748"}], [ ssl: [{:versions, [:'tlsv1.2']}] ]))
    IO.puts("==================---------5788888")
  end
end
