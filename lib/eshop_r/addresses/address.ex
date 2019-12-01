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
    field :full_name, :string

    timestamps()
  end

  @doc false
  def changeset(address, attrs) do
    address
    |> cast(attrs, [:street, :city, :state, :country, :pincode, :full_name, :user_id])
    |> validate_required([:street, :city, :state, :country, :pincode, :full_name])
  end
end
