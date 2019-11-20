defmodule EshopR.Repo.Migrations.CreateOrders do
  use Ecto.Migration

  def change do
    create table(:orders) do
      add :tracking, :string
      add :payment_total, :float
      add :buyer_id, references(:users, on_delete: :nothing)
      add :seller_id, references(:users, on_delete: :nothing)
      add :status, references(:statuses, on_delete: :nothing)
      add :address, references(:addresses, on_delete: :nothing)

      timestamps()
    end

    create index(:orders, [:buyer_id])
    create index(:orders, [:seller_id])
    create index(:orders, [:status])
    create index(:orders, [:address])
  end
end
