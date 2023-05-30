let cards = document.querySelector(".cards")


axios("http://localhost:8060/fav").then((res)=>{
    data=res.data
    getDataFromFav(data)
})


function getDataFromFav(arr) {
    cards.innerHTML=''
    arr.forEach(el => {
        cards.innerHTML+=`
        <div style="border: 1px solid black;" style="width: 200px; height: 200px;" class="col col-lg-3 col-md-6 col-sm-12">
        <div class="content">
          <img style="width: 200px; height: 200px;" src="${el.img}" alt="" />
          <h3 class="mt-3">${el.title}</h3>
          <p>${el.country}</p>
          <p>${el.age}</p>
        </div>
      </div>
        `
    });
}