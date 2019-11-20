defmodule EshopRWeb.StatusController do
  use EshopRWeb, :controller

  alias EshopR.Statuses
  alias EshopR.Statuses.Status

  action_fallback EshopRWeb.FallbackController

  def index(conn, _params) do
    statuses = Statuses.list_statuses()
    render(conn, "index.json", statuses: statuses)
  end

  def create(conn, %{"status" => status_params}) do
    with {:ok, %Status{} = status} <- Statuses.create_status(status_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.status_path(conn, :show, status))
      |> render("show.json", status: status)
    end
  end

  def show(conn, %{"id" => id}) do
    status = Statuses.get_status!(id)
    render(conn, "show.json", status: status)
  end

  def update(conn, %{"id" => id, "status" => status_params}) do
    status = Statuses.get_status!(id)

    with {:ok, %Status{} = status} <- Statuses.update_status(status, status_params) do
      render(conn, "show.json", status: status)
    end
  end

  def delete(conn, %{"id" => id}) do
    status = Statuses.get_status!(id)

    with {:ok, %Status{}} <- Statuses.delete_status(status) do
      send_resp(conn, :no_content, "")
    end
  end
end
