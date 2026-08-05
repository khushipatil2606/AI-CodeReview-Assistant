from fastapi import APIRouter
from services.github_service import GitHubService

router = APIRouter(prefix="/github", tags=["GitHub"])

github_service = GitHubService()


# ------------------ Repositories ------------------

@router.get("/repositories")
def repositories():
    return github_service.get_repositories()


# ------------------ Repository Details ------------------

@router.get("/repository/{owner}/{repo}")
def repository_details(owner: str, repo: str):
    return github_service.get_repository_details(owner, repo)


# ------------------ Commits ------------------

@router.get("/commits/{owner}/{repo}")
def commits(owner: str, repo: str):
    return github_service.get_commits(owner, repo)


# ------------------ Pull Requests ------------------

@router.get("/pulls/{owner}/{repo}")
def pull_requests(owner: str, repo: str):
    try:
        return github_service.get_pull_requests(owner, repo)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}


# ------------------ Analytics ------------------

@router.get("/analytics")
def get_analytics():

    repos = github_service.get_repositories()

    if isinstance(repos, dict):
        return repos

    total_repositories = len(repos)

    total_stars = sum(repo["stars"] for repo in repos)

    languages = {}

    for repo in repos:
        language = repo["language"] or "Unknown"

        if language in languages:
            languages[language] += 1
        else:
            languages[language] = 1

    top_language = max(languages, key=languages.get)

    return {
        "repositories": total_repositories,
        "stars": total_stars,
        "top_language": top_language
    }