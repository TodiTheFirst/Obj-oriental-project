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

class ProductItems {
  constructor(product) {
    this.product = product;
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
            return prodEl;
    }
  };

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
    const renderMaker = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
        const productItem = new ProductItems(prod);
        const prodEl = productItem.render();
        prodList.append(prodEl);
  }
  renderMaker.append(prodList);
}
};

const productList = new ProductList();
productList.render();
