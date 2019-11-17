# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :eshop_r,
       ecto_repos: [EshopR.Repo]

config :eshop_r,
       Google,
       client_id: System.get_env("GOOGLE_CLIENT_ID"),
       client_secret: System.get_env("GOOGLE_CLIENT_SECRET"),
       redirect_uri: System.get_env("GOOGLE_REDIRECT_URI")

# Configures the endpoint
config :eshop_r,
       EshopRWeb.Endpoint,
       url: [
         host: "localhost"
       ],
       secret_key_base: "ISznEjXpbcCJeattQ4s0Ul8S9uv0/QS1KdNToyZaONUSKDAlp/CIyYRvE0XGpe9c",
       render_errors: [
         view: EshopRWeb.ErrorView,
         accepts: ~w(html json)
       ],
       pubsub: [
         name: EshopR.PubSub,
         adapter: Phoenix.PubSub.PG2
       ]

# Configures Elixir's Logger
config :logger,
       :console,
       format: "$time $metadata[$level] $message\n",
       metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
