defmodule EshopRWeb.StatusControllerTest do
  use EshopRWeb.ConnCase

  alias EshopR.Statuses
  alias EshopR.Statuses.Status

  @create_attrs %{
    title: "some title"
  }
  @update_attrs %{
    title: "some updated title"
  }
  @invalid_attrs %{title: nil}

  def fixture(:status) do
    {:ok, status} = Statuses.create_status(@create_attrs)
    status
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all statuses", %{conn: conn} do
      conn = get(conn, Routes.status_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create status" do
    test "renders status when data is valid", %{conn: conn} do
      conn = post(conn, Routes.status_path(conn, :create), status: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.status_path(conn, :show, id))

      assert %{
               "id" => id,
               "title" => "some title"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.status_path(conn, :create), status: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update status" do
    setup [:create_status]

    test "renders status when data is valid", %{conn: conn, status: %Status{id: id} = status} do
      conn = put(conn, Routes.status_path(conn, :update, status), status: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.status_path(conn, :show, id))

      assert %{
               "id" => id,
               "title" => "some updated title"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, status: status} do
      conn = put(conn, Routes.status_path(conn, :update, status), status: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete status" do
    setup [:create_status]

    test "deletes chosen status", %{conn: conn, status: status} do
      conn = delete(conn, Routes.status_path(conn, :delete, status))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.status_path(conn, :show, status))
      end
    end
  end

  defp create_status(_) do
    status = fixture(:status)
    {:ok, status: status}
  end
end
