#Project Name: e-ShopR

Please access the application at project2.cs5610f19.website

##Project Description :
e-ShopR is an e-commerce application to buy and sell products online, facilitating buyers to track their order status, 
share the product listings on social media, facilitating sellers to process the orders and view order metrics.

## Github Repo
https://github.com/hemanthnhs/eShopR

####Team Members:
Hemanth Sai Nimmala   
Satya Sudheera Vytla

## Installation for Elastic Search:

Elastic Search is to be installed on port 9200. For Debian follow the below instructions

wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.4.2-amd64.deb  
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.4.2-amd64.deb.sha512  
shasum -a 512 -c elasticsearch-7.4.2-amd64.deb.sha512  
sudo dpkg -i elasticsearch-7.4.2-amd64.deb  

Start elasticsearch using the following command  
sudo -i service elasticsearch start 

## Instructions

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Generate the seed data using `mix run priv/repo/seeds.exs`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

  * Use `mix run priv/repo/seeds.exs` to get the seed data
  * Jobs and users are pre loaded, find the credentials below
  * Sheets are not pre loaded. 

##Sample Data
The users can register as buyer and seller. We have created few accounts using seed as follows.

Password for all accounts: "password"

Buyer emails:  
buyer1@example.com  
buyer2@example.com

Seller Account emails:  
seller1@example.com  
seller2@example.com  

Admin email:  
admin1@example.com

##Major Attributions:
Icons from opensource resource https://material.io/resources/icons/?style=baseline    
Major code reference from Nats Github: https://github.com/NatTuck/lens   
Nats Notes: http://www.ccs.neu.edu/home/ntuck/courses/2019/09/cs5610    
Re-used self code from https://github.com/hemanthnhs/CS5610-WebDev-HW7  
Other references from earlier assignments and personal projects https://github.com/hemanthnhs
https://github.com/SatyaVytla  
References from Piazza notes and questions  
All bootstrap reference and snippets from https://react-bootstrap.github.io/  
https://elixir-lang.org/docs.html  
https://hexdocs.pm/phoenix/overview.html  
All attributions from prior assignments
https://reactjs.org/docs/forms.html  
Learning Guides and Resources of React, Elixir, Ecto, Pheonix, react-bootstrap  
React-vis snippets from https://github.com/uber/react-vis  
https://uber.github.io/react-vis/  
Elastic search reference https://www.elastic.co/guide/en/elasticsearch/reference/6.7/index.html  
Elastic search library snippets from https://github.com/danielberkompas/elasticsearch-elixir  
http://www.ubazu.com/elixir-elasticsearch-integration-index-data  
https://lodash.com/docs/4.17.15  

##Other Attributions:
https://stackoverflow.com/questions/37671342/how-to-load-image-files-with-webpack-file-loader  
UPS Reference Docs  
Referred http://www.binarywebpark.com/google-oauth-authentication-phoenix-elixir/ for google login
Referred webpack from Nats Notes and https://github.com/rohilnula/project1/blob/master/assets/webpack.config.js for Images
https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/
https://stackoverflow.com/questions/45520237/group-rows-by-day-week-month-till-date-in-elixir  
https://stackoverflow.com/questions/43591942/ecto-query-that-does-a-group-by-month-on-a-datetime-field-and-returns-list-of-tu/43592228
https://www.reddit.com/r/elixir/comments/8hk5nf/elasticsearch_in_a_phoenix_application/  
General reference to stackoverflow and elixir forums for Enum reduce, iteration, map operations
and Object iterations, map, foreach, each operations in React  
https://elixirforum.com/t/help-with-httpoison-post/11315
https://hexdocs.pm/httpoison/HTTPoison.html
https://www.geeksforgeeks.org/javascript-promises/
https://stackoverflow.com/questions/39458201/understanding-javascript-promise-object

##Note:
This application should not be stress tested as few components use external API's for reference. If continous hits
appear as a part of tracking, please notify the developer.

##Design Decisions:
The application is completely SPA, however few items are maintained in state instead of redux store and are fetched from
either the constructor or component Lifecycle methods (or render in some cases). This is intentional
design as considering the appropriate usecases. For example show_categories i.e while displaying the products
of a category we intentionally stored in state instead of store as In real scenario say live ecommerce sites there would
be n number of products and user would make n navigations. So maintaining it in store would occupy lot of memory and also

Another example is in few forms to clear data upon navigation and components where redirected components would not require
this data. For reference tracking number in order page. This would only be a input required to submit and lost if navigated
back

The app was intended to be integrated with payment service but as we do not have appropriate test mechanism we have designed the
functionality to be Cash on Delivery/Pay on Delivery.

Order processing is implemented to check of the items in stock and then seperate the orders based on sellers.
This ensures that the items are in stock and each seller can manage the order relevant to them.

If the project is extended for operations like pagination then maintaining in store and using it to display would create
undesired results if seller is creating new products while the buyer is browsing.  

The registration only allows to be registered as buyer/seller and not as admin. This decision made considering the usage
of e-commerce website in real time.  

Landing page structure is choosen in way to support multiple rows and columns to create campaigns.  

Promises are used at relevant instances to set states and follow the order as intended or redirect.

Elastic search(and library) is choosen to implement search bar with more realistic functionality and to get more relevant results.

Metrics are displayed to the seller of his relevant store using React-vis