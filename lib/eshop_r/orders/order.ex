defmodule EshopR.Orders.Order do
  use Ecto.Schema
  import Ecto.Changeset

  schema "orders" do
    field :tracking, :string, default: ""
    field :address_id, :id
    field :order_items, :map

    belongs_to :status, EshopR.Statuses.Status
    belongs_to :buyer, EshopR.Users.User
    belongs_to :seller, EshopR.Users.User
    timestamps()
  end

  @doc false
  def changeset(order, attrs) do
    order
    |> cast(attrs, [:tracking, :order_items, :buyer_id, :seller_id, :status_id])
  end
end
