# Hotel Booking App

Welcome! Thank you for your time reviewing this project.

## Quickstart

To quickly get started, simply clone this repo and, from the root directory, run:

`docker-compose up --build` 

Ensure that both ports `3000` and `5173` are available.

After the Docker build process is complete, view the application at: 

http://localhost:5173/

Log in with the template credentials:

username: admin
password: letmein

If the containers have already been built, you can simply run `docker-compose up` from the root directory to spin up the container.

## 

## Tech Stack

- Frontend: TypeScript / React
- Backend: Node.js, Express.js, Sequelize
- External API: weather.gov
- Database: PostgreSQL


## API Endpoints

### `GET /rooms`

#### Optional params: 

`checkInDate` & `checkOutDate` (both required if using)

Example: `/rooms?checkInDate=2025-01-01&checkOutDate=2025-01-02`

Both should be ISO formatted `YYYY-MM-DD`

To be considered valid dates, check in must be today or in the future, and check out must be one day or more in the future from check in.

If a date range is provided and the check in date within the current weather forecast, the returned objects will include a `weatherAtCheckIn` property.

An empty array will be returned if no rooms are found.

#### Response Schema

```javascript
[
  {
    name: string
    beds: number
    price: number
    description: string
    weatherAtCheckIn?: object
  },
...
]
```

### `GET /rooms/:id`

#### Params

none

#### Response

Returns the room of the given ID.

#### Response Schema

```javascript
{
  name: string
  beds: number
  price: number
  description: string
  weatherAtCheckIn?: object
}
```

### `POST /rooms`

Allows creation of a new room. Provide the required data in JSON format in the request body.

On a successful response, the provided room details will be provided along with the server generated ID.

#### Request Schema

```javascript
{
  name: string
  price: number
  beds: number
  description?: string
}
```
### Response Schema

```javascript
{
  id: number
  name: string
  price: number
  beds: number
  description?: string
}
```

### `PATCH /rooms/:id`

Allows updates to a room details. Provide the desired fields to be updated in JSON format. Any ommitted fields will be left as is.

On a successful update, the updated room object will be provided in the response body.

### Request Schema

```javascript
{
  name?: string
  price?: number
  beds?: number
  description?: string
}
```

```javascript
{
  id: number
  name: string
  price: number
  beds: number
  description?: string
}
```

### `DELETE /rooms/:id`

Deletes the requested room. A `204` response will be sent on a successful deletion, or if the requested room was not found.

### `GET /bookings`

Retrieves all bookings. Must be logged in as an admin to access.

### `GET /bookings/:id`

Retrieves an individual booking.

### `POST /bookings`

Creates a new booking. Provide all fields in the body in JSON format. All fields are required.

#### Request Schema

```javascript
{
  roomId: number
  clientEmail: string
  checkInDate: string // ISO format YYYY-MM-DD
  checkOutDate: string // ISO format YYYY-MM-DD
}
```

#### Response Codes

`201 Created`: Provides the details of the booking
`400 Validation Error`: One or more fields is missing from the request
`400 Date Error`: The requested dates are invalid.
`400 Booking Error`: There is a conflicting booking with the requested room.

### `PATCH /bookings/:id`

Can update dates of a booking, provided there is not another booking conflict with the new dates.

#### Request Schema

```javascript
{
  checkInDate: string // ISO format YYYY-MM-DD
  checkOutDate: string // ISO format YYYY-MM-DD
}
```

### `DELETE /bookings/:id`