

# AutoMart

[![Build Status](https://travis-ci.org/voke1/Automart.svg?branch=develop)](https://travis-ci.org/voke1/Automart)     [![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)   [![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)  [![airbnb-style](https://img.shields.io/badge/eslint-airbnb-4B32C3.svg)](https://github.com/airbnb/javascript)
Automart

Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With
Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.


 #Features

1. User can sign up.
2. User can sign in.
3. User (seller) can post a car sale advertisement.
4. User (buyer) can make a purchase order.
5. User (buyer) can update the price of his/her purchase order.
6. User (seller) can mark his/her posted AD as sold.
7. User (seller) can update the price of his/her posted AD.
8. User can view a specific car.
9. User can view all unsold cars.
10. User can view all unsold cars within a price range.
11. Admin can delete a posted AD record.
12. Admin can view all posted ads whether sold or unsold.


#Optional Features

 1. User can reset password
 2. User can view all cars of a specific body type.
 3. User can add multiple pictures to a posted ad.
 4. User can flag/report a posted AD as fraudulent.
 5. User can view all unsold cars of a specific make (manufacturer).
 6. User can view all used unsold cars.
 7. User can view all new unsold cars.


 
#Technologies utilised

- HTML, CSS and Javascript (UI interface),
- Node js (Server environment),
- Express (Web framework),
- Mocha, chai (Testing framework),
- Babel (Compiler),
- Eslint; Airbnb (Coding style),
- Travis CI (Continuous integration),
- Swagger (API Documentation),
- Coveralls (test coverage)


#Deployment

- Automart API is deployed to Heroku. Use this link https://voke-automart.herokuapp.com/ 
- Automart UI is deployed at https://voke1.github.io/Automart
- Automart API documentation can be found at https://voke-automart.herokuapp.com/api-docs



#API Endpoints: Installation and Usage

Automart application is developed using Node js and Express js. It is required these packages are present prior installation.  To start with;

* Clone this repository:
```
    $ git clone https://github.com/voke1/Automart.git
```
* Install dependencies
```
    $ npm install
```
* Start server
```
    $ npm start
```

To post and get data from app, use https://voke-automart.herokuapp.com/ together with the following
endpoint e.g. https://voke-automart.herokuapp.com/api/v1/auth/signup

An API testing tool such as POSTMAN will be required.




| Verb     | Endpoint                                                           | Action
| :------- | :---------------------------------------------------------------   | :---------------------------------------------
| POST     | /api/v1/auth/signup                                                | Create a user
| POST     | /api/v1/auth/signin                                                | Sign a user in
| POST     | /api/v1/car                                                        | Create a car AD
| GET      | /api/v1/car                                                        | View all posted ADs whether sold or available
| GET      | /api/v1/car/:carId                                                 | View a specific car AD
| PATCH    | /api/v1/car/:carId/price                                           | Update a specific car AD price
| PATCH    | /api/v1/car/:carId/status                                          | Update a specific car AD status (sold)
| DELETE   | /api/v1/car/:carId/                                                | Delete a specific car AD
| POST     | /api/v1/order                                                      | Create an order
| PATCH    | /api/v1/order/:orderId/price                                       | Update price of an order



#Author

Voke Olomu
