// index.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
    const toggleSearchBtn = document.getElementById("toggle-search");
  
  
    // Base API URL
    const API_BASE_URL = "https://api.github.com";
    let searchType = "user"; // Default search type is "user"
  
    // Toggle search mode
    toggleSearchBtn.addEventListener("click", () => {
      searchType = searchType === "user" ? "repo" : "user";// This toggles the mode every time the button is clicked.
      toggleSearchBtn.textContent = searchType === "user" ? "Search Repos Instead" : "Search Users Instead";// Updates the button text dynamically.
      searchInput.placeholder = searchType === "user" ? "Search GitHub Users" : "Search GitHub Repos";
    });
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchQuery = searchInput.value.trim();// retrieves and cleans the user’s search input before making a request to the GitHub API.
      if (searchQuery) {
        if (searchType === "user") {
          searchGitHubUsers(searchQuery);
        } else {
          searchGitHubRepos(searchQuery);
        }
      }
    });
  
    function searchGitHubUsers(query) {
      const url = `${API_BASE_URL}/search/users?q=${query}`;
      
      fetch(url, {
        headers: { Accept: "application/vnd.github.v3+json" }
      })
      .then(response => response.json())
      .then(data => {
        displayUsers(data.items);
      })
      .catch(error => console.error("Error fetching users:", error));
    }
  
    function searchGitHubRepos(query) {
      const url = `${API_BASE_URL}/search/repositories?q=${query}`;
      
      fetch(url, {
        headers: { Accept: "application/vnd.github.v3+json" }
      })
      .then(response => response.json())
      .then(data => {
        displayRepos(data.items);
      })
      .catch(error => console.error("Error fetching repositories:", error));
    }
  
    function displayUsers(users) {
      userList.innerHTML = ""; // Clear previous results
      reposList.innerHTML = ""; // Clear repositories list
  
      users.forEach(user => {
        const li = document.createElement("li");
        li.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        `;
        li.addEventListener("click", () => fetchUserRepos(user.login));
        userList.appendChild(li);
      });
    }
  
    function fetchUserRepos(username) {
      const url = `${API_BASE_URL}/users/${username}/repos`;
  
      fetch(url, {
        headers: { Accept: "application/vnd.github.v3+json" }
      })
      .then(response => response.json())
      .then(data => {
        displayRepos(data);
      })
      .catch(error => console.error("Error fetching repositories:", error));
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = ""; // Clear previous repos
  
      if (repos.length === 0) {
        reposList.innerHTML = "<li>No repositories found.</li>";
        return;
      }
  
      repos.forEach(repo => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        reposList.appendChild(li);
      });
    }
  });
  