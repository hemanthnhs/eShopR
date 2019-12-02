defmodule EshopR.Categories.Category do
  use Ecto.Schema
  import Ecto.Changeset

  schema "categories" do
    field :name, :string
    field :parent, :integer

    belongs_to :user, EshopR.Users.User
    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :parent, :user_id])
    |> validate_required([:name, :parent, :user_id])
  end
end
