import requests
from bs4 import BeautifulSoup, NavigableString, Tag
from datetime import datetime, timedelta

from app.dtos import GitHubRepository

ONE_DAY = 1
ON_SPACE = " "
NO_CONTRIBUTIONS = "No"

## average contributions in two weeks

def getContributionPageSoup(github_username: str) -> BeautifulSoup:
    """get page content for contribution data

    Args:
        github_username (str): github username

    Returns:
        Beautiful: soupified version of contribution page
    """
    github_contributions_url = f"https://github.com/users/{github_username}/contributions"
    page_data = requests.get(github_contributions_url) ## get page using http

    soup = BeautifulSoup(page_data.text, "html.parser") ## soupify page so html elements are accessible

    return soup


def getContributionsInLastYear(github_username: str) -> int:
    """Obtains a user's contributions in the last yeear

    Args:
        github_usename (str): github username
    
    Returns:
        int: number of contributions
    """
    contribution_page = getContributionPageSoup(github_username) ## contribution page is soupified

    element = contribution_page.select_one('h2') ## find first h2 on page

    contributions = element.text ## get content of element

    ## strip content to contribution number only
    components = contributions.split(ON_SPACE)
    contribution_num = components[6].strip()

    return contribution_num

def getMostRecentRepositories(github_username: str):
    """Obtains a user's most repositories they have committed too

    Args:
        github_username (str): github username

    Returns:
        [GitHubRepository] : list of activate GitHub repositories
    """
    contribution_page = getContributionPageSoup(github_username)
    active_repositories_list = contribution_page.find(class_='wb-break-word')
    ##print(active_repositories_list)
    parsedRepositories = []
    for repo in active_repositories_list.children:
        if isinstance(repo, Tag):
            if repo.name == 'a' :
                name = repo.text
            print(name)
            link = repo.get("href")
            print(link)
            parsedRepositories.append(GitHubRepository(name=name,link=link)) ## build list of readable GitHub repositories
    return parsedRepositories

def getRecentContributionHistory(github_username: str, from_date: datetime, to_date: datetime):
    """get the number of user contributions (commits) in a given date range

    Args:
        github_username (str): github username
        from_date (date): end date yyyy-mm-dd
        to_date (date): start date yyyy-mm-dd
    Returns:
        int : number of contributions
    """
    contribution_page = getContributionPageSoup(github_username)

    ##calendar = contribution_page.find('div', { 'data-graph-url' : f'/users/{github_username}/contributions' }) ## navigate to calendar

    tool_tip_elements = contribution_page.findAll('tool-tip')

    ## gather tool tips to get contribution count
    tool_tips = {}
    for unknown_tag in tool_tip_elements:
        if unknown_tag.name == 'tool-tip': ## if the tag is tool-tip add it to the tool tip list
            contribution_grid_id = unknown_tag['for'] ## key is contribution grid mapping; eg. contribution-day-component-6-50
            contribution = unknown_tag.text ## value is stringified contribution count with month, day
            
            tool_tips[contribution_grid_id] = contribution ## ex { contribution-day-component-6-50 : 4 contributions on November 21th}
    
    
    table_data = contribution_page.find('tbody')

    ## gather table data to get date and contribution grid id
    contribution_grid = {}
    for row in table_data.children:
        if not isinstance(row, NavigableString): ## filter out anything that is not a tr
            for data in row.children:
                if not isinstance(data, NavigableString): ## filter out anything that is not a td
                    element_classes = data.get('class', []) ## classes for the row to filter; excludes top td element
                    if 'ContributionCalendar-day' in element_classes: ## ensure td parsed is a day element
                        date = data['data-date'] ## get date in YYYY-MM-DD format
                        contribution_grid_id = data['id'] ## corresponding contribution grid id to relate to tool tip; eg. contribution-day-component-6-50

                        contribution_grid[date] = contribution_grid_id
    print(contribution_grid)
    test_date = datetime(2024, 11, 22)
    stringify_date = test_date.strftime('%Y-%m-%d')
    grid_id = contribution_grid[stringify_date]
    contribution = tool_tips[grid_id]
    print(contribution)

    recent_contributions_count = 0

    current_date = from_date
    while from_date <= to_date:
        stringify_date = current_date.strftime('%Y-%m-%d')
        grid_id = contribution_grid[stringify_date] ## get grid id
        
        contribution = tool_tips[grid_id] ## find grid id to extract contribution
        print(contribution)

        flex_contribution_value = contribution.split(ON_SPACE)[0] ## contribution can either be an int or the string "No", hence it is flex at this state
        if flex_contribution_value != NO_CONTRIBUTIONS:
            int_contribution_value = int(flex_contribution_value)
            recent_contributions_count += int_contribution_value

        current_date += timedelta(days=ONE_DAY)
    
    return recent_contributions_count



def main():
    from_date = datetime(2024,11,19)
    to_date = datetime(2024,11,19)

    getRecentContributionHistory("mhayescs19",from_date, to_date)

if __name__ == "__main__":
    main()




