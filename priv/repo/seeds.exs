# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     EshopR.Repo.insert!(%EshopR.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias EshopR.Users.User
alias EshopR.Categories.Category
alias EshopR.Statuses.Status
alias EshopR.Repo

Repo.insert!(%User{email: "buyer1@example.com", password_hash: Argon2.add_hash("password").password_hash, type: 0, firstname: "BuyerF", lastname: "BuyerL"})
Repo.insert!(%User{email: "seller1@example.com", password_hash: Argon2.add_hash("password").password_hash, type: 1, firstname: "SellerF", lastname: "SellerL"})
Repo.insert!(%User{email: "buyer2@example.com", password_hash: Argon2.add_hash("password").password_hash, type: 0, firstname: "Buyer2F", lastname: "Buyer2L"})
Repo.insert!(%User{email: "seller2@example.com", password_hash: Argon2.add_hash("password").password_hash, type: 1, firstname: "Seller2F", lastname: "Seller2L"})
Repo.insert!(%User{email: "admin1@example.com", password_hash: Argon2.add_hash("password").password_hash, type: 2, firstname: "AdminF", lastname: "AdminL"})
Repo.insert!(%Category{name: "Clothing", user_id: 1})
Repo.insert!(%Category{name: "Electronics", user_id: 1})
Repo.insert!(%Category{name: "Home and Kitchen", user_id: 1})
Repo.insert!(%Category{name: "Sports", user_id: 1})
Repo.insert!(%Category{name: "T-shirts", user_id: 1, parent: 1})
Repo.insert!(%Category{name: "Jeans", user_id: 1, parent: 1})
Repo.insert!(%Category{name: "Blazers", user_id: 1, parent: 1})
Repo.insert!(%Category{name: "Hoodies", user_id: 1, parent: 1})
Repo.insert!(%Category{name: "Active Wear", user_id: 1, parent: 1})
Repo.insert!(%Category{name: "Accessories", user_id: 1, parent: 1})
Repo.insert!(%Category{name: "Cell phones", user_id: 1, parent: 2})
Repo.insert!(%Category{name: "Laptops", user_id: 1, parent: 2})
Repo.insert!(%Category{name: "Furniture", user_id: 1, parent: 3})
Repo.insert!(%Category{name: "Cooking", user_id: 1, parent: 3})
Repo.insert!(%Category{name: "Cricket", user_id: 1, parent: 4})
Repo.insert!(%Category{name: "Football", user_id: 1, parent: 4})
Repo.insert!(%Status{title: "Order Placed"})
Repo.insert!(%Status{title: "Order Confirmed"})
Repo.insert!(%Status{title: "Preparing for Dispatch"})
Repo.insert!(%Status{title: "Dispatched"})
Repo.insert!(%Status{title: "Delivered"})
