defmodule EshopR.ShoppingCarts do
  @moduledoc """
  The ShoppingCarts context.
  """

  import Ecto.Query, warn: false
  alias EshopR.Repo

  alias EshopR.ShoppingCarts.ShoppingCart

  @doc """
  Returns the list of shoppingcarts.

  ## Examples

      iex> list_shoppingcarts()
      [%ShoppingCart{}, ...]

  """
  def list_shoppingcarts do
    Repo.all(ShoppingCart)
  end

  @doc """
  Gets a single shopping_cart.

  Raises `Ecto.NoResultsError` if the Shopping cart does not exist.

  ## Examples

      iex> get_shopping_cart!(123)
      %ShoppingCart{}

      iex> get_shopping_cart!(456)
      ** (Ecto.NoResultsError)

  """
  def get_shopping_cart!(id), do: Repo.all(from(c in ShoppingCart, where: c.cartid == ^id, preload: [:product]))

  def get_shopping_cart_by_id!(id),
      do: Repo.get!(ShoppingCart, id)
          |> Repo.preload([:product])

  @doc """
  Creates a shopping_cart.

  ## Examples

      iex> create_shopping_cart(%{field: value})
      {:ok, %ShoppingCart{}}

      iex> create_shopping_cart(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_shopping_cart(attrs \\ %{}) do
    {:ok, shopping_cart} = %ShoppingCart{}
                           |> ShoppingCart.changeset(attrs)
                           |> Repo.insert()
    shopping_cart = shopping_cart
                    |> Repo.preload([:product])
    {:ok, shopping_cart}
  end

  @doc """
  Updates a shopping_cart.

  ## Examples

      iex> update_shopping_cart(shopping_cart, %{field: new_value})
      {:ok, %ShoppingCart{}}

      iex> update_shopping_cart(shopping_cart, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_shopping_cart(%ShoppingCart{} = shopping_cart, attrs) do
    shopping_cart
    |> ShoppingCart.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a ShoppingCart.

  ## Examples

      iex> delete_shopping_cart(shopping_cart)
      {:ok, %ShoppingCart{}}

      iex> delete_shopping_cart(shopping_cart)
      {:error, %Ecto.Changeset{}}

  """
  def delete_shopping_cart(%ShoppingCart{} = shopping_cart) do
    Repo.delete(shopping_cart)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking shopping_cart changes.

  ## Examples

      iex> change_shopping_cart(shopping_cart)
      %Ecto.Changeset{source: %ShoppingCart{}}

  """
  def change_shopping_cart(%ShoppingCart{} = shopping_cart) do
    ShoppingCart.changeset(shopping_cart, %{})
  end

  def check_if_exist(cartid, product_id, option_selected) do
    Repo.exists?(from(c in ShoppingCart, where: c.cartid == ^cartid and c.product_id == ^product_id and c.option_selected == ^option_selected))
  end

  def remove_items(id) do
    from(c in ShoppingCart, where: c.cartid == ^id) |> Repo.delete_all
  end
end
