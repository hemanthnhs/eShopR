defmodule EshopR.Addresses.Address do
  use Ecto.Schema
  import Ecto.Changeset

  schema "addresses" do
    field :city, :string
    field :country, :string
    field :pincode, :string
    field :state, :string
    field :street, :string
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(address, attrs) do
    address
    |> cast(attrs, [:street, :city, :state, :country, :pincode])
    |> validate_required([:street, :city, :state, :country, :pincode])
  end
end
