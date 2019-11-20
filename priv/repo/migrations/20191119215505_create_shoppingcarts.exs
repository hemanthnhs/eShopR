defmodule EshopR.Repo.Migrations.CreateShoppingcarts do
  use Ecto.Migration

  def change do
    create table(:shoppingcarts) do
      add :option_selected, :string
      add :quantity, :integer
      add :cartid, references(:users, on_delete: :nothing)
      add :product_id, references(:products, on_delete: :nothing)

      timestamps()
    end

    create index(:shoppingcarts, [:cartid])
    create index(:shoppingcarts, [:product_id])
  end
end
