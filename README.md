Chat Application + Travel Blog/Information

WHAT IS IT?

A social media platform specifically targeting reviews for restaurants.
Users are able to search for restaurants near their area and share their experience with other users through the form of reviews.

BACKEND

The backend consists of several tools:

- Python/Django
- Django Channels
- Redis

MODELS

- Users
  - Full CRUD functionality
- Reviews
  - Full CRUD functionality
  - Has many comments
  - Has many likes
- Comments
  - Full CRUD functionality
  - Belongs to a Review
  - Has many likes
- Liking a Review
  - Belongs to a Review
- Liking a Comment
  - Belongs to a Comment
- Chat log
  - Get and Post to Redis
  - Allows users to chat with people in their area based on their geolation which is tracked by `http://ip-api.com/json/`.

FRONTEND

The frontend consists of several tools:

- ReactJS
- Redux
- Websocket

API

- http://ip-api.com/json/
  - Gets the user's current geolocation which is used to find restaurants nearby
- Yelp API
  - Used to get restaurants information based on the current location of the user
- LeafletMap
  - Used to map the locations of the restaurants results from the Yelp API call

There are three parts to this application:

- First Part

  - First part consists of a user experience in interacting with a search function for restaurants near their area which is mapped through the use of Leaflet Map.

- Second Part

  - Users are able to create reviews and comments as well as being able to read both reviews and comments and leaving a like.

- Third Part
  - Users are able to connect to a real time chat application to interact with other users in their current location.
  - Websockets allows users to connect to the server based on the url params which Django Channels intercepts to form a 2-way connection.
  - Users outputs and inputs are also provided through an axios call which sends the data to django which is then saved to Redis.

INSTALL

1. Clone reposoitory into your local repository
2. Create a virtual environment - python3 -m venv .venv
3. Activate source - source .venv/bin/activate
4. Install requirements - pip install -r requirements.txt
5. Create a database - createdb restaurant_social_media_db
6. Go into your frontend folder - npm install
7. Start your frontend server - npm run
8. Go into your backend folder - python manage.py runserver

CHAT FEATURE WILL NOT RUN WITHOUT REDIS SERVER RUNNING

1. Install Redis and run the server on port 6379
