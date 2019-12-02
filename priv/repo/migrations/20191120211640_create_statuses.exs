defmodule EshopR.Repo.Migrations.CreateStatuses do
  use Ecto.Migration

  def change do
    create table(:statuses) do
      add :title, :string

      timestamps()
    end

  end
end
