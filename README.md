#Project Name: e-ShopR

##Project Description :
e-ShopR is an e-commerce application to buy and sell products online, facilitating buyers to track their order status, share the product listings on social media, facilitating sellers to process the orders and view order metrics.

####Team Members:
Hemanth Sai Nimmala, Satya Sudheera Vytla

##Attributions:
Icons from https://material.io/resources/icons/?style=baseline
https://stackoverflow.com/questions/37671342/how-to-load-image-files-with-webpack-file-loader
https://react-bootstrap.github.io/
Reffered http://www.binarywebpark.com/google-oauth-authentication-phoenix-elixir/ for google login
https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/

## Installation Instructions:
Elastic Search is to be installed on port 9200. For Debian follow the below instructions

wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.4.2-amd64.deb
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.4.2-amd64.deb.sha512
shasum -a 512 -c elasticsearch-7.4.2-amd64.deb.sha512 
sudo dpkg -i elasticsearch-7.4.2-amd64.deb

Start elasticsearch using the following command
sudo -i service elasticsearch start
