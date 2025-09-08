# E-commerce Backend API Documentation

This document provides documentation for the E-commerce backend API.

## Table of Contents

- [Customer API](#customer-api)
- [Products API](#products-api)
- [Purchase API](#purchase-api)
- [Users API](#users-api)
- [Coupon API](#coupon-api)
- [Sales API](#sales-api)
- [Suppliers API](#suppliers-api)
- [Expenses API](#expenses-api)
- [Warranties API](#warranties-api)
- [Settings API](#settings-api)
- [Dashboard API](#dashboard-api)
- [Statement API](#statement-api)

---

## Customer API (/api/v1/customers)

### Customer Controller (`/api/v1/customers`)

- **POST /api/v1/customers**
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

- **GET /api/v1/customers**
  - **Description:** Retrieves all customers.

- **GET /api/v1/customers/:id**
  - **Description:** Retrieves a customer by their ID.

- **DELETE /api/v1/customers/:id**
  - **Description:** Deletes a customer by their ID.

- **PATCH /api/v1/customers/:id**
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

### Attribute Controller (`/api/v1/attributes`)

- **POST /api/v1/attributes**
  - **Description:** Creates a new attribute.
  - **Dummy Data:**
    ```json
    {
      "name": "Color"
    }
    ```

- **GET /api/v1/attributes**
  - **Description:** Retrieves all attributes.

- **GET /api/v1/attributes/:id**
  - **Description:** Retrieves an attribute by its ID.

- **GET /api/v1/attributes/name/:name**
  - **Description:** Retrieves an attribute by its name.

- **PUT /api/v1/attributes/:id**
  - **Description:** Updates an attribute's name.
  - **Dummy Data:**
    ```json
    {
      "name": "Size"
    }
    ```

- **DELETE /api/v1/attributes/:id**
  - **Description:** Deletes an attribute by its ID.

- **POST /api/v1/attributes/values**
  - **Description:** Creates a new attribute value.
  - **Dummy Data:**
    ```json
    {
      "values": ["Small", "Medium", "Large"],
      "attributeId": "clx23sdeo000408l9g1f811c2"
    }
    ```

- **GET /api/v1/attributes/values**
  - **Description:** Retrieves all attribute values.

- **GET /api/v1/attributes/values/:id**
  - **Description:** Retrieves an attribute value by its ID.

- **PATCH /api/v1/attributes/values/:id**
  - **Description:** Updates an attribute value.
  - **Dummy Data:**
    ```json
    {
      "value": "Extra Large"
    }
    ```

- **DELETE /api/v1/attributes/values/:id**
  - **Description:** Deletes an attribute value by its ID.

### Brand Controller (`/api/v1/brands`)

- **POST /api/v1/brands**
  - **Description:** Creates a new brand.
  - **Dummy Data:**
    ```json
    {
      "name": "Nike"
    }
    ```

- **GET /api/v1/brands**
  - **Description:** Retrieves all brands.

- **GET /api/v1/brands/:id**
  - **Description:** Retrieves a brand by its ID.

- **PUT /api/v1/brands/:id**
  - **Description:** Updates a brand's name.
  - **Dummy Data:**
    ```json
    {
      "name": "Adidas"
    }
    ```

- **DELETE /api/v1/brands/:id**
  - **Description:** Deletes a brand by its ID.

### Category Controller (`/api/v1/categories`)

- **POST /api/v1/categories**
  - **Description:** Creates a new category.
  - **Dummy Data:**
    ```json
    {
      "name": "Electronics"
    }
    ```

- **GET /api/v1/categories**
  - **Description:** Retrieves all categories.

- **GET /api/v1/categories/:id**
  - **Description:** Retrieves a category by its ID.

- **GET /api/v1/categories/name/:name**
  - **Description:** Retrieves a category by its name.

- **PUT /api/v1/categories/:id**
  - **Description:** Updates a category's name.
  - **Dummy Data:**
    ```json
    {
      "name": "Home Appliances"
    }
    ```

- **DELETE /api/v1/categories/:id**
  - **Description:** Deletes a category by its ID.

- **POST /api/v1/categories/sub-categories**
  - **Description:** Creates a new sub-category.
  - **Dummy Data:**
    ```json
    {
      "name": "Smartphones",
      "categoryId": "clx23sdeo000408l9g1f811c2"
    }
    ```

- **GET /api/v1/categories/sub-categories**
  - **Description:** Retrieves all sub-categories.

- **GET /api/v1/categories/sub-categories/:id**
  - **Description:** Retrieves a sub-category by its ID.

- **PATCH /api/v1/categories/sub-categories/:id**
  - **Description:** Updates a sub-category.
  - **Dummy Data:**
    ```json
    {
      "name": "Laptops"
    }
    ```

- **DELETE /api/v1/categories/sub-categories/:id**
  - **Description:** Deletes a sub-category by its ID.

- **POST /api/v1/categories/sub-sub-categories**
  - **Description:** Creates a new sub-sub-category.
  - **Dummy Data:**
    ```json
    {
      "name": "Gaming Laptops",
      "subCategoryId": "clx23sdeo000408l9g1f811c2"
    }
    ```

- **GET /api/v1/categories/sub-sub-categories**
  - **Description:** Retrieves all sub-sub-categories.

- **GET /api/v1/categories/sub-sub-categories/:id**
  - **Description:** Retrieves a sub-sub-category by its ID.

- **PATCH /api/v1/categories/sub-sub-categories/:id**
  - **Description:** Updates a sub-sub-category.
  - **Dummy Data:**
    ```json
    {
      "name": "Ultrabooks"
    }
    ```

- **DELETE /api/v1/categories/sub-sub-categories/:id**
  - **Description:** Deletes a sub-sub-category by its ID.

### Image Controller (`/api/v1/product-images`)

- **POST /api/v1/product-images**
  - **Description:** Uploads a new product image.
  - **Dummy Data (form-data):**
    - `file`: (binary file)
    - `productId`: "clx23sdeo000408l9g1f811c2"

- **GET /api/v1/product-images**
  - **Description:** Retrieves all product images.

- **GET /api/v1/product-images/product/:productId**
  - **Description:** Retrieves all images for a specific product.

- **GET /api/v1/product-images/:id**
  - **Description:** Retrieves a product image by its ID.

- **PUT /api/v1/product-images/:id**
  - **Description:** Updates a product image.
  - **Dummy Data (form-data):**
    - `file`: (binary file)

- **DELETE /api/v1/product-images/:id**
  - **Description:** Deletes a product image by its ID.

- **POST /api/v1/product-images/product/:productId/add**
    - **Description:** Adds multiple images to a product.
    - **Dummy Data (form-data):**
        - `files`: [(binary file), (binary file)]

- **PUT /api/v1/product-images/product/:productId**
    - **Description:** Replaces all images for a product.
    - **Dummy Data (form-data):**
        - `files`: [(binary file), (binary file)]

- **PATCH /api/v1/product-images/product/:productId**
    - **Description:** Upserts images for a product.
    - **Dummy Data (form-data):**
        - `files`: [(binary file), (binary file)]

- **DELETE /api/v1/product-images/batch/delete**
    - **Description:** Deletes multiple product images in a batch.
    - **Dummy Data:**
        ```json
        {
          "ids": ["clx23sdeo000408l9g1f811c2", "clx23sdeo000508l9g1f811c3"]
        }
        ```

- **GET /api/v1/product-images/batch/product**
    - **Description:** Retrieves product images by multiple product IDs.
    - **Dummy Data:**
        ```json
        {
          "productIds": ["clx23sdeo000408l9g1f811c2", "clx23sdeo000508l9g1f811c3"]
        }
        ```

### Product Controller (`/api/v1/products`)

- **POST /api/v1/products**
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
- **GET /api/v1/products**
  - **Description:** Retrieves all products.
  - **Query Parameters:**
    - `includeRelations`: (boolean, optional) - Set to `false` to exclude relations.

- **GET /api/v1/products/:id**
  - **Description:** Retrieves a product by its ID.

- **GET /api/v1/products/sku/:sku**
  - **Description:** Retrieves a product by its SKU.

- **PATCH /api/v1/products/:id**
  - **Description:** Updates a product.
  - **Dummy Data:**
    ```json
    {
      "price": 1100,
      "description": "An updated powerful laptop."
    }
    ```
- **DELETE /api/v1/products/:id**
  - **Description:** Deletes a product by its ID.

### Store Controller (`/api/v1/stores`)

- **POST /api/v1/stores**
  - **Description:** Creates a new store.
  - **Dummy Data:**
    ```json
    {
      "name": "Main Store"
    }
    ```

- **GET /api/v1/stores**
  - **Description:** Retrieves all stores.

- **GET /api/v1/stores/:id**
  - **Description:** Retrieves a store by its ID.

- **PUT /api/v1/stores/:id**
  - **Description:** Updates a store's name.
  - **Dummy Data:**
    ```json
    {
      "name": "Downtown Store"
    }
    ```

- **DELETE /api/v1/stores/:id**
  - **Description:** Deletes a store by its ID.

### Warehouse Controller (`/api/v1/warehouses`)

- **POST /api/v1/warehouses**
  - **Description:** Creates a new warehouse.
  - **Dummy Data:**
    ```json
    {
      "name": "Main Warehouse"
    }
    ```

- **GET /api/v1/warehouses**
  - **Description:** Retrieves all warehouses.

- **GET /api/v1/warehouses/:id**
  - **Description:** Retrieves a warehouse by its ID.

- **PUT /api/v1/warehouses/:id**
  - **Description:** Updates a warehouse's name.
  - **Dummy Data:**
    ```json
    {
      "name": "East Warehouse"
    }
    ```

- **DELETE /api/v1/warehouses/:id**
  - **Description:** Deletes a warehouse by its ID.

---

## Purchase API (/api/v1/purchases)

### Purchase Controller (`/api/v1/purchases`)

- **POST /api/v1/purchases**
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

- **GET /api/v1/purchases**
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



- **GET /api/v1/purchases/stats/summary**
  - **Description:** Retrieves purchase statistics.

- **GET /api/v1/purchases/search**
  - **Description:** Searches for purchases based on filters.
  - **Query Parameters:** Same as `GET /api/v1/purchases`

- **GET /api/v1/purchases/:id**
  - **Description:** Retrieves a purchase by its ID.

- **PATCH /api/v1/purchases/:id**
  - **Description:** Updates a purchase.
  - **Dummy Data:**
    ```json
    {
      "quantity": 3,
      "amount": 3600
    }
    ```

- **DELETE /api/v1/purchases/:id**
  - **Description:** Deletes a purchase by its ID.

- **GET /api/v1/purchases/store/:storeId**
  - **Description:** Retrieves all purchases for a specific store.

- **GET /api/v1/purchases/warehouse/:warehouseId**
  - **Description:** Retrieves all purchases for a specific warehouse.

- **GET /api/v1/purchases/product/:productId**
  - **Description:** Retrieves all purchases for a specific product.

- **GET /api/v1/purchases/status/:status**
  - **Description:** Retrieves all purchases with a specific status.

- **PATCH /api/v1/purchases/:id/status**
  - **Description:** Updates the status of a purchase.
  - **Dummy Data:**
    ```json
    {
      "status": "COMPLETED"
    }
    ```

---

## Users API

### Auth Controller (`/api/v1/auth`)

- **POST /api/v1/auth/login**
  - **Description:** Logs in a user.
  - **Dummy Data:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

### Users Controller (`/api/v1/users`)

- **POST /api/v1/users/register**
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

- **GET /api/v1/users**
  - **Description:** Retrieves all users.

- **GET /api/v1/users/:id**
  - **Description:** Retrieves a user by their ID.

- **PATCH /api/v1/users/:id**
  - **Description:** Updates a user's information.
  - **Dummy Data:**
    ```json
    {
      "name": "Updated Test User",
      "phone": "0987654321"
    }
    ```

- **DELETE /api/v1/users/:id**
  - **Description:** Deletes a user by their ID.

---

## Coupon API (/api/v1/coupons)

### Coupon Controller (`/api/v1/coupons`)

- **POST /api/v1/coupons**
  - **Description:** Creates a new coupon.
  - **Dummy Data:**
    ```json
    {
      "code": "SUMMER2025",
      "discount": 10,
      "productId": "clx23sdeo000408l9g1f811c2",
      "expiresAt": "2025-09-22T23:59:59.000Z"
    }
    ```

- **GET /api/v1/coupons**
  - **Description:** Retrieves all coupons with optional filters.
  - **Query Parameters:**
    - `skip`: (number, optional)
    - `take`: (number, optional)
    - `search`: (string, optional) - e.g., `name`
    - `isActive`: (boolean, optional)
    - `discountType`: (string, optional) - e.g., `PERCENTAGE` or `FIXED`
    - `minDiscount`: (number, optional)
    - `maxDiscount`: (number, optional)
    - `validOnly`: (boolean, optional)

- **GET /api/v1/coupons/:id**
  - **Description:** Retrieves a coupon by its ID.

- **GET /api/v1/coupons/code/:code**
  - **Description:** Retrieves a coupon by its code.

- **GET /api/v1/coupons/product/:productId**
  - **Description:** Retrieves all coupons for a specific product.

- **PATCH /api/v1/coupons/:id**
  - **Description:** Updates a coupon.
  - **Dummy Data:**
    ```json
    {
      "discount": 15
    }
    ```

- **DELETE /api/v1/coupons/:id**
  - **Description:** Deletes a coupon by its ID.

---

## Sales API (/api/v1/sales)

### Sales Controller (`/api/v1/sales`)

- **POST /api/v1/sales**
  - **Description:** Creates a new sale.
  - **Dummy Data:**
    ```json
    {
      "productId": "clx23sdeo000408l9g1f811c2",
      "customerId": "clx23sdeo000408l9g1f811c2",
      "quantity": 1,
      "total": 1200
    }
    ```

- **GET /api/v1/sales**
  - **Description:** Retrieves all sales.

- **GET /api/v1/sales/:id**
  - **Description:** Retrieves a sale by its ID.

- **PATCH /api/v1/sales/:id**
  - **Description:** Updates a sale.
  - **Dummy Data:**
    ```json
    {
      "quantity": 2,
      "total": 2400
    }
    ```

- **DELETE /api/v1/sales/:id**
  - **Description:** Deletes a sale by its ID.

---

## Suppliers API (/api/v1/suppliers)

### Supplier Controller (`/api/v1/suppliers`)

- **POST /api/v1/suppliers**
  - **Description:** Creates a new supplier.
  - **Dummy Data:**
    ```json
    {
      "name": "Supplier Inc.",
      "contactPerson": "John Supplier",
      "email": "contact@supplier.com",
      "phone": "111-222-3333"
    }
    ```

- **GET /api/v1/suppliers**
  - **Description:** Retrieves all suppliers.

- **GET /api/v1/suppliers/:id**
  - **Description:** Retrieves a supplier by its ID.

- **PATCH /api/v1/suppliers/:id**
  - **Description:** Updates a supplier.
  - **Dummy Data:**
    ```json
    {
      "contactPerson": "Jane Supplier"
    }
    ```

- **DELETE /api/v1/suppliers/:id**
  - **Description:** Deletes a supplier by its ID.

---

## Expenses API (/api/v1/expenses)

### Expense Controller (`/api/v1/expenses`)

- **POST /api/v1/expenses**
  - **Description:** Creates a new expense.
  - **Dummy Data:**
    ```json
    {
      "title": "Office Supplies",
      "amount": 150.75,
      "description": "Pens, paper, etc."
    }
    ```

- **GET /api/v1/expenses**
  - **Description:** Retrieves all expenses.

- **GET /api/v1/expenses/:id**
  - **Description:** Retrieves an expense by its ID.

- **PATCH /api/v1/expenses/:id**
  - **Description:** Updates an expense.
  - **Dummy Data:**
    ```json
    {
      "amount": 160.00
    }
    ```

- **DELETE /api/v1/expenses/:id**
  - **Description:** Deletes an expense by its ID.

---

## Warranties API (/api/v1/warranties)

### Warranty Controller (`/api/v1/warranties`)

- **POST /api/v1/warranties**
  - **Description:** Creates a new warranty.
  - **Dummy Data:**
    ```json
    {
      "productId": "clx23sdeo000408l9g1f811c2",
      "duration": 12,
      "description": "1-year manufacturer warranty"
    }
    ```

- **GET /api/v1/warranties**
  - **Description:** Retrieves all warranties.

- **GET /api/v1/warranties/:id**
  - **Description:** Retrieves a warranty by its ID.

- **PATCH /api/v1/warranties/:id**
  - **Description:** Updates a warranty.
  - **Dummy Data:**
    ```json
    {
      "duration": 24
    }
    ```

- **DELETE /api/v1/warranties/:id**
  - **Description:** Deletes a warranty by its ID.

---

## Settings API (/api/v1/settings)

### Settings Controller (`/api/v1/settings`)

- **GET /api/v1/settings**
  - **Description:** Retrieves all settings.

- **PATCH /api/v1/settings**
  - **Description:** Updates settings.
  - **Dummy Data:**
    ```json
    {
      "siteName": "My Awesome Shop",
      "currency": "USD"
    }
    ```

---

## Dashboard API (/api/v1/dashboard)

### Dashboard Controller (`/api/v1/dashboard`)

- **GET /api/v1/dashboard/counts**
  - **Description:** Retrieves counts of various entities (products, customers, etc.).

- **GET /api/v1/dashboard/financial-totals**
  - **Description:** Retrieves financial totals (revenue, expenses, etc.).

---

## Statement API (/api/v1/statement)

### Statement Controller (`/api/v1/statement`)

- **GET /api/v1/statement**
  - **Description:** Retrieves a financial statement.
  - **Query Parameters:**
    - `startDate`: (date string, optional)
    - `endDate`: (date string, optional)
