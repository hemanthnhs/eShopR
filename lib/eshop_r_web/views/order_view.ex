defmodule EshopRWeb.OrderView do
  use EshopRWeb, :view
  alias EshopRWeb.OrderView

  def render("index.json", %{orders: orders}) do
    %{data: render_many(orders, OrderView, "order.json")}
  end

  def render("show.json", %{order: order}) do
    %{data: render_one(order, OrderView, "order.json")}
  end

  def render("order.json", %{order: order}) do
    %{id: order.id,
      tracking: order.tracking,
      payment_total: order.payment_total}
  end
end
