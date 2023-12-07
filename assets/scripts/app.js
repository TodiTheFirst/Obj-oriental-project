class Product {
  //class всегда называется с заглавной буквы класс позволяет определить по какому шаблону будут создаваться обьекты
  title = "DEFAULT";
  imageUrl;
  description;
  price;
  //  в данном случае нет смысла назначать параметры т.к мы назначаем их в методе
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  } //constructor метод который позволяет принимать  параметры как и другие методы а в {} задавать вэлью для этих  параметров
}

class shoppingCart {
  items = [];

  set cartItems(value) {
    this.items = value;
  }

  get totalAmount() {
    const sum = this.items.reduce((prevValue, curItem) => {
      return prevValue + curItem.price;
    }, 0);
    return sum;
  }

  addProduct(product) {
    this.items.push(product);
    this.totalOutput.innerHTML = `<h2>Total: \$${1}</h2>`;
  }

  render() {
    const cartEL = document.createElement("section");
    cartEL.innerHTML = `
   <h2>Total: \$${0}</h2>
   <button>Order Now!</button>
  `;
    cartEL.className = "cart";
    this.totalOutput = cartEL.querySelector("h2");
    return cartEL;
  }
}

class ProductItems {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
             <div>
              <img src="${this.product.imageUrl}" alt="${this.product.title}"> 
              <div class="product-item_content">
               <h2>${this.product.title}</h2>
               <h3>\$${this.product.price}</h3>
               <p>${this.product.description}</p>
               <button>Add to Cart</button>
              </div>
             </div>
            `;
    const addCartButton = prodEl.querySelector("button ");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      "Green Apple",
      "https://galafruit.net/wp-content/uploads/galafruit_mele.jpg",
      "Juice Apple for Breakfast",
      2
    ), //new позволяет запускать это как функцию
    new Product(
      "Banana",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoJhMM5z0R5HJp8FMHGMAXxQmyslAAjDrRCg&usqp=CAU",
      "Some Banana",
      5.99
    ),
  ];

  constructor() {}
  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItems(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}
class Shop {
  render() {
    const renderMaker = document.getElementById("app");
    this.cart = new shoppingCart();
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();
    renderMaker.append(cartEl);
    renderMaker.append(prodListEl);
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
