(function () {
  "use strict";

  var categorySubtitle = document.getElementById("category-subtitle");
  var categoryNav = document.getElementById("category-nav");
  var categoryTabs = document.querySelectorAll(".category-tabs a");

  if (categoryNav) {
    var setActiveCategory = function (tab, showSubtitle) {
      categoryTabs.forEach(function (item) {
        item.classList.remove("is-active");
        item.removeAttribute("aria-current");
      });
      if (!tab) {
        if (categorySubtitle) categorySubtitle.classList.add("is-hidden");
        return;
      }
      tab.classList.add("is-active");
      tab.setAttribute("aria-current", "page");
      if (categorySubtitle) {
        categorySubtitle.textContent = showSubtitle ? (tab.dataset.subtitle || "") : "";
        categorySubtitle.classList.toggle("is-hidden", !showSubtitle);
      }
    };

    if (categorySubtitle) {
      var syncCategoryFromHash = function () {
        var hash = window.location.hash;
        if (!hash) return;
        if (hash === "#loai-san-pham") {
          categoryNav.classList.remove("is-hidden");
          setActiveCategory(categoryTabs[0], false);
          return;
        }
        var match = null;
        categoryTabs.forEach(function (tab) {
          var href = tab.getAttribute("href") || "";
          if (href.slice(href.indexOf("#")) === hash) match = tab;
        });
        if (match) {
          categoryNav.classList.remove("is-hidden");
          setActiveCategory(match, true);
        }
      };

      syncCategoryFromHash();
      window.addEventListener("hashchange", syncCategoryFromHash);

      categoryTabs.forEach(function (tab) {
        tab.addEventListener("click", function (event) {
          event.preventDefault();
          var target = tab.getAttribute("href");
          if (!target) return;
          window.location.href = target;
          window.setTimeout(function () {
            window.location.reload();
          }, 0);
        });
      });
    }
  }

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
