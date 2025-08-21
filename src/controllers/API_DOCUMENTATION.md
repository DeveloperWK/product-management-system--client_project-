# E-commerce Backend API Documentation

This document provides documentation for the E-commerce backend API.

## Table of Contents

- [Customer API](#customer-api)
- [Products API](#products-api)
- [Purchase API](#purchase-api)
- [Users API](#users-api)

---

## Customer API

### Customer Controller (`/api/customer`)

- **POST /api/customer**
  - **Description:** Creates a new customer.
  - **Dummy Data:**
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "password": "password123",
      "phone": "123-456-7890",
      "address": "123 Main St",
      "city": "Anytown",
      "zip": "12345",
      "country": "USA"
    }
    ```

- **GET /api/customer**
  - **Description:** Retrieves all customers.

- **GET /api/customer/:id**
  - **Description:** Retrieves a customer by their ID.

- **DELETE /api/customer/:id**
  - **Description:** Deletes a customer by their ID.

- **PATCH /api/customer/:id**
  - **Description:** Updates a customer's information.
  - **Dummy Data:**
    ```json
    {
      "firstName": "Jane",
      "phone": "098-765-4321"
    }
    ```

---

## Products API

### Attribute Controller (`/api/products/attribute`)

- **POST /api/products/attribute**
  - **Description:** Creates a new attribute.
  - **Dummy Data:**
    ```json
    {
      "name": "Color"
    }
    ```

- **GET /api/products/attribute**
  - **Description:** Retrieves all attributes.

- **GET /api/products/attribute/:id**
  - **Description:** Retrieves an attribute by its ID.

- **GET /api/products/attribute/name/:name**
  - **Description:** Retrieves an attribute by its name.

- **PUT /api/products/attribute/:id**
  - **Description:** Updates an attribute's name.
  - **Dummy Data:**
    ```json
    {
      "name": "Size"
    }
    ```

- **DELETE /api/products/attribute/:id**
  - **Description:** Deletes an attribute by its ID.

- **POST /api/products/attribute/value**
  - **Description:** Creates a new attribute value.
  - **Dummy Data:**
    ```json
    {
      "values": ["Small", "Medium", "Large"],
      "attributeId": "clx23sdeo000408l9g1f811c2"
    }
    ```

- **GET /api/products/attribute/value**
  - **Description:** Retrieves all attribute values.

- **GET /api/products/attribute/value/:id**
  - **Description:** Retrieves an attribute value by its ID.

- **PATCH /api/products/attribute/value/:id**
  - **Description:** Updates an attribute value.
  - **Dummy Data:**
    ```json
    {
      "value": "Extra Large"
    }
    ```

- **DELETE /api/products/attribute/value/:id**
  - **Description:** Deletes an attribute value by its ID.

### Brand Controller (`/api/products/brand`)

- **POST /api/products/brand**
  - **Description:** Creates a new brand.
  - **Dummy Data:**
    ```json
    {
      "name": "Nike"
    }
    ```

- **GET /api/products/brand**
  - **Description:** Retrieves all brands.

- **GET /api/products/brand/:id**
  - **Description:** Retrieves a brand by its ID.

- **PUT /api/products/brand/:id**
  - **Description:** Updates a brand's name.
  - **Dummy Data:**
    ```json
    {
      "name": "Adidas"
    }
    ```

- **DELETE /api/products/brand/:id**
  - **Description:** Deletes a brand by its ID.

### Category Controller (`/api/products/category`)

- **POST /api/products/category**
  - **Description:** Creates a new category.
  - **Dummy Data:**
    ```json
    {
      "name": "Electronics"
    }
    ```

- **GET /api/products/category**
  - **Description:** Retrieves all categories.

- **GET /api/products/category/:id**
  - **Description:** Retrieves a category by its ID.

- **GET /api/products/category/name/:name**
  - **Description:** Retrieves a category by its name.

- **PUT /api/products/category/:id**
  - **Description:** Updates a category's name.
  - **Dummy Data:**
    ```json
    {
      "name": "Home Appliances"
    }
    ```

- **DELETE /api/products/category/:id**
  - **Description:** Deletes a category by its ID.

- **POST /api/products/subcategory**
  - **Description:** Creates a new sub-category.
  - **Dummy Data:**
    ```json
    {
      "name": "Smartphones",
      "categoryId": "clx23sdeo000408l9g1f811c2"
    }
    ```

- **GET /api/products/subcategory**
  - **Description:** Retrieves all sub-categories.

- **GET /api/products/subcategory/:id**
  - **Description:** Retrieves a sub-category by its ID.

- **PATCH /api/products/subcategory/:id**
  - **Description:** Updates a sub-category.
  - **Dummy Data:**
    ```json
    {
      "name": "Laptops"
    }
    ```

- **DELETE /api/products/subcategory/:id**
  - **Description:** Deletes a sub-category by its ID.

- **POST /api/products/subsubcategory**
  - **Description:** Creates a new sub-sub-category.
  - **Dummy Data:**
    ```json
    {
      "name": "Gaming Laptops",
      "subCategoryId": "clx23sdeo000408l9g1f811c2"
    }
    ```

- **GET /api/products/subsubcategory**
  - **Description:** Retrieves all sub-sub-categories.

- **GET /api/products/subsubcategory/:id**
  - **Description:** Retrieves a sub-sub-category by its ID.

- **PATCH /api/products/subsubcategory/:id**
  - **Description:** Updates a sub-sub-category.
  - **Dummy Data:**
    ```json
    {
      "name": "Ultrabooks"
    }
    ```

- **DELETE /api/products/subsubcategory/:id**
  - **Description:** Deletes a sub-sub-category by its ID.

### Image Controller (`/api/products/image`)

- **POST /api/products/image**
  - **Description:** Uploads a new product image.
  - **Dummy Data (form-data):**
    - `file`: (binary file)
    - `productId`: "clx23sdeo000408l9g1f811c2"

- **GET /api/products/image**
  - **Description:** Retrieves all product images.

- **GET /api/products/image/product/:productId**
  - **Description:** Retrieves all images for a specific product.

- **GET /api/products/image/:id**
  - **Description:** Retrieves a product image by its ID.

- **PUT /api/products/image/:id**
  - **Description:** Updates a product image.
  - **Dummy Data (form-data):**
    - `file`: (binary file)

- **DELETE /api/products/image/:id**
  - **Description:** Deletes a product image by its ID.

- **POST /api/products/image/add-images/:productId**
    - **Description:** Adds multiple images to a product.
    - **Dummy Data (form-data):**
        - `files`: [(binary file), (binary file)]

- **POST /api/products/image/replace-images/:productId**
    - **Description:** Replaces all images for a product.
    - **Dummy Data (form-data):**
        - `files`: [(binary file), (binary file)]

- **POST /api/products/image/upsert-images/:productId**
    - **Description:** Upserts images for a product.
    - **Dummy Data (form-data):**
        - `files`: [(binary file), (binary file)]

- **POST /api/products/image/delete-batch**
    - **Description:** Deletes multiple product images in a batch.
    - **Dummy Data:**
        ```json
        {
          "ids": ["clx23sdeo000408l9g1f811c2", "clx23sdeo000508l9g1f811c3"]
        }
        ```

### Product Controller (`/api/products`)

- **POST /api/products**
  - **Description:** Creates a new product.
  - **Dummy Data:**
    ```json
    {
      "name": "Laptop",
      "description": "A powerful laptop.",
      "price": 1200,
      "sku": "LP123",
      "storeId": "clx23sdeo000408l9g1f811c2",
      "warehouseId": "clx23sdeo000408l9g1f811c2",
      "categoryId": "cmeg41gvl0001cevu06asjaa8",
      "subCategoryId": "cmeg44vql0000ce5q255bjg21",
      "subSubCategoryId": "cmeg45owj0001ce5qmdylbq6r",
      "brandId": "cmeg405xi0000cevuvj4phpcy",
      "attributeValueIds": [
		    "cmeg4ng0f0001ceen4y715lp4",
		    "cmeg4nxyp0002ceencni8rccr"
	     ]         
    }
    ```
- **GET /api/products**
  - **Description:** Retrieves all products.
  - **Query Parameters:**
    - `includeRelations`: (boolean, optional) - Set to `false` to exclude relations.

- **GET /api/products/:id**
  - **Description:** Retrieves a product by its ID.

- **GET /api/products/sku/:sku**
  - **Description:** Retrieves a product by its SKU.

- **PATCH /api/products/:id**
  - **Description:** Updates a product.
  - **Dummy Data:**
    ```json
    {
      "price": 1100,
      "description": "An updated powerful laptop."
    }
    ```
- **DELETE /api/products/:id**
  - **Description:** Deletes a product by its ID.

### Store Controller (`/api/products/store`)

- **POST /api/products/store**
  - **Description:** Creates a new store.
  - **Dummy Data:**
    ```json
    {
      "name": "Main Store"
    }
    ```

- **GET /api/products/store**
  - **Description:** Retrieves all stores.

- **GET /api/products/store/:id**
  - **Description:** Retrieves a store by its ID.

- **PUT /api/products/store/:id**
  - **Description:** Updates a store's name.
  - **Dummy Data:**
    ```json
    {
      "name": "Downtown Store"
    }
    ```

- **DELETE /api/products/store/:id**
  - **Description:** Deletes a store by its ID.

### Warehouse Controller (`/api/products/warehouse`)

- **POST /api/products/warehouse**
  - **Description:** Creates a new warehouse.
  - **Dummy Data:**
    ```json
    {
      "name": "Main Warehouse"
    }
    ```

- **GET /api/products/warehouse**
  - **Description:** Retrieves all warehouses.

- **GET /api/products/warehouse/:id**
  - **Description:** Retrieves a warehouse by its ID.

- **PUT /api/products/warehouse/:id**
  - **Description:** Updates a warehouse's name.
  - **Dummy Data:**
    ```json
    {
      "name": "East Warehouse"
    }
    ```

- **DELETE /api/products/warehouse/:id**
  - **Description:** Deletes a warehouse by its ID.

---

## Purchase API

### Purchase Controller (`/api/purchase`)

- **POST /api/purchase**
  - **Description:** Creates a new purchase.
  - **Dummy Data:**
    ```json
    {
      "productId": "clx23sdeo000408l9g1f811c2",
      "storeId": "clx23sdeo000408l9g1f811c2",
      "warehouseId": "clx23sdeo000408l9g1f811c2",
      "quantity": 2,
      "amount": 2400,
      "amountKey": "hello-1",
      "payment": 1000,
      "commission": 10,
      "status": "PENDING",
      "attributeValueIds": [
		    "cmeiubqe50005ce496j60o50s",
		    "cmeiubqe70006ce498x1cb3uo"
	      ]
    }
    ```

- **GET /api/purchase**
  - **Description:** Retrieves all purchases with optional filters.
  - **Query Parameters:**
    - `skip`: (number, optional)
    - `take`: (number, optional)
    - `orderBy`: (JSON string, optional) - e.g., `{"createdAt":"desc"}`
    - `storeId`: (string, optional)
    - `warehouseId`: (string, optional)
    - `productId`: (string, optional)
    - `status`: (string, optional)
    - `minAmount`: (number, optional)
    - `maxAmount`: (number, optional)
    - `startDate`: (date string, optional)
    - `endDate`: (date string, optional)

- **GET /api/purchase/all**
  - **Description:** Retrieves all purchases without filters.

- **GET /api/purchase/stats**
  - **Description:** Retrieves purchase statistics.

- **GET /api/purchase/search**
  - **Description:** Searches for purchases based on filters.
  - **Query Parameters:** Same as `GET /api/purchase`

- **GET /api/purchase/:id**
  - **Description:** Retrieves a purchase by its ID.

- **PATCH /api/purchase/:id**
  - **Description:** Updates a purchase.
  - **Dummy Data:**
    ```json
    {
      "quantity": 3,
      "amount": 3600
    }
    ```

- **DELETE /api/purchase/:id**
  - **Description:** Deletes a purchase by its ID.

- **GET /api/purchase/store/:storeId**
  - **Description:** Retrieves all purchases for a specific store.

- **GET /api/purchase/warehouse/:warehouseId**
  - **Description:** Retrieves all purchases for a specific warehouse.

- **GET /api/purchase/product/:productId**
  - **Description:** Retrieves all purchases for a specific product.

- **GET /api/purchase/status/:status**
  - **Description:** Retrieves all purchases with a specific status.

- **PATCH /api/purchase/status/:id**
  - **Description:** Updates the status of a purchase.
  - **Dummy Data:**
    ```json
    {
      "status": "COMPLETED"
    }
    ```

---

## Users API

### Auth Controller (`/api/auth`)

- **POST /api/auth/login**
  - **Description:** Logs in a user.
  - **Dummy Data:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

### Users Controller (`/api/users`)

- **POST /api/users/register**
  - **Description:** Creates a new user.
  - **Dummy Data:**
    ```json
    {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "1234567890",
      "password": "password123"
    }
    ```

- **GET /api/users**
  - **Description:** Retrieves all users.

- **GET /api/users/:id**
  - **Description:** Retrieves a user by their ID.

- **PATCH /api/users/:id**
  - **Description:** Updates a user's information.
  - **Dummy Data:**
    ```json
    {
      "name": "Updated Test User",
      "phone": "0987654321"
    }
    ```

- **DELETE /api/users/:id**
  - **Description:** Deletes a user by their ID.
