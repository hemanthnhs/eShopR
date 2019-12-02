defmodule EshopRWeb.ShoppingCartControllerTest do
  use EshopRWeb.ConnCase

  alias EshopR.ShoppingCarts
  alias EshopR.ShoppingCarts.ShoppingCart

  @create_attrs %{
    option_selected: "some option_selected",
    quantity: 42
  }
  @update_attrs %{
    option_selected: "some updated option_selected",
    quantity: 43
  }
  @invalid_attrs %{option_selected: nil, quantity: nil}

  def fixture(:shopping_cart) do
    {:ok, shopping_cart} = ShoppingCarts.create_shopping_cart(@create_attrs)
    shopping_cart
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all shoppingcarts", %{conn: conn} do
      conn = get(conn, Routes.shopping_cart_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create shopping_cart" do
    test "renders shopping_cart when data is valid", %{conn: conn} do
      conn = post(conn, Routes.shopping_cart_path(conn, :create), shopping_cart: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.shopping_cart_path(conn, :show, id))

      assert %{
               "id" => id,
               "option_selected" => "some option_selected",
               "quantity" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.shopping_cart_path(conn, :create), shopping_cart: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update shopping_cart" do
    setup [:create_shopping_cart]

    test "renders shopping_cart when data is valid", %{conn: conn, shopping_cart: %ShoppingCart{id: id} = shopping_cart} do
      conn = put(conn, Routes.shopping_cart_path(conn, :update, shopping_cart), shopping_cart: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.shopping_cart_path(conn, :show, id))

      assert %{
               "id" => id,
               "option_selected" => "some updated option_selected",
               "quantity" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, shopping_cart: shopping_cart} do
      conn = put(conn, Routes.shopping_cart_path(conn, :update, shopping_cart), shopping_cart: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete shopping_cart" do
    setup [:create_shopping_cart]

    test "deletes chosen shopping_cart", %{conn: conn, shopping_cart: shopping_cart} do
      conn = delete(conn, Routes.shopping_cart_path(conn, :delete, shopping_cart))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.shopping_cart_path(conn, :show, shopping_cart))
      end
    end
  end

  defp create_shopping_cart(_) do
    shopping_cart = fixture(:shopping_cart)
    {:ok, shopping_cart: shopping_cart}
  end
end
