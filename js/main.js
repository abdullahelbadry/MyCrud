var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDesc');
var productsContainer;



if(localStorage.getItem('myProducts') == null){
    productsContainer = [];
} else {
    productsContainer = JSON.parse(localStorage.getItem('myProducts'));
    displayProducts(productsContainer)
}
var currentIndex;

function mainRule(){


    if(
        productNameInput.value == "" || 
        productCategoryInput.value == "" || 
        productPriceInput.value == "" || 
        productDescInput.value == ""
        ) {
        alert("Please Fill In Required Info and Try Again!");
      } else if(document.getElementById("btnSubmit").innerHTML == 'Add Product') {
            addProduct();
      } else {
              submitEditProduct(currentIndex);
           }
}

function addProduct(){
    var product = {
        name : productNameInput.value,
        price : productPriceInput.value,
        category : productCategoryInput.value,
        description : productDescInput.value,
    }
    productsContainer.push(product);
    localStorage.setItem("myProducts", JSON.stringify(productsContainer))
    console.log(productsContainer);
    displayProducts(productsContainer)
    clearForm()
}

function displayProducts(productsList){
    var cartona = ``;
    for(var i = 0; i<productsList.length; i++){
        cartona += `
        <tr>
                    <td>${i}</td>
                    <td>${productsList[i].name}</td>
                    <td>${productsList[i].price}</td>
                    <td>${productsList[i].category}</td>
                    <td>${productsList[i].description}</td>
                    <td><button class="btn-sm btn-warning" onClick="updateProduct(${i})">UPDATE</button></td>
                    <td><button class="btn-sm btn-danger" onClick="deleteProduct(${i})">DELETE</button></td>
                </tr>
        `;
    }
    document.getElementById('tableRow').innerHTML = cartona;
}

function clearForm(){
    productNameInput.value = '';
    productPriceInput.value = '';
    productCategoryInput.value = '';
    productDescInput.value = '';
}

/* UPDATE PRODUCT  */

//Edit Product Info Function:
function updateProduct(index) {
    document.getElementById("btnSubmit").innerHTML = 'Update Product';
  
    productNameInput.value = productsContainer[index].name;
    productCategoryInput.value = productsContainer[index].category;
    productPriceInput.value = productsContainer[index].price;
    productDescInput.value = productsContainer[index].description;
  
    currentIndex = index;
  };
  
  
  //Submit Eidt Product Function:
  function submitEditProduct(currentIndex) {
    
      productsContainer[currentIndex].name = productNameInput.value;
      productsContainer[currentIndex].category = productCategoryInput.value;
      productsContainer[currentIndex].price = productPriceInput.value;
      productsContainer[currentIndex].description = productDescInput.value;
      document.getElementById("btnSubmit").innerHTML = 'Add Product';
      localStorage.setItem("myProducts", JSON.stringify(productsContainer));
    displayProducts(productsContainer)
    clearForm();
  };

/* END OF UPDATE PRODUCT */

function deleteProduct(productIndex){
    productsContainer.splice(productIndex,1)
    localStorage.setItem('myProducts', JSON.stringify(productsContainer));
    displayProducts(productsContainer);
}



function searchProducts(term){
    var searchProducts = [];
    for( var i = 0; i < productsContainer.length; i++){
        if(productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true){
            searchProducts.push(productsContainer[i]);
        }
    }
    displayProducts(searchProducts);
}
