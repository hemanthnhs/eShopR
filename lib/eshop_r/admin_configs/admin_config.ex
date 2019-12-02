defmodule EshopR.AdminConfigs.AdminConfig do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key false
  schema "adminconfigs" do
    field :key, :string, primary_key: true
    field :value, :string

    timestamps()
  end

  @doc false
  def changeset(admin_config, attrs) do
    admin_config
    |> cast(attrs, [:key, :value])
    |> validate_required([:key, :value])
  end
end
