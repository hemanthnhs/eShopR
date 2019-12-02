defmodule EshopR.LandingPageTest do
  use EshopR.DataCase

  alias EshopR.LandingPage

  describe "landingpage" do
    alias EshopR.LandingPage.LandingPages

    @valid_attrs %{banner_img: "some banner_img", height: 42, navigate_to: "some navigate_to", width: 42}
    @update_attrs %{banner_img: "some updated banner_img", height: 43, navigate_to: "some updated navigate_to", width: 43}
    @invalid_attrs %{banner_img: nil, height: nil, navigate_to: nil, width: nil}

    def landing_pages_fixture(attrs \\ %{}) do
      {:ok, landing_pages} =
        attrs
        |> Enum.into(@valid_attrs)
        |> LandingPage.create_landing_pages()

      landing_pages
    end

    test "list_landingpage/0 returns all landingpage" do
      landing_pages = landing_pages_fixture()
      assert LandingPage.list_landingpage() == [landing_pages]
    end

    test "get_landing_pages!/1 returns the landing_pages with given id" do
      landing_pages = landing_pages_fixture()
      assert LandingPage.get_landing_pages!(landing_pages.id) == landing_pages
    end

    test "create_landing_pages/1 with valid data creates a landing_pages" do
      assert {:ok, %LandingPages{} = landing_pages} = LandingPage.create_landing_pages(@valid_attrs)
      assert landing_pages.banner_img == "some banner_img"
      assert landing_pages.height == 42
      assert landing_pages.navigate_to == "some navigate_to"
      assert landing_pages.width == 42
    end

    test "create_landing_pages/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = LandingPage.create_landing_pages(@invalid_attrs)
    end

    test "update_landing_pages/2 with valid data updates the landing_pages" do
      landing_pages = landing_pages_fixture()
      assert {:ok, %LandingPages{} = landing_pages} = LandingPage.update_landing_pages(landing_pages, @update_attrs)
      assert landing_pages.banner_img == "some updated banner_img"
      assert landing_pages.height == 43
      assert landing_pages.navigate_to == "some updated navigate_to"
      assert landing_pages.width == 43
    end

    test "update_landing_pages/2 with invalid data returns error changeset" do
      landing_pages = landing_pages_fixture()
      assert {:error, %Ecto.Changeset{}} = LandingPage.update_landing_pages(landing_pages, @invalid_attrs)
      assert landing_pages == LandingPage.get_landing_pages!(landing_pages.id)
    end

    test "delete_landing_pages/1 deletes the landing_pages" do
      landing_pages = landing_pages_fixture()
      assert {:ok, %LandingPages{}} = LandingPage.delete_landing_pages(landing_pages)
      assert_raise Ecto.NoResultsError, fn -> LandingPage.get_landing_pages!(landing_pages.id) end
    end

    test "change_landing_pages/1 returns a landing_pages changeset" do
      landing_pages = landing_pages_fixture()
      assert %Ecto.Changeset{} = LandingPage.change_landing_pages(landing_pages)
    end
  end
end
