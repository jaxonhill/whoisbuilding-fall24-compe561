import requests
from bs4 import BeautifulSoup

## average contributions in two weeks

def getContributionData(github_username: str) -> requests.Response:
    """get page content for contribution data

    Args:
        github_username (str): github username

    Returns:
        requests.Response: page data
    """
    github_contributions_url = f"https://github.com/users/{github_username}/contributions"
    return requests.get(github_contributions_url) 


def getContributionsInLastYear(github_username: str) -> int:
    """Obtains a user's contributions in the last yeear

    Args:
        github_usename (str): github username
    
    Returns:
        int: number of contributions
    """
    page_data = getContributionData(github_username)
    soup = BeautifulSoup(page_data.text, "html.parser")

    content = soup.select_one('h2') ## find first h2 on page

    contributions = content.text ## get content of element

    ## strip content to contribution number only
    components = contributions.split(" ")
    contribution_num = components[6].strip()

    return contribution_num

def main():
    getContributionsInLastYear("mhayescs19")

if __name__ == "__main__":
    main()




