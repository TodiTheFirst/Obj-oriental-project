class Product {
  //class всегда называется с заглавной буквы класс позволяет определить по какому шаблону будут создаваться обьекты
  // title = "DEFAULT";
  // imageUrl;
  // description;
  // price;
  //  в данном случае нет смысла назначать параметры т.к мы назначаем их в методе
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  } //constructor метод который позволяет принимать  параметры как и другие методы а в {} задавать вэлью для этих  параметров
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

// класс который будет создовать часть веб страницы также у нас он будет как subClass
// то что используется после extends
class Compomemt {
  constructor(renderMakerId, shouldRender = true) {
    this.makerId = renderMakerId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.makerId).append(rootElement);
    return rootElement;
  }
}

/* extends в данном случае означает что при создание данного класса он не только создает элеменнты из класса который мы создали
 но и из класса который мы указали после extends*/
//parrent class то что используется до extends
class shoppingCart extends Compomemt {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce((prevValue, curItem) => {
      return prevValue + curItem.price;
    }, 0);
    return sum;
  }
  // при использование супер констратока нужно всегда использовать его до констрактора в сабклассе
  constructor(renderMakerId) {
    super(renderMakerId);
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  orderProducts() {
    console.log("Ordering...");
    console.log(this.items);
  }

  render() {
    const cartEL = this.createRootElement("section", "cart");
    cartEL.innerHTML = `
   <h2>Total: \$${0}</h2>
   <button>Order Now!</button>
  `;
    const orderButton = cartEL.querySelector("button");
    orderButton.addEventListener("click", () => this.orderProducts()); // также можно решить через .bind
    this.totalOutput = cartEL.querySelector("h2");
  }
}

class ProductItems extends Compomemt {
  constructor(product, renderMakerId) {
    super(renderMakerId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement("li", "product-item");
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
  }
}

class ProductList extends Compomemt {
  #products = [];
  // при добавление октоторпа это свойство становится привязанно к данному классу
  constructor(renderMakerId) {
    super(renderMakerId);
    this.render();
    this.fetchProducts();
  }

  fetchProducts() {
    this.products = [
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
    this.renderProductcts();
  }

  renderProductcts() {
    for (const prod of this.products) {
      new ProductItems(prod, "prod-list");
    }
  }

  // this в данном случае применяется к обькту который создаётся
  render() {
    this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    if (this.products && this.products.length > 0) {
      this.renderProductcts();
    }
  }
}
class Shop extends Compomemt {
  constructor() {
    super(); // также можно использовать this.render();
  }

  render() {
    this.cart = new shoppingCart("app");
    new ProductList("app");
  }
}

class App {
  static cart;
  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
/*class Person {
  name = 'Oleg'
}
const p = new Person();
typeof p - будет написано object 
p instanceof Person проверяет на основе чего оно было создано
const person = {name: 'Oleg', greet(){console.log(this.name)}};
Object.getOwnPropertyDescriptors(person) - 
blueprints - мы используем для созадния обьектов основнных на кейворде new
*/