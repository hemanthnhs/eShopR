defmodule EshopR.Repo.Migrations.CreateOrders do
  use Ecto.Migration

  def change do
    create table(:orders) do
      add :tracking, :string
      add :order_items, :map
      add :order_total, :float
      add :buyer_id, references(:users, on_delete: :nothing)
      add :seller_id, references(:users, on_delete: :nothing)
      add :status_id, references(:statuses, on_delete: :nothing)
      add :address_id, references(:addresses, on_delete: :nothing)

      timestamps()
    end

    create index(:orders, [:buyer_id])
    create index(:orders, [:seller_id])
    create index(:orders, [:status_id])
    create index(:orders, [:address_id])
  end
end
