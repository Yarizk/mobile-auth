## API Documentation

### Endpoints

- [Authentication Routes](#authentication-routes)
- [Register](#register)
- [Login](#login)
- [Get Profile](#get-profile)
- [Update Profile](#update-profile)
- [Update Profile Picture](#update-profile-picture)
- [User Routes](#user-routes)   
- [Example Requests and Responses](#example-requests-and-responses)
- [Error Responses](#error-responses)


### Authentication Routes

#### Login

**Endpoint:** `POST /api/auth/login`

**Description:** Login with email or phone number and password.

**Request Body:**
```json
{
    "login": "string", // email or phone number
    "password": "string"
}
```

**Validation:**
- `login`: Required, must be a string.
- `password`: Required, must be a string.

**Responses:**
**Response:**
```json
{
    "message": "Logged in successfully!",
    "token" : "Access token"
}
```
- **200 OK**: Login successful.
- **400 Bad Request**: Validation failed.

---

#### Register

**Endpoint:** `POST /api/auth/register`

**Description:** Register a new user.

**Request Body:**
```json
{
    "fullName": "string",
    "login": "string", // email
    "phoneNumber": "string", // numeric string
    "gender": "string", // "male" or "female" or "other"
    "dateOfBirth": "string", // ISO date
    "nik": "string", // 16 characters
    "password": "string"
}
```

**Validation:**
- `fullName`: Required, must be a string between 3 and 50 characters.
- `login`: Required, must be a valid email address.
- `phoneNumber`: Required, must be a string of 10 to 15 digits.
- `gender`: Required, must be either "male" or "female".
- `dateOfBirth`: Required, must be a valid ISO date, and a date in the past.
- `nik`: Required, must be a string of exactly 16 characters.
- `password`: Required, must be a string of at least 8 characters.

**Responses:**
- **201 Created**: User registered successfully.
- **400 Bad Request**: Validation failed.

---

### User Routes

#### Get Profile

**Endpoint:** `GET /api/user/profile`

**Description:** Retrieve the profile information of the authenticated user.

**Response:**
```json
{
    "_id": "id",
    "fullName": "John Doe",
    "email": "johndoe@gmail.com",
    "phoneNumber": "08123456789",
    "gender": "male",
    "dateOfBirth": "2004-05-13T17:00:00.000Z",
    "nik": "string", // 16 characters
    "profilePicUrl": "url" // optional
}
```

**Responses:**
- **200 OK**: Profile information retrieved successfully.
- **401 Unauthorized**: User not authenticated.
- **404 Not Found**: User not found.

---

#### Update Profile

**Endpoint:** `PUT /api/user/update`

**Description:** Update the profile information of the authenticated user.

**Request Body:**
```json
{
    "fullName": "John Doe",
    "email": "johndoe@gmail.com",
    "phoneNumber": "08123456789",
    "gender": "male",
    "dateOfBirth": "2004-05-13T17:00:00.000Z",
    "nik": "string", // 16 characters
}
```

**Validation:**
- `fullName`: Required, must be a string between 3 and 50 characters.
- `email`: Required, must be a valid email address.
- `phoneNumber`: Required, must be a string of 10 to 15 digits.
- `gender`: Required, must be either "male" or "female".
- `dateOfBirth`: Required, must be a valid ISO date, and a date in the past.
- `nik`: Required, must be a string of exactly 16 characters.

**Response:**
```json
{
    "_id": "id",
    "fullName": "new full name",
    "email": "new email",
    "phoneNumber": "new phone number",
    "gender": "new gender",
    "dateOfBirth": "new date of birth",
    "nik": "new nik",
    "__v": 0
}
```

**Responses:**
- **200 OK**: Profile updated successfully.
- **400 Bad Request**: Validation failed.
- **401 Unauthorized**: User not authenticated.
- **404 Not Found**: User not found.

---

#### Update Profile Picture

**Endpoint:** `POST /api/user/update/picture`

**Description:** Update the profile picture of the authenticated user.

**Request Parameters:**
- `profilePic`: Required, must be a file.

**Validation:**
- `profilePic`: Required.

**Response:**
```json
{
    "profilePicUrl": "url"
}
```

**Responses:**
- **200 OK**: Profile picture updated successfully.
- **400 Bad Request**: Validation failed or no file uploaded.
- **401 Unauthorized**: User not authenticated.
- **404 Not Found**: User not found.

---

### Example Requests and Responses

#### Get Profile Example

**Request:**
```http
GET /api/user/profile
Authorization: Bearer <token>
```

**Response:**
```json
{
    "_id": "id",
    "fullName": "full name",
    "email": "email",
    "phoneNumber": "phone number",
    "gender": "gender",
    "dateOfBirth": "date of birth",
    "nik": "nik",
    "profilePicUrl": "url" // optional
}
```

#### Update Profile Example

**Request:**
```json
PUT /api/user/update
Authorization: Bearer <token>
Content-Type: application/json

{
    "fullName": "new full name",
    "email": "new email",
    "phoneNumber": "new phone number",
    "gender": "new gender",
    "dateOfBirth": "new date of birth",
    "nik": "new nik"
}
```

**Response:**
```json
{
    "_id": "id",
    "fullName": "new full name",
    "email": "new email",
    "phoneNumber": "new phone number",
    "gender": "new gender",
    "dateOfBirth": "new date of birth",
    "nik": "new nik",
    "__v": 0
}
```

#### Update Profile Picture Example

**Request:**
```http
POST /api/user/update/picture
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
    "profilePic": <file>
}
```

**Response:**
```json
{
    "profilePicUrl": "https://mobile.yazidrizkik.dev/uploads/6661745ca9f5ed168b0dcf4d-Screenshot-2024-06-04-201106.png"
}
```

---

### Error Responses

**Validation Error:**
```json
{
    "status": "error",
    "message": "Validation failed",
    "details": [
        {
            "message": "\"field\" validation message",
            "path": "field"
        }
    ]
}
```

**Common Errors:**
- **400 Bad Request**: Validation failed.
- **401 Unauthorized**: User not authenticated.
- **404 Not Found**: User not found.
- **500 Internal Server Error**: Server