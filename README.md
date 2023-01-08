# Chat and Restaurant Finder

Welcome to Chat and Restaurant Finder! This web-based platform allows you to chat with others in your area, discover local restaurants, and leave reviews and comments about those restaurants.

## Features

- Chat with others in your area based on your geolocation, which is determined using the ip-api API.
- Search for restaurants near you using the Yelp API.
- View restaurants on a map using React Leaflet, with your own location and the restaurant locations marked.
- Leave reviews and comments about restaurants on the homepage, which functions like a social media platform.

## Technologies

Chat and Restaurant Finder is built using the following technologies:

- React
- Django
- Django Rest Framework
- ip-api API
- Yelp API
- React Leaflet
- Redux
- Redis
- Django Channels

## Installation

To install Chat and Restaurant Finder on your own machine, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install` or `yarn install`.
3. Set up the backend by following the instructions in the `backend` section.
4. Set up the frontend by following the instructions in the `frontend` section.
5. Run the development server using `npm start` or `yarn start`.

# Backend setup

To set up the backend of Chat and Restaurant Finder, follow these steps:

1. Navigate to the `backend` directory.
2. Install the necessary dependencies using a package manager such as `pip` or `conda`. For example:
   pip install -r requirements.txt
3. Set up a Redis database on port 6379.
4. Create a PostgreSQL database with the name `restaurant_social_media_db` and configure your database settings in the `settings.py` file.
5. Set up any necessary environment variables. For example, you may need to set up variables for your API keys or secret keys.
6. Run any database migrations using the following command:
   python manage.py makemigrations
   python manage.py migrate
7. Start the backend server using the following command:
   python manage.py runserver
8. The backend should now be up and running!

These instructions assume that you have a Redis database set up and configured, and that you have installed the necessary dependencies for your project.

I hope these instructions are helpful! Let me know if you have any questions or need further assistance.

# Frontend setup

To set up the frontend of Chat and Restaurant Finder, follow these steps:

1. Navigate to the `frontend` directory.
2. Install the necessary dependencies using a package manager such as `npm` or `yarn`. For example:
   npm install
   or
   yarn install
3. Start the frontend server using the following command:
   npm start
   or
4. The frontend should now be up and running!

These instructions assume that you have installed the necessary dependencies for your project.

I hope these instructions are helpful! Let me know if you have any questions or need further assistance.
