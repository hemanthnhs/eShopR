defmodule EshopR.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string
      add :password_hash, :string
      add :firstname, :string
      add :lastname, :string
      add :type, :integer

      timestamps()
    end

  end
end
