let label = document.getElementById('label')
let cartItem = document.getElementById('cartItem')
let myshop = document.getElementById('shop');
// console.log(myshop);
let basket =JSON.parse(localStorage.getItem('data')) || [];

let cartCalculate = () => {

    let search = basket.map((x) => x.item ).reduce((prev, next) => prev + next, 0)
   
    document.getElementById('cartprice').innerHTML= search


}
cartCalculate();

let generateCart = () => {
if (basket.length !== 0){
    cartItem.innerHTML = basket.map((x) => {
        let {id, item} = x

    let search = myProduct.find((y)=> y.id ==  id)
        return(
            `
        <div>
        <img width='100' src=${search.img} alt="">
        <h3>${search.name}</h3>
        <div>
            <span>${search.price}</span>
             <span onclick="removeItem(${id})">X</span>
        </div>
        <main class="cartdisplay">
                    <span onclick="decrement(${id})">-</span>
                    <span  id=${id}>${item}</span>
                    <span onclick="increment(${id})">+</span>
                </main>
                <h3>${search.price * item} </h3>
        </div>

            
            `
        )
    }).join('')



}else{
    cartItem.innerHTML=""
    label.innerHTML=`
    <h2>Cart is Empty</h2>
    <a href="index.html">Back to Home Page</a>
    `
}

}
generateCart();



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
    generateCart()
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
    generateCart()
    
}

let update = (id) => {
    console.log(id)
    let search = basket.find((x)=> x.id == id);
    console.log(search)
    document.getElementById(id).innerHTML=search.item
    cartSummary()
    cartCalculate()

}

let removeItem = (id) => {
    let selected  = id
    console.log(selected.id)
    basket = basket.filter((x) => x.id !== selected.id)
    localStorage.setItem('data', JSON.stringify(basket))
    generateCart()
    cartSummary()
}

let cartSummary = () => {
    if(basket.length !== 0){
        let amount = basket.map((x) => {
            let {id, item} = x
            let search = myProduct.find((y)=> y.id ==  id)
            return search.price * item
        }).reduce((prev, next) => prev + next, 0)
        label.innerHTML=`
        <h1># ${amount}</h1>
        <button>Check out</button>
         <button onclick="clearCart()">Clear Cart</button>
        
        `
        console.log(amount)

    }else return
}
cartSummary()


let clearCart = () => {
 basket = []
 localStorage.setItem('data', JSON.stringify(basket))
 generateCart()
}