defmodule EshopR.AdminConfigs do
  @moduledoc """
  The AdminConfigs context.
  """

  import Ecto.Query, warn: false
  alias EshopR.Repo

  alias EshopR.AdminConfigs.AdminConfig

  @doc """
  Returns the list of adminconfigs.

  ## Examples

      iex> list_adminconfigs()
      [%AdminConfig{}, ...]

  """
  def list_adminconfigs do
    Repo.all(AdminConfig)
  end

  @doc """
  Gets a single admin_config.

  Raises `Ecto.NoResultsError` if the Admin config does not exist.

  ## Examples

      iex> get_admin_config!(123)
      %AdminConfig{}

      iex> get_admin_config!(456)
      ** (Ecto.NoResultsError)

  """
  def get_admin_config!(id), do: Repo.get!(AdminConfig, id)

  @doc """
  Creates a admin_config.

  ## Examples

      iex> create_admin_config(%{field: value})
      {:ok, %AdminConfig{}}

      iex> create_admin_config(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_admin_config(attrs \\ %{}) do
    %AdminConfig{}
    |> AdminConfig.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a admin_config.

  ## Examples

      iex> update_admin_config(admin_config, %{field: new_value})
      {:ok, %AdminConfig{}}

      iex> update_admin_config(admin_config, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_admin_config(%AdminConfig{} = admin_config, attrs) do
    admin_config
    |> AdminConfig.changeset(attrs)
    |> Repo.update()
  end


  @doc """
  Returns an `%Ecto.Changeset{}` for tracking admin_config changes.

  ## Examples

      iex> change_admin_config(admin_config)
      %Ecto.Changeset{source: %AdminConfig{}}

  """
  def change_admin_config(%AdminConfig{} = admin_config) do
    AdminConfig.changeset(admin_config, %{})
  end
end
