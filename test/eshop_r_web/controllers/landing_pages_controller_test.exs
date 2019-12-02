defmodule EshopRWeb.LandingPagesControllerTest do
  use EshopRWeb.ConnCase

  alias EshopR.LandingPage
  alias EshopR.LandingPage.LandingPages

  @create_attrs %{
    banner_img: "some banner_img",
    height: 42,
    navigate_to: "some navigate_to",
    width: 42
  }
  @update_attrs %{
    banner_img: "some updated banner_img",
    height: 43,
    navigate_to: "some updated navigate_to",
    width: 43
  }
  @invalid_attrs %{banner_img: nil, height: nil, navigate_to: nil, width: nil}

  def fixture(:landing_pages) do
    {:ok, landing_pages} = LandingPage.create_landing_pages(@create_attrs)
    landing_pages
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all landingpage", %{conn: conn} do
      conn = get(conn, Routes.landing_pages_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create landing_pages" do
    test "renders landing_pages when data is valid", %{conn: conn} do
      conn = post(conn, Routes.landing_pages_path(conn, :create), landing_pages: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.landing_pages_path(conn, :show, id))

      assert %{
               "id" => id,
               "banner_img" => "some banner_img",
               "height" => 42,
               "navigate_to" => "some navigate_to",
               "width" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.landing_pages_path(conn, :create), landing_pages: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update landing_pages" do
    setup [:create_landing_pages]

    test "renders landing_pages when data is valid", %{conn: conn, landing_pages: %LandingPages{id: id} = landing_pages} do
      conn = put(conn, Routes.landing_pages_path(conn, :update, landing_pages), landing_pages: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.landing_pages_path(conn, :show, id))

      assert %{
               "id" => id,
               "banner_img" => "some updated banner_img",
               "height" => 43,
               "navigate_to" => "some updated navigate_to",
               "width" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, landing_pages: landing_pages} do
      conn = put(conn, Routes.landing_pages_path(conn, :update, landing_pages), landing_pages: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete landing_pages" do
    setup [:create_landing_pages]

    test "deletes chosen landing_pages", %{conn: conn, landing_pages: landing_pages} do
      conn = delete(conn, Routes.landing_pages_path(conn, :delete, landing_pages))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.landing_pages_path(conn, :show, landing_pages))
      end
    end
  end

  defp create_landing_pages(_) do
    landing_pages = fixture(:landing_pages)
    {:ok, landing_pages: landing_pages}
  end
end
