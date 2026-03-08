let userList = document.getElementById("userList");
let userDetails = document.getElementById("userDetails");
let loading = document.getElementById("loading");
let search = document.getElementById("search");
let reload = document.getElementById("reload");

let usersData = [];

function fetchUsers() {
  loading.style.display = "block";
  userList.innerHTML = "";

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())

    .then((data) => {
      usersData = data;

      displayUsers(data);

      loading.style.display = "none";
    })

    .catch((error) => {
      loading.textContent = "Failed to fetch data";
    });
}

function displayUsers(users) {
  userList.innerHTML = "";

  users.forEach((user) => {
    let li = document.createElement("li");

    li.textContent = user.name;

    li.addEventListener("click", () => {
      showUserDetails(user);
    });

    userList.appendChild(li);
  });
}

function showUserDetails(user) {
  userDetails.innerHTML = `
<p><b>Email:</b> ${user.email}</p>
<p><b>Phone:</b> ${user.phone}</p>
<p><b>Website:</b> ${user.website}</p>
`;
}

search.addEventListener("input", () => {
  let value = search.value.toLowerCase();

  let filtered = usersData.filter((user) =>
    user.name.toLowerCase().includes(value),
  );

  displayUsers(filtered);
});

reload.addEventListener("click", fetchUsers);

window.addEventListener("DOMContentLoaded", fetchUsers);
