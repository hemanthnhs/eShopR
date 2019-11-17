defmodule EshopR.Repo.Migrations.CreateProducts do
  use Ecto.Migration

  def change do
    create table(:products) do
      add :name, :string
      add :description, :text
      add :images, {:array, :string}
      add :attributes, :map
      add :tags, :text
      add :catalogue, :integer
      add :marked_price, :float
      add :selling_price, :float
      add :sub_category, references(:categories, on_delete: :nothing)
      add :main_category, references(:categories, on_delete: :nothing)
      add :owner_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:products, [:sub_category])
    create index(:products, [:main_category])
    create index(:products, [:owner_id])
  end
end
