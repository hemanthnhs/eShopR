defmodule EshopR.AddressesTest do
  use EshopR.DataCase

  alias EshopR.Addresses

  describe "addresses" do
    alias EshopR.Addresses.Address

    @valid_attrs %{city: "some city", country: "some country", pincode: "some pincode", state: "some state", street: "some street"}
    @update_attrs %{city: "some updated city", country: "some updated country", pincode: "some updated pincode", state: "some updated state", street: "some updated street"}
    @invalid_attrs %{city: nil, country: nil, pincode: nil, state: nil, street: nil}

    def address_fixture(attrs \\ %{}) do
      {:ok, address} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Addresses.create_address()

      address
    end

    test "list_addresses/0 returns all addresses" do
      address = address_fixture()
      assert Addresses.list_addresses() == [address]
    end

    test "get_address!/1 returns the address with given id" do
      address = address_fixture()
      assert Addresses.get_address!(address.id) == address
    end

    test "create_address/1 with valid data creates a address" do
      assert {:ok, %Address{} = address} = Addresses.create_address(@valid_attrs)
      assert address.city == "some city"
      assert address.country == "some country"
      assert address.pincode == "some pincode"
      assert address.state == "some state"
      assert address.street == "some street"
    end

    test "create_address/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Addresses.create_address(@invalid_attrs)
    end

    test "update_address/2 with valid data updates the address" do
      address = address_fixture()
      assert {:ok, %Address{} = address} = Addresses.update_address(address, @update_attrs)
      assert address.city == "some updated city"
      assert address.country == "some updated country"
      assert address.pincode == "some updated pincode"
      assert address.state == "some updated state"
      assert address.street == "some updated street"
    end

    test "update_address/2 with invalid data returns error changeset" do
      address = address_fixture()
      assert {:error, %Ecto.Changeset{}} = Addresses.update_address(address, @invalid_attrs)
      assert address == Addresses.get_address!(address.id)
    end

    test "delete_address/1 deletes the address" do
      address = address_fixture()
      assert {:ok, %Address{}} = Addresses.delete_address(address)
      assert_raise Ecto.NoResultsError, fn -> Addresses.get_address!(address.id) end
    end

    test "change_address/1 returns a address changeset" do
      address = address_fixture()
      assert %Ecto.Changeset{} = Addresses.change_address(address)
    end
  end
end
