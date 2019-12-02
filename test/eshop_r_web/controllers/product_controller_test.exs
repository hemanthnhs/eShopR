defmodule EshopRWeb.ProductControllerTest do
  use EshopRWeb.ConnCase

  alias EshopR.Products
  alias EshopR.Products.Product

  @create_attrs %{
    attributes: %{},
    catalogue: 42,
    description: "some description",
    filename: "some filename",
    marked_price: 120.5,
    name: "some name",
    selling_price: 120.5,
    tags: "some tags"
  }
  @update_attrs %{
    attributes: %{},
    catalogue: 43,
    description: "some updated description",
    filename: "some updated filename",
    marked_price: 456.7,
    name: "some updated name",
    selling_price: 456.7,
    tags: "some updated tags"
  }
  @invalid_attrs %{attributes: nil, catalogue: nil, description: nil, filename: nil, marked_price: nil, name: nil, selling_price: nil, tags: nil}

  def fixture(:product) do
    {:ok, product} = Products.create_product(@create_attrs)
    product
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all products", %{conn: conn} do
      conn = get(conn, Routes.product_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create product" do
    test "renders product when data is valid", %{conn: conn} do
      conn = post(conn, Routes.product_path(conn, :create), product: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.product_path(conn, :show, id))

      assert %{
               "id" => id,
               "attributes" => %{},
               "catalogue" => 42,
               "description" => "some description",
               "filename" => "some filename",
               "marked_price" => 120.5,
               "name" => "some name",
               "selling_price" => 120.5,
               "tags" => "some tags"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.product_path(conn, :create), product: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update product" do
    setup [:create_product]

    test "renders product when data is valid", %{conn: conn, product: %Product{id: id} = product} do
      conn = put(conn, Routes.product_path(conn, :update, product), product: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.product_path(conn, :show, id))

      assert %{
               "id" => id,
               "attributes" => {},
               "catalogue" => 43,
               "description" => "some updated description",
               "filename" => "some updated filename",
               "marked_price" => 456.7,
               "name" => "some updated name",
               "selling_price" => 456.7,
               "tags" => "some updated tags"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, product: product} do
      conn = put(conn, Routes.product_path(conn, :update, product), product: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete product" do
    setup [:create_product]

    test "deletes chosen product", %{conn: conn, product: product} do
      conn = delete(conn, Routes.product_path(conn, :delete, product))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.product_path(conn, :show, product))
      end
    end
  end

  defp create_product(_) do
    product = fixture(:product)
    {:ok, product: product}
  end
end
