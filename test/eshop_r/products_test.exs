defmodule EshopR.ProductsTest do
  use EshopR.DataCase

  alias EshopR.Products

  describe "products" do
    alias EshopR.Products.Product

    @valid_attrs %{attributes: %{}, catalogue: 42, description: "some description", filename: "some filename", marked_price: 120.5, name: "some name", selling_price: 120.5, tags: "some tags"}
    @update_attrs %{attributes: %{}, catalogue: 43, description: "some updated description", filename: "some updated filename", marked_price: 456.7, name: "some updated name", selling_price: 456.7, tags: "some updated tags"}
    @invalid_attrs %{attributes: nil, catalogue: nil, description: nil, filename: nil, marked_price: nil, name: nil, selling_price: nil, tags: nil}

    def product_fixture(attrs \\ %{}) do
      {:ok, product} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Products.create_product()

      product
    end

    test "list_products/0 returns all products" do
      product = product_fixture()
      assert Products.list_products() == [product]
    end

    test "get_product!/1 returns the product with given id" do
      product = product_fixture()
      assert Products.get_product!(product.id) == product
    end

    test "create_product/1 with valid data creates a product" do
      assert {:ok, %Product{} = product} = Products.create_product(@valid_attrs)
      assert product.attributes == %{}
      assert product.catalogue == 42
      assert product.description == "some description"
      assert product.filename == "some filename"
      assert product.marked_price == 120.5
      assert product.name == "some name"
      assert product.selling_price == 120.5
      assert product.tags == "some tags"
    end

    test "create_product/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Products.create_product(@invalid_attrs)
    end

    test "update_product/2 with valid data updates the product" do
      product = product_fixture()
      assert {:ok, %Product{} = product} = Products.update_product(product, @update_attrs)
      assert product.attributes == %{}
      assert product.catalogue == 43
      assert product.description == "some updated description"
      assert product.filename == "some updated filename"
      assert product.marked_price == 456.7
      assert product.name == "some updated name"
      assert product.selling_price == 456.7
      assert product.tags == "some updated tags"
    end

    test "update_product/2 with invalid data returns error changeset" do
      product = product_fixture()
      assert {:error, %Ecto.Changeset{}} = Products.update_product(product, @invalid_attrs)
      assert product == Products.get_product!(product.id)
    end

    test "delete_product/1 deletes the product" do
      product = product_fixture()
      assert {:ok, %Product{}} = Products.delete_product(product)
      assert_raise Ecto.NoResultsError, fn -> Products.get_product!(product.id) end
    end

    test "change_product/1 returns a product changeset" do
      product = product_fixture()
      assert %Ecto.Changeset{} = Products.change_product(product)
    end
  end
end
