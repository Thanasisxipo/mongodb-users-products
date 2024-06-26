const m2s = require('mongoose-to-swagger')
const User = require('./models/user.model')
const Product = require('./models/product.model')

exports.options = {
    "components": {
        "schemas": {
        User: m2s(User),
        Product: m2s(Product)
        }
    },
    "openapi":"3.1.0",
    "info": {
        "version": "1.0.0",
        "title": "Products CRUD API",
        "description": "Products project application",
        "contact": {
            "name": "API Support",
            "url": "http://www.example.com",
            "email": "support@example.com"
        }
    },
    "servers": [
        {
            url: "http://localhost:3000",
            description: "local server"
        },
        {
            url: "http://www.example.com",
            description: "Testing Server"
        }
    ],
    "tags": [
        {
            "name": "Users",
            "description": "API endpoints for users"
        },
        {
            "name": "Products",
            "description": "API endpoints for products"

        },
        {
            "name": "Users andProducts",
            "description": "API endpoints for users and their products"

        }
    ],
    "paths": {
        "/api/users":{
            "get": {
                "tags": ["Users"],
                "description": "Returns all users",
                "responses": {
                    "200": {
                        "description": "A list of users",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post":{
                "tags": ["Users"],
                "description":"Create new user",
                "requestBody":{
                  "description":"User schema to insert",
                  "content":{
                    "application/json":{
                      "schema":{
                        "type":"object",
                        "properties":{
                          "username": {"type":"string"},
                          "password": {"type":"string"},
                          "name": {"type":"string"},
                          "surname": {"type":"string"},
                          "email": {"type":"string"},
                          "address": {
                            "type":"object",
                            "properties":{
                              "area": {"type":"string"},
                              "road": {"type":"string"}
                            }
                          },
                          "phone":{
                            "type":"array",
                            "items":{
                              "type":"object",
                              "properties":{
                                "type": {"type":"string"},
                                "number": {"type":"string"}
                              }
                            }
                          }
                        },
                        "required":["username", "password","email"]
                      }
                    }
                  }
                },
                "responses":{
                  "200":{
                    "description": "New user inserted"
                  }
                }
            }
        },
        "/api/users/{username}":{
            "get": {
                "tags": ["Users"],
                "parameters": [
                    {
                    "name": "username",
                    "in": "path",
                    "required": true,
                    "description": "Username of user we want to find",
                    "type": "string"
                    }
                ],
                "description": "Gets user with specific username",
                "responses": {
                    "200": {
                        "description": "User to find",
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }   
                    }
                }
            },
            "patch":{
                "tags":[ "Users" ],
                "description":"Update user in app",
                "parameters":[
                  {
                    "name":"username",
                    "in":"path",
                    "required":true,
                    "description":"Username of user to update",
                    "type":"string"
                  },
                ],
                "requestBody":{
                  "description": "User that we update",
                  "content":{
                    "application/json":{
                      "schema":{
                        "type":"object",
                        "properties":{
                          "username": {"type":"string"},
                          "name": {"type":"string"},
                          "surname":{"type":"string"},
                          "email": {"type": "string"},
                          "address": {
                            "type":"object",
                            "properties":{
                              "area": {"type":"string"},
                              "road": {"type":"string"}
                            }
                          },
                          "phone":{
                            "type":"array",
                            "items":{
                              "type":"object",
                              "properties":{
                                "type": {"type":"string"},
                                "number": {"type":"string"}
                              }
                            }
                          }
                        },
                        "required":["email"]
                      }
                    }
                  }
                },
                "responses":{
                  "200": {
                    "description": "Update user",
                    "schema":{
                      "$ref": "#/components/schemas/User"
                    }
                  }
                }
            },
            "delete":{
                "tags":["Users"],
                "description":"Delete a user",
                "parameters":[
                  {
                    "name":"username",
                    "in":"path",
                    "description":"User to delete",
                    "type":"string"
                  },
                ],
                "responses":{
                  "200":{
                    "description":"Delete a user"
                  }
                }
            }
        },
        "/api/products":{
          "get": {
              "tags": ["Products"],
              "description": "Returns all products",
              "responses": {
                  "200": {
                      "description": "A list of products",
                      "content": {
                          "application/json": {
                              "schema": {
                                  "type": "array",
                                  "items": {
                                      "$ref": "#/components/schemas/Product"
                                  }
                              }
                          }
                      }
                  }
              }
          },
          "post":{
              "tags": ["Products"],
              "description":"Create new product",
              "requestBody":{
                "description":"Product schema to insert",
                "content":{
                  "application/json":{
                    "schema":{
                      "type":"object",
                      "properties":{
                        "product": {"type":"string"},
                        "cost": {"type":"number"},
                        "description": {"type":"string"},
                        "quantity": {"type":"number"},
                          }
                        }
                      },
                      "required":["product", "cost","description", "quantity"]
                    }
                  
                }
              },
              "responses":{
                "200":{
                  "description": "New product inserted"
                }
              }
          }
      },
      "/api/products/{id}":{
          "get": {
              "tags": ["Products"],
              "parameters": [
                  {
                  "id": "_id",
                  "in": "path",
                  "required": true,
                  "description": "Id of product we want to find",
                  "type": "string"
                  }
              ],
              "description": "Gets product with specific id",
              "responses": {
                  "200": {
                      "description": "Product to find",
                      "schema": {
                          "$ref": "#/components/schemas/Product"
                      }   
                  }
              }
          },
          "patch":{
              "tags":[ "Products" ],
              "description":"Update product in app",
              "parameters":[
                {
                  "id":"_id",
                  "in":"path",
                  "required":true,
                  "description":"Id of product to update",
                  "type":"string"
                },
              ],
              "requestBody":{
                "description": "Product that we update",
                "content":{
                  "application/json":{
                    "schema":{
                      "type":"object",
                      "properties":{
                        "product": {"type":"string"},
                        "cost": {"type":"number"},
                        "description": {"type":"string"},
                        "quantity": {"type":"number"},
                      },
                      "required":["product", "cost", "description", "quantity"]
                    }
                  }
                }
              },
              "responses":{
                "200": {
                  "description": "Update product",
                  "schema":{
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
          },
          "delete":{
              "tags":["Products"],
              "description":"Delete a product",
              "parameters":[
                {
                  "id":"_id",
                  "in":"path",
                  "description":"Product to delete",
                  "type":"string"
                },
              ],
              "responses":{
                "200":{
                  "description":"Delete a product"
                }
              }
          }
      }
        
    
}