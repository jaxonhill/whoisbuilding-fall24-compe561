# WhoIsBuilding API
## Hatch
### Key Commands
`hatch run uv sync` - creates venv and synces dependencies  
`hatch run uv add "dependency_name"` - add a new dependency (hatch uv version of pip install)  
`hatch run fastapi dev ./src/app/main.py` - start dev server (use run for production)

### Depends
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