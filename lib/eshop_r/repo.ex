defmodule EshopR.Repo do
  use Ecto.Repo,
    otp_app: :eshop_r,
    adapter: Ecto.Adapters.Postgres
end
