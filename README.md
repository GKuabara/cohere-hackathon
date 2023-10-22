# Unravel
This is the repo containing Unravel's backend and frontend. To run this project you'll need:
- python and [poetry](https://python-poetry.org/docs/#installation)
- npm
- a cohere API key
- a genius API key

Setup a `.env` file with the following content (remove the diamond brackets)
```
COHERE_API_KEY=<your_cohere_api_key_here>
GENIUS_API_KEY=<your_genius_api_key_here>
```

To run the backend:
1. run `poetry install`
2. run `poetry run unravel`, now it should be running on localhost:5000

To run the frontend:
1. `cd frontend`
2. `npm run start`, now it should be running on localhost:3000

Now, just access `localhost:3000/` and input the artist + album you wish to unravel!