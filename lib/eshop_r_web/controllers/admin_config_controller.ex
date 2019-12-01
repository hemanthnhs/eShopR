defmodule EshopRWeb.AdminConfigController do
  use EshopRWeb, :controller

  alias EshopR.AdminConfigs
  alias EshopR.AdminConfigs.AdminConfig

  action_fallback EshopRWeb.FallbackController

  plug EshopRWeb.Plugs.RequireAuth when action in [:create]

  def index(conn, _params) do
    adminconfigs = AdminConfigs.list_adminconfigs()
    render(conn, "index.json", adminconfigs: adminconfigs)
  end

  def create(conn, admin_config_params) do
    try do
      admin_config = AdminConfigs.get_admin_config!("LANDING_PAGE")
      update(conn, %{"id"=>"LANDING_PAGE", "admin_config"=>admin_config_params})
    rescue
      Ecto.NoResultsError ->
        {:not_found, "No result found"}
      with {:ok, %AdminConfig{} = admin_config} <- AdminConfigs.create_admin_config(admin_config_params) do
        send_resp(conn, 200, json(conn, %{success: "Config created"}))
    end

    end

  end

  def show(conn, %{"id" => id}) do
    try do
      admin_config = AdminConfigs.get_admin_config!(id)
      render(conn, "show.json", admin_config: admin_config)
    rescue
      Ecto.NoResultsError ->
        send_resp(
        conn,
        200,
        Jason.encode!(%{error: "Landing Page not configured"})
      )
    end
    end

  def update(conn, %{"id" => id, "admin_config" => admin_config_params}) do
    admin_config = AdminConfigs.get_admin_config!(id)
    with {:ok, %AdminConfig{} = admin_config} <- AdminConfigs.update_admin_config(admin_config, admin_config_params) do
      render(conn, "show.json", admin_config: admin_config)
    end
  end

  def delete(conn, %{"id" => id}) do
    admin_config = AdminConfigs.get_admin_config!(id)

    with {:ok, %AdminConfig{}} <- AdminConfigs.delete_admin_config(admin_config) do
      send_resp(conn, :no_content, "")
    end
  end
end
