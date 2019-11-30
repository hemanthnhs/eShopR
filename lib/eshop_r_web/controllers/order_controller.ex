defmodule EshopRWeb.OrderController do
  use EshopRWeb, :controller

  alias EshopR.Orders
  alias EshopR.Orders.Order
  alias EshopR.ShoppingCarts
  alias EshopR.ShoppingCarts.ShoppingCart
  alias EshopR.Products
  alias EshopR.Statuses

  action_fallback EshopRWeb.FallbackController

  plug EshopRWeb.Plugs.RequireAuth when action in [:create, :index, :seller_metrics]

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
        {current_stock, _} = Integer.parse(current_stock)
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
    if(!is_nil(errors) && Enum.count(errors) > 0) do
      send_resp(
        conn,
        200,
        Jason.encode!(%{error: "Some of the items are out of stock or have limited stock", items: errors})
      )
    else
      seller_ids = Enum.reduce shopping_cart, MapSet.new(), fn cart, acc ->
        MapSet.put(acc, cart.product.owner_id)
      end
      Enum.each Enum.to_list(seller_ids), fn seller_id ->
        order_items = Enum.reduce shopping_cart, Map.new(), fn cart, acc ->
          if cart.product.owner_id == seller_id do
            {display_name, display_img} = Enum.at(cart.product.images, 0)

            product = Products.get_product!(cart.product.id)
            options = product.options
            {quantity, ""} = Integer.parse(get_in(options, [cart.option_selected]))
            #Attribution https://dockyard.com/blog/2016/02/01/elixir-best-practices-deeply-nested-maps
            options = put_in(options, [cart.option_selected], Integer.to_string(quantity - cart.quantity))
            prd_attrs = %{}
            prd_attrs = Map.put(prd_attrs, "options", options)
            Products.update_product(product, prd_attrs)
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
    tracking = Orders.get_order!(order_id).tracking
    user = System.get_env("UPS_USER")
    url = System.get_env("UPS_URL")
    key = System.get_env("UPS_KEY")
    token = System.get_env("UPS_TOKEN")
    body = String.replace(System.get_env("REQUEST_BODY"),"#USERNAME","#{user}")
    body = String.replace(body,"#KEY","#{key}")
    body = String.replace(body,"#TOKEN","#{token}")
    body = String.replace(body,"#TRACKING","#{tracking}")
    headers = [{:"Access-Control-Allow-Methods", "POST"},{:"Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"},{:"Access-Control-Allow-Origin", "*"}]
    IO.puts("Making API Request")
#    response = HTTPoison.post!(url, Jason.encode!(Jason.decode!(body)), headers)
#    response = Jason.decode!(response.body)["TrackResponse"]["Shipment"]["Package"]["Activity"]
#        send_resp(conn, 200, Jason.encode!(%{tracking: response}))
    send_resp(conn, 200, Jason.encode!(%{tracking: "knkn"}))
  end

  def seller_metrics(conn, params) do
    status_metrics = Orders.compute_status_metrics(conn.assigns[:current_user].id)
    color_codes = %{1 => "SandyBrown", 2 => "AntiqueWhite", 3 => "Olive", 4 => "SteelBlue", 5 => "SpringGreen"}
    status_metrics = Enum.reduce status_metrics, [], fn metric, acc ->
      status = Statuses.get_status!(metric.label)
      color = color_codes[metric.label]
      acc ++ [%{label: status.title, angle: metric.angle, subLabel: "#{metric.angle} orders", color: "#{color}"}]
    end
    order_metrics = Orders.compute_order_metrics(conn.assigns[:current_user].id)
    send_resp(conn, 200, Jason.encode!(%{status_metrics: status_metrics, order_metrics: order_metrics}))
  end
end
