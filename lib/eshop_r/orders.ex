defmodule EshopR.Orders do
  @moduledoc """
  The Orders context.
  """

  import Ecto.Query, warn: false
  alias EshopR.Repo

  alias EshopR.Orders.Order

  @doc """
  Returns the list of orders.

  ## Examples

      iex> list_orders()
      [%Order{}, ...]

  """
  def list_orders(id) do
    Repo.all(from(o in Order, where: o.buyer_id == ^id, preload: [:status, :address], order_by: {:desc, o.inserted_at}))
  end

  def sold_orders(id) do
    Repo.all(from(o in Order, where: o.seller_id == ^id, preload: [:status, :address], order_by: {:desc, o.inserted_at}))
  end

  def compute_status_metrics(id) do
    Repo.all(from(o in Order, where: o.seller_id == ^id, group_by: o.status_id,select: %{label: o.status_id, angle: count(o.status_id)}))
  end

  @doc "to_char function for formatting datetime as dd MON YYYY"
  defmacro to_char(field, format) do
#    Attribution: https://stackoverflow.com/questions/45520237/group-rows-by-day-week-month-till-date-in-elixir
    quote do
      fragment("to_char(?, ?)", unquote(field), unquote(format))
    end
  end

  def compute_order_metrics(id) do
    Repo.all(from(o in Order, where: o.seller_id == ^id, group_by: to_char(o.inserted_at, "dd Mon YYYY"),select: %{x: to_char(o.inserted_at, "dd Mon YYYY"), y: count(o.id)}))
  end

  @doc """
  Gets a single order.

  Raises `Ecto.NoResultsError` if the Order does not exist.

  ## Examples

      iex> get_order!(123)
      %Order{}

      iex> get_order!(456)
      ** (Ecto.NoResultsError)

  """
  def get_order!(id) do
    order = Repo.get!(Order, id)
    order = Repo.preload order, [:status, :address]
    order

  end

  @doc """
  Creates a order.

  ## Examples

      iex> create_order(%{field: value})
      {:ok, %Order{}}

      iex> create_order(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_order(attrs \\ %{}) do
    %Order{}
    |> Order.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a order.

  ## Examples

      iex> update_order(order, %{field: new_value})
      {:ok, %Order{}}

      iex> update_order(order, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_order(%Order{} = order, attrs) do
    order
    |> Order.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Order.

  ## Examples

      iex> delete_order(order)
      {:ok, %Order{}}

      iex> delete_order(order)
      {:error, %Ecto.Changeset{}}

  """
  def delete_order(%Order{} = order) do
    Repo.delete(order)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking order changes.

  ## Examples

      iex> change_order(order)
      %Ecto.Changeset{source: %Order{}}

  """
  def change_order(%Order{} = order) do
    Order.changeset(order, %{})
  end
end
