A final assignment for our Angular-Ionic course. 

Requirements described below taken verbatim from course material. 

#Christmas Shopping 

We are going to write an Xmas shopping iOS app that is going to create a shopping assistant helper app utilizing:

Social Login (FaceBook)
Public API integration (Best Buy API)
Geo Location 
This project also has bonus points for advanced usage. Following is the breakdown of project.

##Requirements Background

###Navigation

The application is going to have following sections:

Search: I can search products here
My Store: I can use find stores closest to me. Default is geo location
Logs: I can see all the critical errors stored in local storage
Authentication

For Authentication we will allow users to login either with custom username/password or Facebook login. For customer username/password all usernames are accepted exception "guest" and password must be 5 characters long or longer. 

For Facebook you have already registered you app however you are going to use http://ngcordova.com/docs/plugins/oauth/ (Links to an external site.) 

###Search

For product backend we are going to use https://developer.bestbuy.com/documentation (Links to an external site.) APIs, you will generate keys just like you did for Facebook. 

For search we will actually use the following Search HTTP services (https://developer.bestbuy.com/documentation/products-api (Links to an external site.)) 

We will return the name, sku, sale price and image so the URL will look like the following;

http://api.bestbuy.com/v1/products((search=apple))?show=name,sku,salePrice,image&format=json&apiKey={your_api_key}

You should use http://ionicframework.com/docs/api/directive/ionSlideBox/ (Links to an external site.) but the configuration settings are up to you.

###Find Store

We will be using store search API https://developer.bestbuy.com/documentation/stores-api (Links to an external site.)

By default the app will use geo-location cordova plugin http://ngcordova.com/docs/plugins/geolocation/ (Links to an external site.)  to find the closets store. 

However we will allow to search by city.

###Logs

This will show all the logs from the logs from local storage. Any errors from the app should show up. For example; if I type guest/guest for login then the critical errors will be logged in local storage.

###Use Cases

I cannot browse to any pages in the site unless I login (so as soon as I open my app login should be the first page). When I logout it should drop me to the login page
For non-social login I can login with any username except guest and it should log that error in the local storage
When I login it must change the login option to logout and must display the name. For facebook it is the display name for the other ones it is just the username you typed
Search results must handle when no search results found 
Find closest store @ bare minimum must give me store name, location, hours and phone numbers 
All deployment must be managed by bower 
Design Suggestions

For Login you should you an app controller and use the eventing model covered in class to redirect user to login page 
To separate the code you should use three components folder under js (search, store, log) and under search you should have a searchController, searchService the controller is handling the interaction and the searchService handles the $http interactions) the same goes for the other two components
When installing things from bower you should use --save-dev to ensure that your JSON file is updated 


 

 

 