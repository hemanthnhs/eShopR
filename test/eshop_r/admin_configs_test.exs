defmodule EshopR.AdminConfigsTest do
  use EshopR.DataCase

  alias EshopR.AdminConfigs

  describe "adminconfigs" do
    alias EshopR.AdminConfigs.AdminConfig

    @valid_attrs %{key: "some key", value: "some value"}
    @update_attrs %{key: "some updated key", value: "some updated value"}
    @invalid_attrs %{key: nil, value: nil}

    def admin_config_fixture(attrs \\ %{}) do
      {:ok, admin_config} =
        attrs
        |> Enum.into(@valid_attrs)
        |> AdminConfigs.create_admin_config()

      admin_config
    end

    test "list_adminconfigs/0 returns all adminconfigs" do
      admin_config = admin_config_fixture()
      assert AdminConfigs.list_adminconfigs() == [admin_config]
    end

    test "get_admin_config!/1 returns the admin_config with given id" do
      admin_config = admin_config_fixture()
      assert AdminConfigs.get_admin_config!(admin_config.id) == admin_config
    end

    test "create_admin_config/1 with valid data creates a admin_config" do
      assert {:ok, %AdminConfig{} = admin_config} = AdminConfigs.create_admin_config(@valid_attrs)
      assert admin_config.key == "some key"
      assert admin_config.value == "some value"
    end

    test "create_admin_config/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = AdminConfigs.create_admin_config(@invalid_attrs)
    end

    test "update_admin_config/2 with valid data updates the admin_config" do
      admin_config = admin_config_fixture()
      assert {:ok, %AdminConfig{} = admin_config} = AdminConfigs.update_admin_config(admin_config, @update_attrs)
      assert admin_config.key == "some updated key"
      assert admin_config.value == "some updated value"
    end

    test "update_admin_config/2 with invalid data returns error changeset" do
      admin_config = admin_config_fixture()
      assert {:error, %Ecto.Changeset{}} = AdminConfigs.update_admin_config(admin_config, @invalid_attrs)
      assert admin_config == AdminConfigs.get_admin_config!(admin_config.id)
    end

    test "delete_admin_config/1 deletes the admin_config" do
      admin_config = admin_config_fixture()
      assert {:ok, %AdminConfig{}} = AdminConfigs.delete_admin_config(admin_config)
      assert_raise Ecto.NoResultsError, fn -> AdminConfigs.get_admin_config!(admin_config.id) end
    end

    test "change_admin_config/1 returns a admin_config changeset" do
      admin_config = admin_config_fixture()
      assert %Ecto.Changeset{} = AdminConfigs.change_admin_config(admin_config)
    end
  end
end
