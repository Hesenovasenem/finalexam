let cards = document.querySelector(".cards");
let searchInp = document.querySelector("#search");
let sortBtn = document.querySelector(".sortBtn");

axios("http://localhost:8060/posts").then((res) => {
  data = res.data;
  console.log(data);
  getAllData(data);
});

function getAllData(arr) {
  cards.innerHTML = "";
  arr.forEach((el) => {
    cards.innerHTML += `
        <div class="col col-lg-3 col-md-6 col-sm-12">
              <div class="content">
                <img style="width: 200px; height: 200px;" src="${el.img}" alt="" />
                <h2>${el.title}</h2>
                <p>${el.age}</p>
                <h4>${el.country}</h4>
                <a href="details.html?id=${el.id}" class="viewBtn ">VIEW DETAILS</a>
                <div class="buttons mt-4">
                <a href="./addEdit.html?id=${el.id}" class="btn btn-success">Edit</a>
                <a href="#" class="btn btn-danger" onclick=deleteCard(${el.id})>Delete</a>
                <a href="#" class="btn btn-primary" onclick=addFav("${el.id}")>Add Fav</a>
                </div> 
              </div>
            </div>
        `;
  });
}

searchInp.addEventListener("input", function (e) {
  axios.get("http://localhost:8060/posts").then((res) => {
    let filtered = res.data.filter((el) =>
      el.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    );
    getAllData(filtered);
  });
});

async function deleteCard(id) {
  await fetch(`http://localhost:8060/posts/${id}`, {
    method: "DELETE",
  });
  console.log(id);
}
// async function deleteCard(id, btn) {
//     await axios.delete(`http://localhost:8060/posts/${id}`);
//     btn.parentElement.parentElement.parentElement.remove();
//   }

let bool = false;
sortBtn.addEventListener("click", function () {
  bool = !bool;
  axios.get("http://localhost:8060/posts").then((res) => {
    let sorted = res.data.sort((a, b) => {
      if (!bool) {
        return a.age - b.age;
      } else {
        return b.age - a.age;
      }
    });
    getAllData(sorted);
  });
});

async function addFav(id) {
    const res = await axios(`http://localhost:8060/posts/${id}`);
    const obj = await res.data;
  
    await axios.post(`http://localhost:8060/fav`, obj);
  }