defimpl Elasticsearch.Document, for: EshopR.Products.Product do
  def id(product), do: product.id
  def routing(_), do: false
  def encode(product) do
    %{
      id: product.id,
      brand: product.brand,
      name: product.name,
      tags: product.tags,
      description: product.description
    }
  end
end