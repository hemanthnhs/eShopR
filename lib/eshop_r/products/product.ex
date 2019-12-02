defmodule EshopR.Products.Product do
  use Ecto.Schema
  import Ecto.Changeset

  schema "products" do
    field :attributes, {:array, :map}
    field :options, :map
    field :description, :string
    field :highlights, :string
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
#    Attribution https://elixirforum.com/t/validate-number-comparing-two-fields/9589/2
    product
    |> cast(attrs, [:name, :brand, :description, :highlights, :images, :attributes, :tags, :options, :owner_id, :marked_price, :selling_price, :main_category, :sub_category])
    |> validate_required([:name, :brand, :images, :main_category, :sub_category , :attributes, :options, :marked_price, :selling_price])
    |> validate_number(:marked_price, greater_than: 0)
    |> validate_number(:selling_price, greater_than: 0)
  end
end
