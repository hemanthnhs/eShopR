defmodule EshopRWeb.AdminConfigControllerTest do
  use EshopRWeb.ConnCase

  alias EshopR.AdminConfigs
  alias EshopR.AdminConfigs.AdminConfig

  @create_attrs %{
    key: "some key",
    value: "some value"
  }
  @update_attrs %{
    key: "some updated key",
    value: "some updated value"
  }
  @invalid_attrs %{key: nil, value: nil}

  def fixture(:admin_config) do
    {:ok, admin_config} = AdminConfigs.create_admin_config(@create_attrs)
    admin_config
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all adminconfigs", %{conn: conn} do
      conn = get(conn, Routes.admin_config_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create admin_config" do
    test "renders admin_config when data is valid", %{conn: conn} do
      conn = post(conn, Routes.admin_config_path(conn, :create), admin_config: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.admin_config_path(conn, :show, id))

      assert %{
               "id" => id,
               "key" => "some key",
               "value" => "some value"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.admin_config_path(conn, :create), admin_config: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update admin_config" do
    setup [:create_admin_config]

    test "renders admin_config when data is valid", %{conn: conn, admin_config: %AdminConfig{id: id} = admin_config} do
      conn = put(conn, Routes.admin_config_path(conn, :update, admin_config), admin_config: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.admin_config_path(conn, :show, id))

      assert %{
               "id" => id,
               "key" => "some updated key",
               "value" => "some updated value"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, admin_config: admin_config} do
      conn = put(conn, Routes.admin_config_path(conn, :update, admin_config), admin_config: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete admin_config" do
    setup [:create_admin_config]

    test "deletes chosen admin_config", %{conn: conn, admin_config: admin_config} do
      conn = delete(conn, Routes.admin_config_path(conn, :delete, admin_config))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.admin_config_path(conn, :show, admin_config))
      end
    end
  end

  defp create_admin_config(_) do
    admin_config = fixture(:admin_config)
    {:ok, admin_config: admin_config}
  end
end
