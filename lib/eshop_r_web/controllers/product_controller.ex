defmodule EshopRWeb.ProductController do
  use EshopRWeb, :controller

  alias EshopR.Products
  alias EshopR.Products.Product

  action_fallback EshopRWeb.FallbackController

  plug EshopRWeb.Plugs.RequireAuth when action in [:create, :index]

  def index(conn, _params) do
    products = Products.list_products(conn.assigns[:current_user].id)
    render(conn, "index.json", products: products)
  end

  def create(conn, %{"data" => product_params}) do
    product_params = Map.put(product_params, "owner_id", conn.assigns[:current_user].id)

    with {:ok, %Product{} = product} <- Products.create_product(product_params) do
      Elasticsearch.put_document(EshopR.ElasticsearchCluster, product, "products")
      send_resp(
        conn,
        200,
        Jason.encode!(%{success: "Product creation successful"})
      )
    end
  end

  def show(conn, %{"id" => id}) do
    product = Products.get_product!(id)
    render(conn, "show.json", product: product)
  end

  def search(conn, %{"query" => query}) do
    url = "/products/_search?q=" <> query
    with {:ok, results} <- Elasticsearch.post(EshopR.ElasticsearchCluster, url, '{"q": "dhb" }') do
      hits = results["hits"]["hits"]
      hit_ids = Enum.reduce hits, [], fn hit, acc ->
        Enum.into(acc, [hit["_id"]])
      end
      products = Products.get_products(hit_ids)
      render(conn, "index.json", products: products)
    end
    send_resp(
      conn,
      200,
      Jason.encode!(%{error: "Something went wrong try again"})
    )
  end

  def update(conn, %{"id" => id, "product" => product_params}) do
    product = Products.get_product!(id)

    with {:ok, %Product{} = product} <- Products.update_product(product, product_params) do
      render(conn, "show.json", product: product)
    end
  end
end
