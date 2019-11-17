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
alias EshopR.Repo

Repo.insert!(%User{email: "hemanth@example.com", password_hash: Argon2.add_hash("password").password_hash, type: 0, firstname: "Hemanth", lastname: "Nhs"})
Repo.insert!(%User{email: "satya@example.com", password_hash: Argon2.add_hash("password").password_hash, type: 1, firstname: "Satya", lastname: "Vyt"})
Repo.insert!(%Category{name: "Clothing", user_id: 1})
Repo.insert!(%Category{name: "Electronics", user_id: 1})
Repo.insert!(%Category{name: "Home and Kitchen", user_id: 1})
Repo.insert!(%Category{name: "Personal Care", user_id: 1})
Repo.insert!(%Category{name: "Grocery", user_id: 1})
Repo.insert!(%Category{name: "Sports", user_id: 1})
Repo.insert!(%Category{name: "T-shirts", user_id: 1, parent: 1})
Repo.insert!(%Category{name: "Jeans", user_id: 1, parent: 1})
Repo.insert!(%Category{name: "Blazers", user_id: 1, parent: 1})
Repo.insert!(%Category{name: "Hoodies", user_id: 1, parent: 1})
Repo.insert!(%Category{name: "Sweatshirts", user_id: 1, parent: 1})
Repo.insert!(%Category{name: "Active Wear", user_id: 1, parent: 1})
Repo.insert!(%Category{name: "Accessories", user_id: 1, parent: 1})
Repo.insert!(%Category{name: "Cell phones", user_id: 1, parent: 2})
Repo.insert!(%Category{name: "Laptops", user_id: 1, parent: 2})
Repo.insert!(%Category{name: "Gaming Consoles", user_id: 1, parent: 2})
