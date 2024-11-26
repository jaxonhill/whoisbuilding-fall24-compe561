class GitHubUsernameException(Exception):
    """Exception raised for a github username that does not exist
    """
    
    def __init__(self, message):
        self.message = message
        super().__init__(message)

    def __str__(self):
        return f"{self.message}"