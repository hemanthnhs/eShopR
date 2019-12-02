defmodule EshopR.Repo.Migrations.CreateProducts do
  use Ecto.Migration

  def change do
    create table(:products) do
      add :name, :string, null: false
      add :brand, :string, default: ""
      add :description, :string
      add :highlights, :string
      add :images, :map
      add :attributes, {:array, :map}
      add :tags, :text
      add :options, :map
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
