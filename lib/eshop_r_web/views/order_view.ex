defmodule EshopRWeb.OrderView do
  use EshopRWeb, :view
  alias EshopRWeb.OrderView
  alias EshopRWeb.AddressView

  def render("index.json", %{orders: orders}) do
    %{data: render_many(orders, OrderView, "order.json")}
  end

  def render("show.json", %{order: order}) do
    %{data: render_one(order, OrderView, "order.json")}
  end

  def render("order.json", %{order: order}) do
    %{id: order.id,
      tracking: order.tracking,
      status_id: order.status.id,
      address: render_one(order.address, AddressView, "address.json"),
      status: order.status.title,
      inserted_at: order.inserted_at,
      updated_at: order.updated_at,
      order_items: order.order_items}
  end

end
