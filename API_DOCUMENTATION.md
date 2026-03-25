# 📡 API DOCUMENTATION

## Base URL
```
http://localhost:5000/api
```

---

## MOTORCYCLES API

### 1. Get All Motorcycles
**Endpoint:** `GET /motorcycles`

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search by name, brand, or description |
| `category` | string | Filter by category (sport, cruiser, touring, offroad, adventure) |
| `minPrice` | number | Minimum price filter |
| `maxPrice` | number | Maximum price filter |
| `sortBy` | string | Sort option (newest, price-asc, price-desc, rating) |

**Example Requests:**
```bash
# Get all motorcycles
GET /motorcycles

# Search for Ducati
GET /motorcycles?search=ducati

# Get sport bikes under $10000
GET /motorcycles?category=sport&maxPrice=10000

# Get bikes sorted by price (lowest first)
GET /motorcycles?sortBy=price-asc

# Combined filters
GET /motorcycles?category=cruiser&minPrice=5000&maxPrice=15000&sortBy=price-asc
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Ducati Panigale V4",
    "brand": "Ducati",
    "price": 15999,
    "category": "sport",
    "description": "The most powerful Ducati superbike...",
    "image": "/images/ducati-panigale.jpg",
    "modelUrl": "/models/ducati.glb",
    "specifications": {
      "engineSize": "1103cc",
      "power": "215 HP",
      "torque": "124 Nm",
      "weight": "195 kg",
      "fuelCapacity": "15L",
      "maxSpeed": "300 km/h"
    },
    "inStock": true,
    "rating": 5,
    "createdAt": "2026-03-25T10:30:00.000Z"
  }
]
```

---

### 2. Get Single Motorcycle
**Endpoint:** `GET /motorcycles/:id`

**Example:**
```bash
GET /motorcycles/507f1f77bcf86cd799439011
```

**Response:** (Same as above, single object)

---

### 3. Create Motorcycle (Admin)
**Endpoint:** `POST /motorcycles`

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "name": "Ducati Panigale V4",
  "brand": "Ducati",
  "price": 15999,
  "category": "sport",
  "description": "The most powerful Ducati superbike...",
  "image": "/images/ducati-panigale.jpg",
  "modelUrl": "/models/ducati.glb",
  "specifications": {
    "engineSize": "1103cc",
    "power": "215 HP",
    "torque": "124 Nm",
    "weight": "195 kg",
    "fuelCapacity": "15L",
    "maxSpeed": "300 km/h"
  },
  "inStock": true
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/motorcycles \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Ducati Panigale V4",
    "brand":"Ducati",
    "price":15999,
    "category":"sport",
    "description":"The most powerful Ducati superbike",
    "inStock":true
  }'
```

**Response:** (201 Created)
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Ducati Panigale V4",
  ...
}
```

---

### 4. Update Motorcycle (Admin)
**Endpoint:** `PUT /motorcycles/:id`

**Request Body:** (Same fields as POST)

**Example:**
```bash
curl -X PUT http://localhost:5000/api/motorcycles/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"price": 16999}'
```

---

### 5. Delete Motorcycle (Admin)
**Endpoint:** `DELETE /motorcycles/:id`

**Example:**
```bash
curl -X DELETE http://localhost:5000/api/motorcycles/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "message": "Motorcycle deleted successfully"
}
```

---

### 6. Get Statistics
**Endpoint:** `GET /motorcycles/stats`

**Response:**
```json
{
  "totalMotorcycles": 10,
  "avgPrice": 10439.40,
  "byCategory": [
    { "_id": "sport", "count": 4 },
    { "_id": "cruiser", "count": 3 },
    { "_id": "adventure", "count": 2 },
    { "_id": "offroad", "count": 1 }
  ]
}
```

---

## CART API

### 1. Get Shopping Cart
**Endpoint:** `GET /cart`

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sessionId` | string | Yes | Session identifier |

**Example:**
```bash
GET /cart?sessionId=session_1234567890
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "sessionId": "session_1234567890",
  "items": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "productId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Ducati Panigale V4",
        "price": 15999
      },
      "quantity": 1
    }
  ]
}
```

---

### 2. Add to Cart
**Endpoint:** `POST /cart`

**Request Body:**
```json
{
  "sessionId": "session_1234567890",
  "productId": "507f1f77bcf86cd799439011",
  "quantity": 1
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId":"session_1234567890",
    "productId":"507f1f77bcf86cd799439011",
    "quantity":1
  }'
```

---

### 3. Update Cart Item Quantity
**Endpoint:** `PUT /cart/:productId`

**Query Parameters:**
| Parameter | Type | Required |
|-----------|------|----------|
| `sessionId` | string | Yes |

**Request Body:**
```json
{
  "quantity": 2
}
```

**Example:**
```bash
curl -X PUT http://localhost:5000/api/cart/507f1f77bcf86cd799439011?sessionId=session_1234567890 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 2}'
```

---

### 4. Remove from Cart
**Endpoint:** `DELETE /cart/:productId`

**Query Parameters:**
| Parameter | Type | Required |
|-----------|------|----------|
| `sessionId` | string | Yes |

**Example:**
```bash
curl -X DELETE "http://localhost:5000/api/cart/507f1f77bcf86cd799439011?sessionId=session_1234567890"
```

---

### 5. Clear Cart
**Endpoint:** `DELETE /cart`

**Query Parameters:**
| Parameter | Type | Required |
|-----------|------|----------|
| `sessionId` | string | Yes |

**Example:**
```bash
curl -X DELETE "http://localhost:5000/api/cart?sessionId=session_1234567890"
```

**Response:**
```json
{
  "message": "Cart cleared"
}
```

---

## Error Handling

All errors follow this format:

```json
{
  "error": "Error message description"
}
```

### Common Error Codes

| Code | Message | Cause |
|------|---------|-------|
| 400 | Missing required fields | Incomplete request body |
| 404 | Motorcycle not found | Invalid product ID |
| 404 | Cart not found | Cart doesn't exist |
| 500 | Server error | Database connection issue |

---

## Example: Complete Flow

### Step 1: Get all motorcycles
```javascript
const response = await fetch('http://localhost:5000/api/motorcycles');
const bikes = await response.json();
```

### Step 2: Add motorcycle to cart
```javascript
const sessionId = 'session_' + Date.now();
await fetch('http://localhost:5000/api/cart', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sessionId,
    productId: bikes[0]._id,
    quantity: 1
  })
});
```

### Step 3: Get cart
```javascript
const cartResponse = await fetch(
  `http://localhost:5000/api/cart?sessionId=${sessionId}`
);
const cart = await cartResponse.json();
```

### Step 4: Update quantity
```javascript
await fetch(`http://localhost:5000/api/cart/${bikes[0]._id}?sessionId=${sessionId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ quantity: 2 })
});
```

### Step 5: Remove from cart
```javascript
await fetch(
  `http://localhost:5000/api/cart/${bikes[0]._id}?sessionId=${sessionId}`,
  { method: 'DELETE' }
);
```

---

## Rate Limiting

Currently no rate limiting. For production, add:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

**API Version:** 1.0  
**Last Updated:** March 2026
