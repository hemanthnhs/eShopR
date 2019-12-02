defmodule EshopR.Repo.Migrations.CreateAddresses do
  use Ecto.Migration

  def change do
    create table(:addresses) do
      add :street, :text
      add :city, :string
      add :state, :string
      add :country, :string
      add :pincode, :string
      add :full_name, :string
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:addresses, [:user_id])
  end
end
