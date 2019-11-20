defmodule EshopR.ShoppingCartsTest do
  use EshopR.DataCase

  alias EshopR.ShoppingCarts

  describe "shoppingcarts" do
    alias EshopR.ShoppingCarts.ShoppingCart

    @valid_attrs %{option_selected: "some option_selected", quantity: 42}
    @update_attrs %{option_selected: "some updated option_selected", quantity: 43}
    @invalid_attrs %{option_selected: nil, quantity: nil}

    def shopping_cart_fixture(attrs \\ %{}) do
      {:ok, shopping_cart} =
        attrs
        |> Enum.into(@valid_attrs)
        |> ShoppingCarts.create_shopping_cart()

      shopping_cart
    end

    test "list_shoppingcarts/0 returns all shoppingcarts" do
      shopping_cart = shopping_cart_fixture()
      assert ShoppingCarts.list_shoppingcarts() == [shopping_cart]
    end

    test "get_shopping_cart!/1 returns the shopping_cart with given id" do
      shopping_cart = shopping_cart_fixture()
      assert ShoppingCarts.get_shopping_cart!(shopping_cart.id) == shopping_cart
    end

    test "create_shopping_cart/1 with valid data creates a shopping_cart" do
      assert {:ok, %ShoppingCart{} = shopping_cart} = ShoppingCarts.create_shopping_cart(@valid_attrs)
      assert shopping_cart.option_selected == "some option_selected"
      assert shopping_cart.quantity == 42
    end

    test "create_shopping_cart/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = ShoppingCarts.create_shopping_cart(@invalid_attrs)
    end

    test "update_shopping_cart/2 with valid data updates the shopping_cart" do
      shopping_cart = shopping_cart_fixture()
      assert {:ok, %ShoppingCart{} = shopping_cart} = ShoppingCarts.update_shopping_cart(shopping_cart, @update_attrs)
      assert shopping_cart.option_selected == "some updated option_selected"
      assert shopping_cart.quantity == 43
    end

    test "update_shopping_cart/2 with invalid data returns error changeset" do
      shopping_cart = shopping_cart_fixture()
      assert {:error, %Ecto.Changeset{}} = ShoppingCarts.update_shopping_cart(shopping_cart, @invalid_attrs)
      assert shopping_cart == ShoppingCarts.get_shopping_cart!(shopping_cart.id)
    end

    test "delete_shopping_cart/1 deletes the shopping_cart" do
      shopping_cart = shopping_cart_fixture()
      assert {:ok, %ShoppingCart{}} = ShoppingCarts.delete_shopping_cart(shopping_cart)
      assert_raise Ecto.NoResultsError, fn -> ShoppingCarts.get_shopping_cart!(shopping_cart.id) end
    end

    test "change_shopping_cart/1 returns a shopping_cart changeset" do
      shopping_cart = shopping_cart_fixture()
      assert %Ecto.Changeset{} = ShoppingCarts.change_shopping_cart(shopping_cart)
    end
  end
end
