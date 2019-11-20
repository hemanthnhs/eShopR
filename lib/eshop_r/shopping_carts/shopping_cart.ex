defmodule EshopR.ShoppingCarts.ShoppingCart do
  use Ecto.Schema
  import Ecto.Changeset

  schema "shoppingcarts" do
    field :option_selected, :string
    field :quantity, :integer
    field :cartid, :id

    belongs_to :product, EshopR.Products.Product

    timestamps()
  end

  @doc false
  def changeset(shopping_cart, attrs) do
    shopping_cart
    |> cast(attrs, [:option_selected, :quantity, :product_id, :cartid])
    |> validate_required([:option_selected, :quantity])
  end
end
