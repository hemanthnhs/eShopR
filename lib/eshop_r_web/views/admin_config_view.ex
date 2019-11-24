defmodule EshopRWeb.AdminConfigView do
  use EshopRWeb, :view
  alias EshopRWeb.AdminConfigView

  def render("index.json", %{adminconfigs: adminconfigs}) do
    %{data: render_many(adminconfigs, AdminConfigView, "admin_config.json")}
  end

  def render("show.json", %{admin_config: admin_config}) do
    %{data: render_one(admin_config, AdminConfigView, "admin_config.json")}
  end

  def render("admin_config.json", %{admin_config: admin_config}) do
    %{key: admin_config.key,
      value: admin_config.value}
  end
end
