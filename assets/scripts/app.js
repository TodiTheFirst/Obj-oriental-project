
const productList = {
 products : [
        {
          title: "Green Apple",
          imageUrl:
            'https://galafruit.net/wp-content/uploads/galafruit_mele.jpg',
          price: 2,
          description: "Juice Apple for Breakfast",
        },
        {
          title: "Banana",
          imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoJhMM5z0R5HJp8FMHGMAXxQmyslAAjDrRCg&usqp=CAU',
            price: 5.99,
          description: "Some Banana",
        },
      ],
      render() {
        const renderMaker = document.getElementById('app');
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products){
            const prodEl = document.createElement('li');
            prodEl.className = 'product-item';
            prodEl.innerHTML= `
             <div>
              <img scr="${prod.imageUrl}" alt="${prod.title}" > 
              <div class="product-item_content">
               <h2>${prod.title}</h2>
               <h3>\$${prod.price}</h3>
               <p>${prod.description}</p>
               <button>Add to Cart</button>
              </div>
             </div>
            `;
            prodList.append(prodEl);

        }
        renderMaker.append(prodList);
      }
};

productList.render();

