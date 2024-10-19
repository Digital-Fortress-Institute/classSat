let myshop = document.getElementById('shop');
// console.log(myshop);
let basket =JSON.parse(localStorage.getItem('data')) || [];


let femi = () => {
    myshop.innerHTML = myProduct.map((x)=> {
        let {id, price, img, desc, name}= x

        let search = basket.find((y) => y.id == id) || []
        return(
           
            `
      <div id=product-item-${id} class="item">
            <img src=${img} alt="">
            <h3>${name}</h3>
            <p>${desc}</p>
        
            
            <div class="main">
                <main>
                    <h4>#${price}</h4>
                </main>
                <main class="cartdisplay">
                    <span onclick="decrement(${id})">-</span>
                    <span  id=${id}>${search.item === undefined ? 0: search.item}</span>
                    <span onclick="increment(${id})">+</span>
                </main>
            </div>
        </div>
    
    `
        )
    }).join('') 
}
femi()

let increment = (id) => {
    
    let selected = id
    let search = basket.find((x) => x.id == selected.id);
    if(search === undefined){
        basket.push({
            id:selected.id,
            item: 1
        })
    }else{
        search.item += 1
    }
    localStorage.setItem('data', JSON.stringify(basket))
//    console.log(selected.id)
//     console.log(basket);

    update(selected.id)



}
let decrement = (id) => {
    let selected = id
    let search = basket.find((x) => x.id == selected.id);
    if(search === undefined)return
    if(search.item === 0)
        return
    else{
        search.item -= 1
    }
    // console.log(basket);
    update(selected.id)
    basket= basket.filter((x)=> x.item !== 0)
    localStorage.setItem('data', JSON.stringify(basket))
    
}

let update = (id) => {
    console.log(id)
    let search = basket.find((x)=> x.id == id);
    console.log(search)
    document.getElementById(id).innerHTML=search.item

    cartCalculate()

}

let cartCalculate = () => {

    let search = basket.map((x) => x.item ).reduce((prev, next) => prev + next, 0)
   
    document.getElementById('cartprice').innerHTML= search


}
cartCalculate()

