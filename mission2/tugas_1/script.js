// Fetch JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const cardContainer = document.getElementById('menuCards');
        
        // Loop through the data and create cards
        data.barang.forEach(item => {
            const harga = parseInt(item.harga);
            const card = document.createElement('div');
            card.className = 'col-md-3';
            card.innerHTML = `
                <div class="card w-75 mb-3">
                    <img src="${item.image}" width="20" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h6 class="card-title fw-bold nama-barang" >${item.namaBarang}</h6>
                        <p class="card-text harga-barang" value="${item.harga}">${formatIDR(harga)}</p>
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
                            <button type="button" value="${item.id}" class="btn btn-success addCartBtn">Tambah Barang</button>
                          </div>
                    </div>
                </div>
            `;
            
            cardContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

const cart = [];

menuCards.addEventListener("click", function(e){
  
  const qtyElement = e.target.closest('.card-body').querySelector('.qty');
  if (e.target.classList.contains('plusBtn')){
    qtyElement.value = parseInt(qtyElement.value) + 1;
  }
  if (e.target.classList.contains('minusBtn')){
    if(qtyElement.value > 0){
      qtyElement.value = parseInt(qtyElement.value) - 1;
    }
  }
  if (e.target.classList.contains('addCartBtn')){
    const id = e.target.closest('.card-body').querySelector('.addCartBtn');
    const img = e.target.closest('.card').querySelector('.card-img-top').getAttribute('src');
    const nama = e.target.closest('.card-body').querySelector('.nama-barang').textContent;
    const harga = e.target.closest('.card-body').querySelector('.harga-barang').getAttribute('value');
    const qty = e.target.closest('.card-body').querySelector('.qty');
    const subtotal = parseInt(harga) * parseInt(qty.value);
    const barang = {
      id: id.value,
      img: img,
      nama: nama,
      harga: harga,
      qty: qty.value,
      subtotal : subtotal
    };
    
    cart.push(barang);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);

    
    displayCart(barang, qtyElement);
    displayTotal(cart);
  }
});

function displayCart(barang, qtyElement){
  const cartList = document.getElementById('cart-list');
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
      cartList.appendChild(cartItem);
      qtyElement.value = 0;
}

function displayTotal(cart){
    const total = cart.reduce((acc, curr) => acc + curr.subtotal, 0);
    const pajak = total * 0.11;
    const grandTotal = total + pajak;
    const displayTotal = document.getElementById('total');
    displayTotal.innerHTML = `
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
      </div>
    </div>`; 
}

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