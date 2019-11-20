defmodule EshopR.Orders.Order do
  use Ecto.Schema
  import Ecto.Changeset

  schema "orders" do
    field :payment_total, :float
    field :tracking, :string
    field :buyer_id, :id
    field :seller_id, :id
    field :status, :id
    field :address, :id

    timestamps()
  end

  @doc false
  def changeset(order, attrs) do
    order
    |> cast(attrs, [:tracking, :payment_total])
    |> validate_required([:tracking, :payment_total])
  end
end
