defmodule EshopRWeb.ProductView do
  use EshopRWeb, :view
  alias EshopRWeb.ProductView

  def render("index.json", %{products: products}) do
    %{data: render_many(products, ProductView, "product.json")}
  end

  def render("show.json", %{product: product}) do
    %{data: render_one(product, ProductView, "product.json")}
  end

  def render("product.json", %{product: product}) do
    %{id: product.id,
      name: product.name,
      brand: product.brand,
      description: product.description,
      images: product.images,
      attributes: product.attributes,
      tags: product.tags,
      options: product.options,
      marked_price: product.marked_price,
      selling_price: product.selling_price}
  end
end
