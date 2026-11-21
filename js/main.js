(function () {
  "use strict";

  document.querySelectorAll("[data-login-required]").forEach(function (control) {
    control.addEventListener("click", function (event) {
      event.preventDefault();
      alert("Vui lòng đăng nhập để tiếp tục!");
      window.location.href = control.dataset.loginTarget || control.getAttribute("href") || "login.html";
    });
  });

  var addressRadios = document.querySelectorAll('input[name="address"]');
  var newAddressFields = document.getElementById("new-address-fields");
  if (addressRadios.length && newAddressFields) {
    var toggleNewAddress = function () {
      var selected = document.querySelector('input[name="address"]:checked');
      newAddressFields.classList.toggle("is-hidden", !selected || selected.value !== "new");
    };
    addressRadios.forEach(function (radio) {
      radio.addEventListener("change", toggleNewAddress);
    });
    toggleNewAddress();
  }

  var categoryNav = document.getElementById("category-nav");
  var productNav = document.querySelector('.main-nav a[href="products.html#loai-san-pham"]');

  if (productNav && !categoryNav) {
    var siteHeader = document.querySelector(".site-header");
    if (siteHeader) {
      var categoryItems = [
        ["Tất cả", "tat-ca"],
        ["Sổ &amp; Giấy", "so-giay"],
        ["Bút viết", "but-viet"],
        ["Dụng cụ học tập", "dung-cu-hoc-tap"],
        ["Dụng cụ văn phòng", "dung-cu-van-phong"],
        ["Mỹ thuật", "my-thuat"],
        ["Phụ kiện bàn học", "phu-kien-ban-hoc"]
      ];
      categoryNav = document.createElement("div");
      categoryNav.className = "category-nav is-hidden";
      categoryNav.id = "category-nav";
      categoryNav.innerHTML = '<div class="container"><nav class="category-tabs" aria-label="Loại sản phẩm">' +
        categoryItems.map(function (item, index) {
          return '<a class="' + (index === 0 ? "is-active" : "") + '" href="products.html#' + item[1] + '"' +
            (index === 0 ? ' aria-current="page"' : "") + ">" + item[0] + "</a>";
        }).join("") + "</nav></div>";
      siteHeader.insertAdjacentElement("afterend", categoryNav);
    }
  }

  if (categoryNav && productNav) {
    var hideCategoriesTimer = 0;
    var openCategories = function () {
      window.clearTimeout(hideCategoriesTimer);
      categoryNav.classList.remove("is-hidden");
    };
    var closeCategories = function () {
      hideCategoriesTimer = window.setTimeout(function () {
        categoryNav.classList.add("is-hidden");
      }, 150);
    };
    productNav.addEventListener("mouseenter", openCategories);
    productNav.addEventListener("focus", openCategories);
    productNav.addEventListener("mouseleave", closeCategories);
    productNav.addEventListener("blur", closeCategories);
    categoryNav.addEventListener("mouseenter", openCategories);
    categoryNav.addEventListener("mouseleave", closeCategories);
    categoryNav.addEventListener("focusin", openCategories);
    categoryNav.addEventListener("focusout", function (event) {
      if (!categoryNav.contains(event.relatedTarget)) {
        closeCategories();
      }
    });
  }

  document.querySelectorAll("[data-demo-message]").forEach(function (button) {
    button.addEventListener("click", function () {
      alert(button.dataset.demoMessage);
    });
  });

  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      alert(form.dataset.submitMessage || "Thao tác thành công!");
      if (form.dataset.redirect) {
        window.location.href = form.dataset.redirect;
      }
    });
  });

  document.querySelectorAll("[data-logout]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (confirm("Bạn có chắc muốn đăng xuất không?")) {
        alert("Đăng xuất thành công!");
        window.location.href = "index.html";
      }
    });
  });

  document.querySelectorAll("[data-modal-open]").forEach(function (button) {
    button.addEventListener("click", function () {
      var modal = document.getElementById(button.dataset.modalOpen);
      if (modal) {
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
      }
    });
  });

  document.querySelectorAll("[data-modal-close]").forEach(function (button) {
    button.addEventListener("click", function () {
      var modal = button.closest(".modal");
      if (modal) {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
      }
    });
  });

  document.querySelectorAll(".modal").forEach(function (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      document.querySelectorAll(".modal.is-open").forEach(function (modal) {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
      });
    }
  });
})();
