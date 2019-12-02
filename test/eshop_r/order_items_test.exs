defmodule EshopR.OrderItemsTest do
  use EshopR.DataCase

  alias EshopR.OrderItems

  describe "orderitems" do
    alias EshopR.OrderItems.OrderItem

    @valid_attrs %{option_selected: "some option_selected", quantity: 42}
    @update_attrs %{option_selected: "some updated option_selected", quantity: 43}
    @invalid_attrs %{option_selected: nil, quantity: nil}

    def order_item_fixture(attrs \\ %{}) do
      {:ok, order_item} =
        attrs
        |> Enum.into(@valid_attrs)
        |> OrderItems.create_order_item()

      order_item
    end

    test "list_orderitems/0 returns all orderitems" do
      order_item = order_item_fixture()
      assert OrderItems.list_orderitems() == [order_item]
    end

    test "get_order_item!/1 returns the order_item with given id" do
      order_item = order_item_fixture()
      assert OrderItems.get_order_item!(order_item.id) == order_item
    end

    test "create_order_item/1 with valid data creates a order_item" do
      assert {:ok, %OrderItem{} = order_item} = OrderItems.create_order_item(@valid_attrs)
      assert order_item.option_selected == "some option_selected"
      assert order_item.quantity == 42
    end

    test "create_order_item/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = OrderItems.create_order_item(@invalid_attrs)
    end

    test "update_order_item/2 with valid data updates the order_item" do
      order_item = order_item_fixture()
      assert {:ok, %OrderItem{} = order_item} = OrderItems.update_order_item(order_item, @update_attrs)
      assert order_item.option_selected == "some updated option_selected"
      assert order_item.quantity == 43
    end

    test "update_order_item/2 with invalid data returns error changeset" do
      order_item = order_item_fixture()
      assert {:error, %Ecto.Changeset{}} = OrderItems.update_order_item(order_item, @invalid_attrs)
      assert order_item == OrderItems.get_order_item!(order_item.id)
    end

    test "delete_order_item/1 deletes the order_item" do
      order_item = order_item_fixture()
      assert {:ok, %OrderItem{}} = OrderItems.delete_order_item(order_item)
      assert_raise Ecto.NoResultsError, fn -> OrderItems.get_order_item!(order_item.id) end
    end

    test "change_order_item/1 returns a order_item changeset" do
      order_item = order_item_fixture()
      assert %Ecto.Changeset{} = OrderItems.change_order_item(order_item)
    end
  end
end
