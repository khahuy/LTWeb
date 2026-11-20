(function () {
  "use strict";

  document.querySelectorAll("[data-add-cart]").forEach(function (button) {
    button.addEventListener("click", function () {
      var name = button.dataset.addCart || "Sản phẩm";
      alert("Đã thêm “" + name + "” vào giỏ hàng mẫu!");
    });
  });

  document.querySelectorAll("[data-quantity-minus], [data-quantity-plus]").forEach(function (button) {
    button.addEventListener("click", function () {
      var input = button.parentElement.querySelector("input");
      var value = Number(input.value) || 1;
      if (button.hasAttribute("data-quantity-minus")) value = Math.max(1, value - 1);
      if (button.hasAttribute("data-quantity-plus")) value += 1;
      input.value = value;
    });
  });
})();
