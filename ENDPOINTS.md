# API Endpoints

This document outlines all the available API endpoints for this project.

## Authentication

- `POST /auth/login` - User login.

## Users

- `POST /users/register` - Register a new user.
- `GET /users` - Get all users.
- `GET /users/:id` - Get a user by their ID.
- `PATCH /users/:id` - Update a user's information.
- `DELETE /users/:id` - Delete a user.

## Products

- `POST /products` - Create a new product.
- `GET /products` - Get all products.
- `GET /products/:id` - Get a product by its ID.
- `GET /products/:sku` - Get a product by its SKU.
- `PATCH /products/:id` - Update a product's information.
- `DELETE /products/:id` - Delete a product.

## Product Images

- `GET /product-images` - Get all product images.
- `GET /product-images/:id` - Get a product image by its ID.
- `GET /product-images/product/:productId` - Get all images for a specific product.
- `POST /product-images` - Upload a new product image.
- `PUT /product-images/:id` - Update a product image.
- `DELETE /product-images/:id` - Delete a product image.
- `PUT /product-images/product/:productId` - Replace all images for a product.
- `POST /product-images/product/:productId/add` - Add more images to a product.
- `PATCH /product-images/product/:productId` - Upsert images for a product.
- `DELETE /product-images/batch/delete` - Delete multiple product images in a batch.
- `GET /product-images/batch/product` - Get product images by multiple product IDs.

## Brands

- `POST /brands` - Create a new brand.
- `GET /brands` - Get all brands.
- `GET /brands/:id` - Get a brand by its ID.
- `PUT /brands/:id` - Update a brand's information.
- `DELETE /brands/:id` - Delete a brand.

## Categories

- `POST /categories` - Create a new category.
- `POST /categories/sub-categories` - Create a new sub-category.
- `POST /categories/sub-sub-categories` - Create a new sub-sub-category.
- `GET /categories` - Get all categories.
- `GET /categories/sub-categories` - Get all sub-categories.
- `GET /categories/sub-sub-categories` - Get all sub-sub-categories.
- `GET /categories/:id` - Get a category by its ID.
- `GET /categories/:name` - Get a category by its name.
- `GET /categories/sub-categories/:id` - Get a sub-category by its ID.
- `GET /categories/sub-sub-categories/:id` - Get a sub-sub-category by its ID.
- `PUT /categories/:id` - Update a category.
- `PATCH /categories/sub-categories/:id` - Update a sub-category.
- `PATCH /categories/sub-sub-categories/:id` - Update a sub-sub-category.
- `DELETE /categories/:id` - Delete a category.
- `DELETE /categories/sub-categories/:id` - Delete a sub-category.
- `DELETE /categories/sub-sub-categories/:id` - Delete a sub-sub-category.

## Attributes

- `GET /attributes` - Get all attributes.
- `GET /attributes/:id` - Get an attribute by its ID.
- `GET /attributes/name/:name` - Get an attribute by its name.
- `POST /attributes` - Create a new attribute.
- `PUT /attributes/:id` - Update an attribute.
- `DELETE /attributes/:id` - Delete an attribute.
- `GET /attributes/values` - Get all attribute values.
- `GET /attributes/values/:id` - Get an attribute value by its ID.
- `POST /attributes/values` - Create a new attribute value.
- `PATCH /attributes/values/:id` - Update an attribute value.
- `DELETE /attributes/values/:id` - Delete an attribute value.

## Stores

- `POST /stores` - Create a new store.
- `GET /stores` - Get all stores.
- `GET /stores/:id` - Get a store by its ID.
- `PUT /stores/:id` - Update a store's information.
- `DELETE /stores/:id` - Delete a store.

## Warehouses

- `POST /warehouses` - Create a new warehouse.
- `GET /warehouses` - Get all warehouses.
- `GET /warehouses/:id` - Get a warehouse by its ID.
- `PUT /warehouses/:id` - Update a warehouse's information.
- `DELETE /warehouses/:id` - Delete a warehouse.

## Coupon

- `POST /coupon` - Create a new coupon.
- `GET /coupon` - Get all coupons with filter.
- `GET /coupon/:id` - Get a coupon by its ID.
- `GET /coupon/code/:code` - Get a coupon by its code.
- `GET /coupon/product/:productId` - Get a coupon by its product ID.
- `PATCH /coupon/:id` - Update a coupon.
- `DELETE /coupon/:id` - Delete a coupon.

## Customer

- `POST /customer` - Create a new customer.
- `GET /customer` - Get all customers.
- `GET /customer/:id` - Get a customer by their ID.
- `PATCH /customer/:id` - Update a customer's information.
- `DELETE /customer/:id` - Delete a customer.

## Purchase

- `POST /purchase` - Create a new purchase.
- `GET /purchase` - Get all purchases with filters.
- `GET /purchase/search` - Search for purchases.
- `GET /purchase/stats/summary` - Get purchase stats.
- `GET /purchase/:id` - Get a purchase by its ID.
- `GET /purchase/store/:storeId` - Get purchases by store ID.
- `GET /purchase/warehouse/:warehouseId` - Get purchases by warehouse ID.
- `GET /purchase/product/:productId` - Get purchases by product ID.
- `GET /purchase/status/:status` - Get purchases by status.
- `PATCH /purchase/:id` - Update a purchase.
- `PATCH /purchase/:id/status` - Update a purchase status.
- `DELETE /purchase/:id` - Delete a purchase.
