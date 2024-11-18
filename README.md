# WhoIsBuilding API
## Project Overview
WhoIsBuilding.io is an interactive web platform that enables computer science students to showcase, explore, and collaborate on projects. Students can upload their academic or personal projects, browse the work of others, and find potential collaborators based on shared interests in technologies or frameworks. Key features include project posting, browsing, and engaging via likes, comments, and collaboration requests, as well as GitHub-style commit heatmaps on profile pages.

## Contributors
* [Jaxon Hill](https://github.com/jaxonhill)
* [Jessica Chammas](https://github.com/Jessica-Chammas)
* [Michael Hayes](https://github.com/mhayescs19)

## Run the Application
### Install Project Manager
Install [Hatch](https://hatch.pypa.io/latest/) to your local machine
### Run Fastapi Server
1. `hatch run uv sync` - creates venv and synces dependencies  
2. `hatch run fastapi dev ./src/app/main.py` - start dev server (use run for production)
* When adding new dependencies use `hatch run uv add "dependency_name"` - add a new dependency (hatch uv version of pip install)

### Interact with the APIs via Fastapi Docs
Once the fastapi server is activated, navigate to `http://127.0.0.1:8000/docs`. Then, use the postman style interface to interact with the APIs.

### Run Tests

## Fastapi Footnotes
### `Depends`
Injects data from another method into a request.

### Fast API Explanation of JWT Flow
"OAuth2 was designed so that the backend or API could be independent of the server that authenticates the user.

But in this case, the same FastAPI application will handle the API and the authentication.

So, let's review it from that simplified point of view:

The user types the username and password in the frontend, and hits Enter.  

The frontend (running in the user's browser) sends that username and password to a specific URL in our API (declared with tokenUrl="token").  

The API checks that username and password, and responds with a "token" (we haven't implemented any of this yet).  

A "token" is just a string with some content that we can use later to verify this user.
Normally, a token is set to expire after some time.  

So, the user will have to log in again at some point later.  

And if the token is stolen, the risk is less. It is not like a permanent key that will work forever (in most of the cases).
The frontend stores that token temporarily somewhere.  

The user clicks in the frontend to go to another section of the frontend web app.
The frontend needs to fetch some more data from the API.  

But it needs authentication for that specific endpoint. 
 
So, to authenticate with our API, it sends a header Authorization with a value of Bearer plus the token.  

If the token contains foobar, the content of the Authorization header would be: Bearer foobar." - [FastAPI Docs](https://fastapi.tiangolo.com/tutorial/security/first-steps/#the-password-flow)
