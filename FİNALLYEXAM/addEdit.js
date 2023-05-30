let form = document.querySelector("form");
let titleInput = document.querySelector("#title");
let ageInput = document.querySelector("#age");
let countryInput = document.querySelector("#count");
let fileInput = document.querySelector("#img");
let submitBtn = document.querySelector(".submit");

let id = new URLSearchParams(window.location.search).get("id");

axios.get(`http://localhost:8060/posts/${id}`).then((res) => {
  data = res.data;
  console.log(data);
  (titleInput.value = data.title), (countryInput.value = data.country),(ageInput.value = data.age),(fileInput.value = data.img);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let obj = {
    title: titleInput.value,
    age: ageInput.value,
    country: countryInput.value,
    img: `./SCSS/images/${fileInput.value.split("\\")[2]}`,
  };

  if (id) {
    axios.patch(`http://localhost:8060/posts/${id}`, obj);
  } else {
    axios.post(`http://localhost:8060/posts`, obj);
  }
  window.location = "./index.html";
});
