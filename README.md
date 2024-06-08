## API Documentation

### Endpoints

- [Authentication Routes](#authentication-routes)
- [Register](#register)
  `POST /api/auth/register`
- [Login](#login)
  `POST /api/auth/login`
- [User Routes](#user-routes)
- [Get Profile](#get-profile)
  `GET /api/user/profile`
- [Update Profile](#update-profile)
  `PUT /api/user/update`
- [Update Profile Picture](#update-profile-picture)
  `POST /api/user/update/picture`
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
  "token": "Access token"
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
  "email": "string", // email
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

### OTP

**Endpoint:** `POST /api/auth/otp`

**Description:** validasi otp setelah login dan register

**Request Header:**

```http
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "otp": "2114"
}
```
**Validation:**

- `otp`: Required, string panjang harus 4

**Responses:**

```json
{
  "message": "OTP Verified successfully!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjNlYjhkYjI3OTc5MDFkMzQ4ZmQ3OCIsImZ1bGxOYW1lIjoiTGludGFuZyIsImlhdCI6MTcxNzgyNDgwOCwiZXhwIjoxNzE3OTExMjA4fQ.5wciChpMnwUfRjalWOm4PSQCcBVkY3D2WGylWumfTdo"
}
```

- **200 OK**: Profile information retrieved successfully.
- **401 Unauthorized**: User not authenticated.
- **404 Not Found**: User not found.
- **403 Forbidden**: Token sudah pernah dipake/token expired/bukan owner otpnya

### User Routes

#### Get Profile

**Endpoint:** `GET /api/user/profile`

**Description:** Retrieve the profile information of the authenticated user.

**Request Header:**

```http
Authorization: Bearer <token>
```

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

**Request Header:**

```http
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "fullName": "John Doe",
  "email": "johndoe@gmail.com",
  "phoneNumber": "08123456789",
  "gender": "male",
  "dateOfBirth": "2004-05-13",
  "nik": "string" // 16 characters
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

**Request Header:**

```http
Authorization: Bearer <token>
```

**Request Parameters:**

```http
POST /api/user/update/picture
Authorization: Bearer <token>
Content-Type: multipart/form-data //

{
    "profilePic": <file> // .png or .jpg
}
```

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

## Doctor Routes

#### Filter DoctorExample

- Jarak = TERDEKAT,KURANGDARI10KM
- Harga = KURANGDARI50K,LEBIHDARI50K,LEBIHDARI50KKURANGDARI100K
- speciality = 'ALL', 'Umum', 'Spesialis Penyakit dalam', 'Spesialis Anak', 'Spesialis Saraf', 'Spesialis - Kandungan dan Ginekologi', 'Spesialis Bedah', 'Spesialis Kulit dan Kelamin',
  'Spesialis THT', 'Spesialis Mata', 'Psikiater', 'Dokter Gigi', 'Spesialis Kedokteran Forensik dan Rehabilitasi'

latitude = -7.768092637431007 (FMIPA)

longitude = 110.37654435994521 (FMIPA)

**Request:**

```http
POST /api/doctor
Authorization: Bearer <token>
Content-Type: application/json

{
    "latitude": -7.768092637431007,
    "longitude":  110.37654435994521,
    "speciality": "Spesialis Kulit dan Kelamin",
    "harga": "LEBIHDARI50KKURANGDARI100K",
    "jarak": "KURANGDARI10KM"
}
```


**Validation:**

- `latitude`: Required, floating number,yang penting lebih dari 5 digit dibelakang desimal (harus koordinat FMIPA si soalnya aku isi data dummynya disekitas ugm)
- `longitude`: Required, floating number,yang penting lebih dari 5 digit dibelakang desimal (harus koordinat FMIPA si soalnya aku isi data dummynya disekitas ugm)
- `speciality`: Required, string. bisa 'ALL' buat gak filter berdasarkan speciality. Value harus dalam ('Umum', 'Spesialis Penyakit dalam', 'Spesialis Anak', 'Spesialis Saraf', 'Spesialis - Kandungan dan Ginekologi', 'Spesialis Bedah', 'Spesialis Kulit dan Kelamin',
  'Spesialis THT', 'Spesialis Mata', 'Psikiater', 'Dokter Gigi', 'Spesialis Kedokteran Forensik dan Rehabilitasi')
- `harga`: Required, string. value harus dalam (KURANGDARI50K,LEBIHDARI50K,LEBIHDARI50KKURANGDARI100K)
- `jarak`: Required, string. Value harus dalam ( TERDEKAT,KURANGDARI10KM)


**Response:**

```json
{
  "_id": "6663a27607462c85dae65c1e",
  "name": "Fitria Fitria Kusuma",
  "speciality": "Spesialis Kulit dan Kelamin",
  "pricePerHour": 67698,
  "locLatitude": -7.768202459414219,
  "locLongitude": 110.37484719229765,
  "practicingFrom": 2017,
  "profilePic": "https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png",
  "appointments": [],
  "availability": {
    "office": "Kasih Ibu",
    "dayOfWeekStart": 2,
    "dayOfWeekEnd": 5,
    "startDayTime": 7,
    "endDayTime": 15,
    "_id": "6663a27607462c85dae65c1f"
  },
  "geohashLoc": "qqw7z9udb",
  "__v": 0
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
