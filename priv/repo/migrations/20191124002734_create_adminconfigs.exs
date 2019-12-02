defmodule EshopR.Repo.Migrations.CreateAdminconfigs do
  use Ecto.Migration

  def change do
    create table(:adminconfigs, primary_key: false) do
      add :key, :string, primary_key: true
      add :value, :text

      timestamps()
    end

  end
end
