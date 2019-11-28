defmodule EshopRWeb.AddressController do
  use EshopRWeb, :controller

  alias EshopR.Addresses
  alias EshopR.Addresses.Address

  action_fallback EshopRWeb.FallbackController

  plug EshopRWeb.Plugs.RequireAuth when action in [:create, :index]

  def index(conn, _params) do
    addresses = Addresses.list_addresses()
    IO.puts("index")
    IO.inspect(addresses)
    render(conn, "index.json", addresses: addresses)
  end

  def create(conn, %{"data" => address_params}) do
    IO.puts("create")
    IO.inspect(address_params)
    address_params = Map.put(address_params, "user_id", conn.assigns[:current_user].id)
    IO.inspect(address_params)
    with {:ok, %Address{} = address} <- Addresses.create_address(address_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.address_path(conn, :show, address))
      |> render("show.json", address: address)
    end
  end

  def show(conn, %{"id" => id}) do
    address = Addresses.get_address!(id)
    render(conn, "show.json", address: address)
  end

  def update(conn, %{"id" => id, "address" => address_params}) do
    address = Addresses.get_address!(id)

    with {:ok, %Address{} = address} <- Addresses.update_address(address, address_params) do
      render(conn, "show.json", address: address)
    end
  end

  def delete(conn, %{"id" => id}) do
    address = Addresses.get_address!(id)

    with {:ok, %Address{}} <- Addresses.delete_address(address) do
      send_resp(conn, :no_content, "")
    end
  end
end
