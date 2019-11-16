use Mix.Config

# Configure your database
config :eshop_r, EshopR.Repo,
  username: "eshopr",
  password: "ooVob2faiphe",
  database: "eshop_r_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :eshop_r, EshopRWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn
