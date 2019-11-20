defmodule EshopR.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :firstname, :string
    field :lastname, :string
    field :password_hash, :string
    field :type, :integer
    field :wallet, :float

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password_hash, :firstname, :lastname, :type, :wallet])
    |> validate_required([:email, :password_hash, :firstname, :lastname, :type])
  end
end
