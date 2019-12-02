defmodule EshopRWeb.AddressView do
  use EshopRWeb, :view
  alias EshopRWeb.AddressView

  def render("index.json", %{addresses: addresses}) do
    %{data: render_many(addresses, AddressView, "address.json")}
  end

  def render("show.json", %{address: address}) do
    %{data: render_one(address, AddressView, "address.json")}
  end

  def render("address.json", %{address: address}) do
    %{id: address.id,
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
      pincode: address.pincode,
      full_name: address.full_name
    }
  end
end
