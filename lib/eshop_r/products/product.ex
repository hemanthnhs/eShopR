defmodule EshopR.Products.Product do
  use Ecto.Schema
  import Ecto.Changeset

  schema "products" do
    field :attributes, {:array, :map}
    field :options, :map
    field :description, :string
    field :images, :map
    field :marked_price, :float
    field :name, :string
    field :brand, :string
    field :selling_price, :float
    field :tags, :string
    field :sub_category, :id
    field :main_category, :id
    field :owner_id, :id

    timestamps()
  end

  @doc false
  def changeset(product, attrs) do
    product
    |> cast(attrs, [:name, :description, :images, :attributes, :tags, :options, :marked_price, :selling_price, :main_category, :sub_category])
#    |> validate_required([:name, :description, :images, :attributes, :tags, :catalogue, :marked_price, :selling_price])
  end
end
