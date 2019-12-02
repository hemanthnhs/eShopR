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
end
