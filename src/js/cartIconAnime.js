document.getElementById('addToCart').addEventListener('click', function() {
  // 你的加入購物車邏輯...
  const cartIcon = document.getElementById('cartIcon');
  cartIcon.classList.remove('cart-animate'); // 先移除，確保可重複觸發
  void cartIcon.offsetWidth; // 觸發重繪
  cartIcon.classList.add('cart-animate');
});

// 動畫結束後自動移除 class
document.getElementById('cartIcon').addEventListener('animationend', function() {
  this.classList.remove('cart-animate');
});