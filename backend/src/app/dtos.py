from pydantic import BaseModel

## data transfer object wrappers

class GitHubRepository(BaseModel):
    """Repository object
    """
    name: str
    link: str