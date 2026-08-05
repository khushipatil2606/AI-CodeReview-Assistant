export async function getRepositories() {
  const response = await fetch("http://127.0.0.1:8000/github/repositories");
  return response.json();
}

export async function getPullRequests(owner: string, repo: string) {
  const response = await fetch(
    `http://127.0.0.1:8000/github/pulls/${owner}/${repo}`
  );
  return response.json();
}