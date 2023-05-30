let cards=document.querySelector(".cards")

let id = new URLSearchParams(window.location.search).get('id')

axios(`http://localhost:8060/posts/${id}`).then((res)=>{
    cards.innerHTML=`
    <div style="border: 1px solid black;" style="width: 200px; height: 200px;" class="col col-lg-3 col-md-6 col-sm-12">
    <div class="content" style="margin-left:50px; margin-top:30px" >
      <img style="width: 200px; height: 200px;" src="${res.data.img}" alt="" />
      <h3 class="mt-3">${res.data.title}</h3>
      <p>${res.data.country}</p>
      <p>${res.data.age}</p>
    </div>
  </div>
    `})

