defmodule EshopR.Categories do
  @moduledoc """
  The Users context.
  """

  import Ecto.Query, warn: false
  alias EshopR.Repo

  alias EshopR.Categories.Category
  alias EshopR.Products.Product

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_categories do
    main_categories = Repo.all(from(c in Category, where: c.parent == 0))
    # https://stackoverflow.com/questions/29924170/elixir-looping-through-and-adding-to-map
    res = Enum.reduce main_categories, %{}, fn c, acc ->
      Map.put(acc, c.name,  %{id: c.id, sub: Repo.all(from(subc in Category, select: [subc.id, subc.name] , where: subc.parent == ^c.id))})
    end
    res
  end

  def get_products(id) do
    products = Repo.all(from(p in Product, where: p.sub_category == ^id))
    products
  end
end
