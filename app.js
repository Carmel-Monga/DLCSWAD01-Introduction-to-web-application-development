if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', contentLoadedFully)
} else {
  contentLoadedFully()
}

function contentLoadedFully(){
  let addToCartButtons = document.getElementsByClassName('add-to-cart');//Returns a collection of add-to-cart buttons.
  for(var i =0; i < addToCartButtons.length; i++){
    let addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener('click',addToCart);
  }

  let cartInputElements = document.getElementsByClassName('cart-item-number-input');//Returns a collection of input elemenst under the Cart Section
  for(var i = 0; i < cartInputElements.length; i ++){
    let input = cartInputElements[i]; // selects an individual input element
    input.addEventListener('change', updateNumberOfItems) // adds an event Listener to an input section.
  }

  let removeCartItemButtons = document.getElementsByClassName('cart-item-delete');
  for(var i = 0; i < removeCartItemButtons.length; i ++){
    let button = removeCartItemButtons[i]; //Select individual delete buttons of the cart section
    button.addEventListener('click', removeCartItem)// adding eventListeners f=to each delete button
  }

  let placeOrder = document.getElementById('place-order');
  placeOrder.addEventListener('click', orderButton)

}


// update the number of items in the input field of the cart item
function updateNumberOfItems(event){
  let input = event.target
  if(input.value == isNaN() || input.value < 0 || input.value == ""){
    input.value = 1; // sets the input value to 1 when anything other than a number
  }

  else {
    input = event.target.value;
  }
  
  calculateOrderTotal();
}


function removeCartItem(event){ // thef functiion delete each event cart element from the cart section.
  let cartItemToDelete = event.target
  cartItemToDelete.parentElement.parentElement.remove(); // removes the parent of the parent element of the event target.
  calculateOrderTotal() // calculates the order total
}

// Computes the total price of the cart
function calculateOrderTotal(){
  let cartItemsContainer = document.getElementsByClassName('order-section')[0];// get the cartItem section
  let cartItems = document.getElementsByClassName('cart-item')// get the cart items collection
  let totalPrice = 0;
  if(cartItems.length == 0){
    totalPrice ='$0.00'
    var orderTotal = document.getElementsByClassName('order-total')[0];
    orderTotal.innerText = totalPrice
  }
  for(var i = 0; i< cartItems.length; i++){
    var cartItem = cartItems[i];
    var itemPriceElement = cartItem.getElementsByClassName('cart-item-price')[0]; // get the price element of each cart item.  Without the [0] itemPriceElement will return a collection.
    var numberOfItemsElement = cartItem.getElementsByClassName('cart-item-number-input')[0]; //get the input elemment of the cart item. Without the [0] numberOfItemsElement will return a collection.
    var price = parseFloat(itemPriceElement.innerText.replace("$","")) *100; // gets the innner text of the priceElement and concverts it to a float
    price = (Math.round(price))/100;
    var numberOfItems = numberOfItemsElement.value
    console.log(numberOfItems)
    totalPrice = (totalPrice + price * numberOfItems);
    totalPrice = (Math.round(totalPrice * 100))/100
    console.log(price);
    
    var orderTotal = document.getElementsByClassName('order-total')[0];
    orderTotal.innerText = '$' + totalPrice
    console.log(orderTotal);
  }
  if(cartItemsContainer.childElementCount == 0){
    totalPrice =0.00
  }
}


function addToCart(event){
  let buttonElement = event.target;
  let buttonParent = buttonElement.parentElement.parentElement
  let price = buttonParent.getElementsByClassName('shop-item-price')[0].innerText;//gets the price of the item added to the cart
  price = parseFloat(price.replace("$","")); // removes the $ from the pirce and set parse the number as a float.
  let imgSource = buttonParent.getElementsByClassName('shop-item-image')[0].src;// gets the image of the item added to the cart
  let name = buttonParent.getElementsByClassName('shop-item-name')[0].firstChild.innerText; // gets the name of the item added to the cart
  let cartItemHtml =`
  <div class='cart-item-container'> 
                    <img class='cart-item-image' src ='${imgSource}'  alt='Cheeseburger'>
                    <p class ="cart-item-name">${name} </p>
                    <p class="cart-item-price"> $ ${price}</p>
                    <input class='cart-item-number-input' type='number' min='1' value='1' >
                    <span class='material-symbols-outlined cart-item-delete'>
                      delete
                    </span>
                  </div> 
  `
  console.log('added to cart the following:');
  console.log(price, imgSource, name);
  let cartItem = document.createElement('div');
  cartItem.classList.add('cart-item'); // adds the class car-item to the created div
  cartItem.innerHTML =cartItemHtml // adds the HTML of the element to add
  cartItem.getElementsByClassName('cart-item-delete')[0].addEventListener('click', removeCartItem) //adds event listener to added item.
  cartItem.getElementsByClassName('cart-item-number-input')[0].addEventListener('click', updateNumberOfItems); //adds event listener to added item.
  console.log(cartItem);
  let orderSectionElement = document.getElementsByClassName('order-section')[0]; // selects the order section element
  orderSectionElement.appendChild(cartItem);
  calculateOrderTotal();
}

function orderButton(event){
  var orderSectionElement = document.getElementsByClassName('order-section')[0] // get the order section of the page
  var check = true;
  // checks if there are no items in the cart and prevents the form from submitting
  if(orderSectionElement.childElementCount == 0){
    event.preventDefault(); // prevents the form from submitting
    alert('The Cart is empty. Kindly add elements to the cart'); // prints an alert on the screen
  }
  else if(orderSectionElement.childElementCount!= 0){
    let shippingSection = document.getElementById('shipping-information');
    // validation. ensure that all address fiels are filled completely. Otherwise prevent form submission.
    let shippingItems = shippingSection.getElementsByClassName('shipping-item');
    for(var i =0; shippingItems.length; i++){
      var shippingItem = shippingItems[i];
      if (shippingItem.value == ""){
        check = false;
        event.preventDefault(); // prevents form submission
        alert('Missing shipping details. Make sure shipping Information is complete!')
      }
    }

  }
  //checks if there are items in the cart and the address fields are filled in order to submit form.
  if(orderSectionElement.childElementCount!= 0 && check ){
    alert('Thank you for shopping with us');
  }
  
}

