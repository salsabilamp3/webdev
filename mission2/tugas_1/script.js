class Product {
  constructor(item) {
    this.id = item.id;
    this.image = item.image;
    this.namaBarang = item.namaBarang;
    this.harga = parseInt(item.harga);
  }

  createCard() {
    const card = document.createElement('div');
    card.className = 'col-md-3';
    card.innerHTML = `
          <div class="card w-75 mb-3">
              <img src="${this.image}" width="20" class="card-img-top" alt="...">
              <div class="card-body">
                  <h6 class="card-title fw-bold nama-barang" >${this.namaBarang}</h6>
                  <p class="card-text harga-barang" value="${this.harga}">${formatIDR(this.harga)}</p>
                  <div class="row">
                      <div class="col-md-4">
                          <button type="button" class="btn btn-primary float-end minusBtn">-</button>
                      </div>
                      <div class="col-md-4">
                          <input class="form-control text-center qty" size="10" type="text" placeholder="0" value="0">
                      </div>
                      <div class="col-md-4">
                          <button type="button" class="btn btn-primary plusBtn">+</button>
                      </div>
                      </div>
                      <div class="row p-2">
                      <button type="button" value="${this.id}" class="btn btn-success addCartBtn">Tambah Barang</button>
                      </div>
              </div>
          </div>
      `;
    return card;
  }
}

class Cart {
  constructor() {
    this.cart = [];
    this.cartList = document.getElementById('cart-list');
    this.totalDisplay = document.getElementById('total');
  }

  addToCart(product, qty) {
    const subtotal = product.harga * qty;
    const barang = {
      id: product.id,
      img: product.image,
      nama: product.namaBarang,
      harga: product.harga,
      qty: qty,
      subtotal: subtotal
    };

    this.cart.push(barang);

    this.displayCart(barang);
    this.displayTotal();
  }

  displayCart(barang) {
    const cartItem = document.createElement('div');
    const harga = parseInt(barang.harga);
    const subtotal = parseInt(barang.subtotal);

    cartItem.innerHTML = `
      <div class="row">
          <div class="col-md-1">
              <img src="${barang.img}" width="100" class="" alt="...">
          </div>
          <div class="col-md-6 py-2">
              <h5 class="fw-semibold">${barang.nama}</h5>
              <p>${formatIDR(harga)} x <span>${barang.qty}</span></p>
          </div>
          <div class="col-md-5 py-4 pe-5 text-end">
              <h5 class="fw-semibold">${formatIDR(subtotal)}</h5>
          </div>
      </div>
      <div class="mt-2 row border-bottom"></div>
    `;
    this.cartList.appendChild(cartItem);
  }

  displayTotal() {
    const total = this.cart.reduce((acc, curr) => acc + curr.subtotal, 0);
    const pajak = total * 0.11;
    const grandTotal = total + pajak;

    this.totalDisplay.innerHTML = `
      <div class="row mt-3">
          <div class="col-md-9 text-end">
              <h5 class="fw-semibold">Total Pembelian</h5>
              <h5 class="fw-semibold">Pajak 11%</h5>
              <h5 class="fw-semibold">Total Pembayaran</h5>
          </div>
          <div class="col-md-3 pe-5 text-end">
              <h5 class="fw-semibold">${formatIDR(total)}</h5>
              <h5 class="fw-semibold">${formatIDR(pajak)}</h5>
              <h5 class="fw-semibold">${formatIDR(grandTotal)}</h5>
              <button type="button" class="btn btn-primary mt-3 printStruk">Cetak Struk</button>
          </div>
      </div>`;

    const printStrukBtn = document.querySelector('.printStruk');
    printStrukBtn.addEventListener('click', () => {
      this.printStruk();
    });
  }

  printStruk() {
    const receiptWindow = window.open('', '', 'width=600,height=800');
  
    const total = this.cart.reduce((acc, curr) => acc + curr.subtotal, 0);
    const tax = total * 0.11;
    const grandTotal = total + tax;
  
    const receiptContent = `
      <html>
        <head>
          <title>Struk Pembayaran</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
        </head>
        <body>
          <div class="container-fluid px-5 my-2">
            <div class="row">
              <div class="col-md-12 text-center">
                <h4>Struk Pembayaran</h4>
                <h5>Toko Mission 2</h5>
                <h6>Jl. Tugas No. 1</h6>
                <h6>Telp: 081110678821</h6>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 text-center">
               
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 text-center">
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 text-center">
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 text-center">
                <h5>=====================================</h5>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <table style="width:100%">
                  <tr>
                    <th>Nama Barang</th>
                    <th>Harga</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                  </tr>
                  ${this.cart.map(item => `
                    <tr>
                      <td>${item.nama}</td>
                      <td>${formatIDR(item.harga)}</td>
                      <td>${item.qty}</td>
                      <td>${formatIDR(item.subtotal)}</td>
                    </tr>
                  `).join('')}
                </table>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 text-end">
                <h5>=====================================</h5>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 text-end">
                <h6>Total Pembelian: ${formatIDR(total)}</h6>
                <h6>Pajak 11%: ${formatIDR(tax)}</h6>
                <h6>Total Pembayaran: ${formatIDR(grandTotal)}</h6>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  
    receiptWindow.document.open();
    receiptWindow.document.write(receiptContent);
    receiptWindow.document.close();
  }
}

// Fetch JSON data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const productContainer = document.getElementById('menuCards');
    const cart = new Cart();

    data.barang.forEach(item => {
      const product = new Product(item);
      const card = product.createCard();
      productContainer.appendChild(card);

      card.addEventListener('click', function (e) {
        const qtyElement = e.target.closest('.card').querySelector('.qty');
        if (e.target.classList.contains('plusBtn')) {
          qtyElement.value = parseInt(qtyElement.value) + 1;
        }
        if (e.target.classList.contains('minusBtn')) {
          if (qtyElement.value > 0) {
            qtyElement.value = parseInt(qtyElement.value) - 1;
          }
        }
        if (e.target.classList.contains('addCartBtn')) {
          cart.addToCart(product, parseInt(qtyElement.value));
          qtyElement.value = 0;
        }
      });
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

function formatIDR(number) {
  if (typeof number !== 'number') {
    return 'Invalid Input';
  }

  const formattedNumber = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(number);

  return formattedNumber;
}