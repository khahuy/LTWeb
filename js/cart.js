(function () {
  "use strict";

  function money(value) {
    return value.toLocaleString("vi-VN") + "đ";
  }

  function updateCart() {
    var subtotal = 0;
    document.querySelectorAll("[data-cart-row]").forEach(function (row) {
      var quantity = Number(row.querySelector("[data-cart-quantity]").value) || 1;
      var price = Number(row.dataset.price) || 0;
      var lineTotal = price * quantity;
      subtotal += lineTotal;
      row.querySelector("[data-line-total]").textContent = money(lineTotal);
    });

    var shipping = subtotal > 0 ? 15000 : 0;
    var subtotalElement = document.querySelector("[data-cart-subtotal]");
    var shippingElement = document.querySelector("[data-cart-shipping]");
    var totalElement = document.querySelector("[data-cart-total]");
    if (subtotalElement) subtotalElement.textContent = money(subtotal);
    if (shippingElement) shippingElement.textContent = money(shipping);
    if (totalElement) totalElement.textContent = money(subtotal + shipping);
  }

  document.querySelectorAll("[data-cart-minus], [data-cart-plus]").forEach(function (button) {
    button.addEventListener("click", function () {
      var row = button.closest("[data-cart-row]");
      var input = row.querySelector("[data-cart-quantity]");
      var value = Number(input.value) || 1;
      if (button.hasAttribute("data-cart-minus")) value = Math.max(1, value - 1);
      if (button.hasAttribute("data-cart-plus")) value += 1;
      input.value = value;
      updateCart();
    });
  });

  document.querySelectorAll("[data-cart-remove]").forEach(function (button) {
    button.addEventListener("click", function () {
      var row = button.closest("[data-cart-row]");
      var name = row.dataset.productName;
      if (confirm("Xóa “" + name + "” khỏi giỏ hàng mẫu?")) {
        alert("Xóa sản phẩm thành công!");
      }
    });
  });

  updateCart();
})();
