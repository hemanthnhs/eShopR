defmodule EshopRWeb.AddressController do
  use EshopRWeb, :controller

  alias EshopR.Addresses
  alias EshopR.Addresses.Address

  action_fallback EshopRWeb.FallbackController

  plug EshopRWeb.Plugs.RequireAuth when action in [:create, :index]

  def index(conn, _params) do
    addresses = Addresses.list_addresses(conn.assigns[:current_user].id)
    render(conn, "index.json", addresses: addresses)
  end

  def create(conn, %{"data" => address_params}) do
    address_params = Map.put(address_params, "user_id", conn.assigns[:current_user].id)
    with {:ok, %Address{} = address} <- Addresses.create_address(address_params) do
       send_resp(
       conn,
       200,
       Jason.encode!(%{success: "Address added successfully"}))
    end
  end

  def show(conn, %{"id" => id}) do
    address = Addresses.get_address!(id)
    render(conn, "show.json", address: address)
  end
end
