# Hotel Booking App

👋 Hi there! Thank you for your time reviewing this project.

## 🚀 Quickstart


To quickly get started:

1. Clone this repo to your local machine:

    ` git clone https://github.com/sklarfox/hotel-booking/`

    `cd hotel-booking`

2. Add an environment variable for the frontend application by running the command:

    `echo "VITE_API_URL='http://localhost:3000/api/v1/'" >> ./hotel-booking-frontend/.env`

3. Then, ensure that you have Docker and Docker Compose installed on your system. Once they are, run the following command:

    `docker-compose up --build` 

    Ensure that both ports `3000` and `5173` are available.

4. If the initial build has already been run, you can simply run `docker-compose up` from the root directory to spin up the container.

    After the docker compose operation is complete, view the application in your web browser at: 

    http://localhost:5173/

5. Log in with the following credentials:

    `username: admin`

    `password: letmein`

## Using the app

After initial setup and once you log in, the application database will not have anything. To get started, navigate 'Rooms' in the nav bar at the top of the screen. Here, click the 'Add a room' button, and fill out the form. The description is optional, but all other fields are required. For example, you could enter:
```
name: Double Room
beds: 2
price: 129.99
description: Two queen beds and an in room kitchenette.
```

Try adding a couple other rooms!

Once you have some rooms added to the database, it is time to make a booking! Navigate to 'Book A Room' in the nav bar.

By default, this page will show the available rooms today, for one night. You should see all the rooms you've added on the Rooms page.

If the dates being requested are within approx. 7 days, then the weather at check in will also be displayed for each room!

You can change the dates at the top of the screen. Since no bookings have been made yet, all rooms will be available.

Click on the 'Book Now' button for one of the rooms, confirm in the popup, and congrats! You are going on vacation!

The room you've booked should no longer appear on the current screen, as its unavailable. If you select new booking dates that don't conflict with your reservation, the room will reappear.

Now you can view your reservation on the 'Bookings' page. Here you can modify the dates of the reservation (provided they are available), or cancel the reservation entirely.

Feel free to poke around the app, and submit any bugs you find (which there are surely many at this point!) to `report@alexsklar.dev`

## Tech Stack

- Frontend: TypeScript / React
- Backend: Node.js, Express.js, Sequelize, node-cache
- External API: weather.gov
- Database: PostgreSQL

## Additional Notes

# Future Work

## Sorting and Pagination for API endpoints

Currently the back end endpoints simply provide an array of all of the results from the database query. Due to time constraints, sorting and pagination was not implemented. However, given additional time, they would be added as additional query params, alongside the existing `checkInDate` and `checkOutDate` parameters. So, an example query might be:

`/rooms?checkInDate=2024-09-10&checkOutDate=2024-09-12&sort_by=price&order_by=asc&limit=10&page=2`

This would provide an array with up to 2nd page of 10 rooms available in that date range, sorted by price (in ascending order).

## Support per-room (or per-hotel) weather API requests

The app currently only supports hotel rooms in New York City. While the implementation of external API requests for weather at check in does allow for requesting different locations, there would need to be an additional API involved to get the coordinates for a given location. Additionally, rooms would need a new parameter added to support per-room locations, or have the database expanded to support multiple hotels.

One solution could look like:

- Add a `hotels` table to the backend
- Add a `hotel_id` foreign key to the rooms, to create a one-to-many relationship between hotels and rooms.
- Include a zip_code column to the hotels table
- On a request for available rooms, join the zip_code column to the result
- Make a weather API request for each unique zip_code, and attach the resulting weather report to the respective room before sending the response

## Expand time zone

The application was only tested with a single user in PST. Some additional work would be required to make localize for a given client, and ensure consistency in booking dates. For example, if a user in Australia is booking a room in the United States, there could be some edge cases where the wrong check in and check out dates are selected.

## Room categories

Currently, all available rooms appear in the search results. Generally, the expected behavior is that the room category would be shown. So, a hotel could have 4 rooms of the 'Double Room' class, and the end user would be shown only the class of room available, not selecting a specific room. This would be done by adding a separate category property to each room. Additionally, the default room search endpoint would need to be changed to include a `GROUP BY` clause in the SQL query, so individual rooms aren't sent to the client directly.

## UUID for all entries

The app currently uses the database primary key as the unique identifier for all entries. A UUID would be added to each entity, and this would be the data sent to the client and used when requesting specific entries.



# API Documentation

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