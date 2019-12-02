Meta:

Who was on your team?
Team : Hemanth Sai Nimmala, Satya Sudheera Vytla

What’s the URL of your deployed app?
http://project2.cs5610f19.website/

What’s the URL of your github repository with the code for your
deployed app?
https://github.com/hemanthnhs/eShopR

Is your app deployed and working?
Yes, The app is properly deployed and working

For each team member, what work did that person do on the project?
Both of us worked and collaborated on major parts of the assignment
(Designing the schema, developing views). The major contributions of
each team member are as follows: Hemanth Integrated and used
elasticsearch-elixir library and developed search operation to get
relevant items Developed Visualization metrics using React-vis and
modelled data from the server Developed and designed LandingPage
designer to support campaigns and offers Implemented order processing
logic to validate the stock, update inventory and split the orders
based on sellers. Developed Categories, Search Pages and separated the
common display component Worked on registration of the user and add to
cart functionality with options and validations required. Developed
Order management page for the sellers to process the order as per
workflow. Developed API interaction to fetch the tracking information
from external service to fetch the tracking. Satya Developed component
to display API response of the tracking to show the tracking
information. Implemented Address and designed address page for new and
existing address. Designed cart checkout page to reflect items and
address selection Showing the orders of the user(i.e buyer/seller)
Developed product page to show the product information and images.
Developed the navigation bar to show categories and their sub
categories Worked on the login, product creation page, quantity
updation and delete of cart item. Developed Landing page rendering
based on the config.


App:

What does your project 2 app do?

For project 2 we built an e-commerce shopping website known as EShopR.
EShopR application allows sellers and buyers to come on one platform
to sell and buy products online. There can be three types of user
accounts through which the users can login to this application, one
being a Seller account and the second type is a Buyer account and the
third type is an Admin account.  Based on the type of user accounts,
different dashboard and options/operations are presented to the users.
A seller can create various product listings under various categories,
receive orders and process the orders. A buyer can shop online his
favorite items based on their availability, place orders and track the
same. An admin can decide and design the front page with banners which
serves as the face of our website and run campaigns.

How do users interact with your application? What can they accomplish
by doing so?

There can be 3 types of users as mentioned earlier. They are Seller,
Buyer, Admin. When the incoming user is a Seller, upon his/her login,
there appears a dashboard with graphical chart representations which
gives metrics/analysis about the seller’s store details. There are two
graphical chart representations given - a bar graph and a pie chart.
The bar graph represents a summarized data capturing number of orders
received on a particular day. This provides the seller with an
estimate about the demand of his/her products on a daily basis. The
second graphical representation is a pie chart which represents the
orders. This provides the seller an overview and quick glimpse of
status of the orders received. The seller account holders are provided
with 3 operations to perform -  Create new product, Manage orders,
View listings.

The seller can create a new product by clicking on ‘Create New
Product’ option. The seller gets redirected to a page where he needs
to enter the details of the product he wishes to sell online. Upon
submission of all the details required,the product listing will be
successfully created. The second operation the seller is provided is
to view the product listings created by him so far.

The third operation the seller can perform is to manage the orders
received. By clicking on ‘Manage Orders’ the seller can view every
order received along with its current status (placed or dispatched).
In turn, each order is given ‘Manage order’ option which presents the
seller with entire order details including the address to be shipped
to and a provision to update the status of the order - Accept the
order, Start Order Preparation, Dispatch the order, Order Delivered.
When the incoming user is a buyer, upon login he is presented with a
category of products he can buy from. Choosing any category offers him
list of the subcategories available. In the case of no products in a
subcategory, a message mentioning the same is gracefully displayed to
the buyer. A buyer’s navigation bar consists of ESHOPR icon to bring
him to the main page, a search bar to search products by its names, a
cart icon showing the number of items in the cart to take him to his
shopping cart, a user account icon to provide the user with options
like ‘Your Orders’, ‘Manage Address’ and ‘Logout’.  By clicking on
‘Your Orders’ the user can view their summary of all the orders placed
along with the order statuses. User can view and track the status of
their order.

The ‘Manage Address’ option allows user to add their shipping
addresses and to view already existing addresses.  The ‘Logout’ option
logs the user out of their account and takes the user to the
appropriate page which is the main page. The user can still view the
main page and can continue searching for products but the user will
not be allowed to add anything to their shopping cart. The user can
shop from the list of categories available. The user will be presented
with the product catalogue available upon selecting a category. Each
product in the catalogue is shown to the user with a product image,
its brand, name, selling price, marked price and the discount offered
on the product. To view the product in detail, the user can click on
the product. The user will be redirected to the product page where the
product highlights, description, available sizes and product
attributes are shown to the user. The user can click ‘Add To Cart’
button in order to add the product to their shopping cart. At any
point of time the user can visit their cart to see the products they
have added. The shopping cart summarizes the products the user has
added. In the cart itself the user can increase or decrease the
quantity of the product he has added, as well as remove the entire
item from his cart. The shopping cart shows individual item price
value and also the entire cart value. If the user wishes to proceed
with the items he has shopped, by clicking on ‘Proceed To Checkout’
the user will be navigated to the checkout page. In the checkout page
the user needs to select his shipping address from the list of
addresses he provided. The user can view his summary and can click on
‘Place Order’  to place an order. If the order is successfully placed,
the user will be shown a message that his order has been placed
successfully and he can view his order.

The Third type of user account supported by this application is an
Admin account. The admin account has the privilege to design the Main
page for the application visitors or buyers. Admin can decide what
image banners need to be displaced in the main page of the application
and how much of the room needs to be allocated for those banners. This
way the admin can keep updating the face of the application as per the
need.

For each project requirement above, how does your app meet that
requirement?

All the project requirements are met and explanation about the
additional features/requirements are described later in question 5.
The application server side logic is developed using Elixir and the
front end is developed using React and Redux. As per the deployment
requirement, the app is self hosted and deployed to
http://project2.cs5610f19.website/.

For the user accounts and password authentication requirement, the
application supports 3 types of user accounts - Admin, Seller, Buyer.
When a user tries to register an account, the user will be asked to
provide a password for his account and choose his account type. The
password provided by him will be hashed/converted to a hash using
Argon2 to store his credentials. When the user tries to log into his
existing account, the password provided during login is authenticated
against the stored password hash. The users information consisting
their email ID, name, type of account and the argon2 converted
password are stored in a Postgres database.

To meet the requirement to use an external API, we wanted to use a
Tracking API using which we can enable the buyers to track their
shipments. In order to achieve this, we registered ourselves on the
UPS Developer Kit site and requested for a Tracking API. We received
an access key from UPS. When a seller is ready to dispatch an order
received, he can dispatch the order only after entering a tracking
number he would have received from the UPS Shipper. Once the order
status is moved to ‘Dispatched’ by the seller, the buyer will be shown
the updated order status along with the tracking number. When the
buyer wants to track his shipment, a request to UPS including the
access key, tracking number, user credentials in the request body is
sent to UPS by the application server to get shipment information. The
information received from UPS by the application server about the
shipment is presented to the buyer. The accesskey and request body is
kept in an env file that is not available in our git accounts as it is
a sensitive data and structure to disclose.

What’s the complex part of your app? How did you design that component
and why?

The complex part of our application was to create a main page
dynamically which serves as a face of our application. We wanted the
Admin account user to be able to decide and design how the front page
of the website should look like. Typically an e-commerce website front
page would have banners for campaigning their deals and special offers
to attract buyers. We have given the admin the privilege to create any
number of rows and any number of columns to hold the banners on the
front page, this also means that he can create any number of columns
in each of the rows. The admin can specify how much of the page width
each banner should occupy. This width will be computed to percentages
in order to display the banners.The admin can also specify the
navigation link which redirects user to appropriate pages on clicking
the banners. So every time while there needs a change in the front
page to campaign different deals, the browser code need not be changed
instead the admin can create new front page replacing the existing one
with different rows, columns, banner sizes thereby giving a new layout
to the front page. To achieve this, we created a data structure to
hold row data specified by the admin. Each row data in turn holds a
map. This map holds number of columns specified by the admin and each
of these columns in turn holds a map to hold the banner image, size,
and the navigation link upon clicking it. Coming up with this complex
data structure had to be given a good deep thought. The order
processing was another complex part in this application. When the
buyer initiates for placing the order, we need to check if the
quantity the buyer is asking for or the product is available in the
store. If the product or number of items the buyer is requesting for
is not available we need to notify the same to the buyer. In the case
of order being successfully placed, the number of items that have been
bought need to be deducted from the available items to maintain data
consistency. There is always a chance that the buyer’s cart can
consist of products from different sellers. When the buyer
successfully places an order, the orders are split based on the
seller’s ID. We check what all products ordered by the buyer belongs
to which seller. This will help to better manage the orders for both
seller to process the order and buyer to track the order.
 
What additional features did you implement?

We built this ecommerce application as a Single Page Application with
Redux and React-Router.  We made use of Store to hold the application
state and allowed access to the state object and allowed updates to
the state object using dispatch functions. Few of the pages that
doesn’t need its information to be held in the store has a state
object within its class. In this application React-Router has been
used to support user to navigate through pages having the application
as an SPA without page refresh.
 
Another additional feature we incorporated in to our application is to
use a JavaScript library. We wanted to give graphical representations
to our Sellers about their orders. To implement this we used React-vis
which is a React visualization library to create graphical charts.
React-vis was a good option as it is integrated with React. We wanted
to provide a quick glimpse to the seller about the number of orders he
received on a daily basis and the status of all the orders he has
received. The metrics that are being represented graphically are
calculated on the server side and displayed to the user using a bar
graph and a pie chart. This representation would help the seller to
estimate the demand his products are receiving on a daily basis and
can see how many orders received are dispatched and how many number of
orders needs to be processed.

The other additional feature implemented in this application is to use
an Elixir library. We used Elixir’s Elasticsearch. We need to let our
users search for products by its name or any other text related to the
product in our website. For this purpose we used Elixir’s
Elasticsearch library which gives results for the text search in our
application. Along with insertion of products in to the database we
also insert the same into Elasticsearch library’s database. The
application server calls Elasticsearch library’s database which is
faster in fetching the results for the text inputted by a user. These
results for displayed to the user.
 
What interesting stuff does your app include beyond the project
requirements?

Some of the interesting things our app does is to allow the admin to
design the front page look of our website. We do provide a static
front page welcoming the users if no design is made by the admin. But
most oftenly e-commerce websites keep updating their front pages with
banners during festive seasons or special occasions, attracting buyers
with their hot deals. Inspired by this concept, we gave our admin the
authority to design the face of our website. The admin can decide
which banners to be used, where to navigate the user on clicking the
banners, how and where the banners need to be positioned. This would
help in an effective campaign during offers season. Not just the
buyers who have accounts can view this front page but anyone visiting
the website will be able to view it. The other nice and interesting
thing we provide is in benefit to the sellers. It is quite natural
that the sellers can lose track of the number of orders that they have
been receiving on a daily basis, the number of orders that are already
dispatched and the number of orders that needs to be processed. So we
provide them with graphical representations that quickly give them an
overview of their daily receiving orders and number of orders pending
on their side.

What was the most significant challenge you encountered and how did
you solve it?

One of the challenges encountered is to make a decision on how to
handle orders which include items from different sellers. When
different seller’s products belong to one order, it will be difficult
to manage those orders shipment tracking etc. Therefore to solve it,
during the order process step, we split the buyer’s orders based on
the seller’s ID. This makes it easier for the seller to process the
order and buyer to track their orders.

One of the most difficult challenges we faced was to provide options
in a generic way for the sellers while creating a product listing.
Here options mean, for example: a Tee Shirt can be available in
different sizes - small, medium etc. In another example: a Television
can be available in different inches. But it is necessary for the
seller to provide at least one option. And when a buyer buys off an
item from one of the options available, we need to update quantity
available in that particular option category itself. In order to solve
this we kept the options generic, so while a seller creates a product
listing he can enter any options(like size, color) and how many
available in that particular option(quantity). Thereby, when the buyer
views the product listings appropriate options to that product will be
displayed where the buyer can choose from. And we can update the
quantity of the items available based on what the buyer has bought.
