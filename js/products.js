(function () {
  "use strict";

  var products = {
    SP001: ["Sổ lò xo Campus B5", "42.000đ", "images/so-lo-xo-campus-b5.jpg", "Sổ B5 200 trang, giấy kẻ ngang, bìa nhựa bền.", "Sổ & Giấy"],
    SP002: ["Sổ tay bìa Kraft A5", "29.000đ", "images/so-tay-bia-kraft-a5.jpg", "Sổ A5 160 trang với bìa kraft tối giản.", "Sổ & Giấy"],
    SP003: ["Giấy note pastel 5 màu", "19.000đ", "images/giay-note-pastel-5-mau.jpg", "Giấy ghi chú năm màu pastel, 100 tờ.", "Sổ & Giấy"],
    SP004: ["Bút gel Thiên Long 0.5 mm", "12.000đ", "images/but-gel-thien-long-05.jpg", "Bút gel mực xanh, đầu bi 0.5 mm, viết êm.", "Bút viết"],
    SP005: ["Bút bi Zebra Sarasa Clip 0.5", "32.000đ", "images/but-zebra-sarasa-clip-05.jpg", "Bút bấm có kẹp, mực xanh nhanh khô.", "Bút viết"],
    SP006: ["Bút đánh dấu Stabilo Boss", "29.000đ", "images/but-highlight-stabilo-boss.jpg", "Bút đánh dấu màu vàng, đầu vát dễ sử dụng.", "Bút viết"],
    SP007: ["Thước kẻ nhựa 20 cm", "10.000đ", "images/thuoc-ke-nhua-20cm.jpg", "Thước nhựa trong, vạch chia rõ đến 20 cm.", "Dụng cụ học tập"],
    SP008: ["Bộ compa học sinh Deli", "58.000đ", "images/bo-compa-hoc-sinh-deli.jpg", "Bộ compa kèm ruột chì và hộp bảo quản.", "Dụng cụ học tập"],
    SP009: ["Gôm Pentel Hi-Polymer", "9.000đ", "images/gom-pentel-hi-polymer.jpg", "Gôm trắng mềm, tẩy sạch và ít vụn.", "Dụng cụ học tập"],
    SP010: ["Bấm kim số 10 Deli", "48.000đ", "images/bam-kim-so-10-deli.jpg", "Bấm kim nhỏ gọn, sử dụng kim số 10.", "Dụng cụ văn phòng"],
    SP011: ["Kéo văn phòng 17 cm", "39.000đ", "images/keo-van-phong-17cm.jpg", "Kéo lưỡi thép không gỉ, tay cầm êm.", "Dụng cụ văn phòng"],
    SP012: ["Băng keo trong 18 mm", "18.000đ", "images/bang-keo-trong-18mm.jpg", "Băng keo trong bản 18 mm dùng cho văn phòng.", "Dụng cụ văn phòng"],
    SP013: ["Bộ bút chì màu 24 màu", "135.000đ", "images/bo-but-chi-mau-24-mau.jpg", "Bộ 24 bút chì màu, màu sắc tươi và dễ pha.", "Mỹ thuật"],
    SP014: ["Màu nước Thiên Long 12 màu", "82.000đ", "images/mau-nuoc-thien-long-12-mau.jpg", "Bộ màu nước 12 màu kèm cọ vẽ.", "Mỹ thuật"],
    SP015: ["Sổ vẽ Sketch A4", "59.000đ", "images/so-ve-sketch-a4.jpg", "Sổ vẽ A4 giấy dày phù hợp bút chì và màu.", "Mỹ thuật"],
    SP016: ["Hộp bút vải canvas", "69.000đ", "images/hop-but-vai-canvas.jpg", "Hộp bút canvas hai ngăn, màu kem.", "Phụ kiện bàn học"],
    SP017: ["Khay cắm bút để bàn", "79.000đ", "images/khay-cam-but-de-ban.jpg", "Khay cắm bút nhiều ngăn giúp bàn học gọn hơn.", "Phụ kiện bàn học"],
    SP018: ["Bộ kẹp giấy màu", "19.000đ", "images/bo-kep-giay-mau.jpg", "Hộp kẹp giấy nhiều màu gồm 50 chiếc.", "Phụ kiện bàn học"]
  };

  document.querySelectorAll("[data-add-cart]").forEach(function (button) {
    button.addEventListener("click", function () {
      var name = button.dataset.addCart || "Sản phẩm";
      alert("Đã thêm “" + name + "” vào giỏ hàng mẫu!");
    });
  });

  var pageCards = document.querySelectorAll("[data-product-page]");
  if (pageCards.length) {
    var params = new URLSearchParams(window.location.search);
    var currentPage = Number(params.get("page")) || 1;
    if (currentPage < 1 || currentPage > 3) currentPage = 1;

    pageCards.forEach(function (card) {
      card.classList.toggle("is-hidden", Number(card.dataset.productPage) !== currentPage);
    });

    document.querySelectorAll("[data-page-link]").forEach(function (link) {
      link.classList.toggle("is-active", Number(link.dataset.pageLink) === currentPage);
      if (Number(link.dataset.pageLink) === currentPage) link.setAttribute("aria-current", "page");
    });

    var pageLabel = document.querySelector("[data-current-page-label]");
    if (pageLabel) pageLabel.textContent = "Trang " + currentPage + "/3 · 6 sản phẩm";
  }

  var searchCards = document.querySelectorAll("[data-search-page]");
  if (searchCards.length) {
    var searchParams = new URLSearchParams(window.location.search);
    var currentSearchPage = Number(searchParams.get("page")) || 1;
    if (currentSearchPage < 1 || currentSearchPage > 2) currentSearchPage = 1;

    searchCards.forEach(function (card) {
      card.classList.toggle("is-hidden", Number(card.dataset.searchPage) !== currentSearchPage);
    });

    document.querySelectorAll("[data-search-page-link]").forEach(function (link) {
      var isCurrent = Number(link.dataset.searchPageLink) === currentSearchPage;
      link.classList.toggle("is-active", isCurrent);
      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    var searchPageLabel = document.querySelector("[data-search-page-label]");
    if (searchPageLabel) searchPageLabel.textContent = "Trang " + currentSearchPage + "/2 · 6 sản phẩm";
  }

  var detailRoot = document.querySelector("[data-product-detail]");
  if (detailRoot) {
    var detailParams = new URLSearchParams(window.location.search);
    var productId = detailParams.get("id") || "SP001";
    var product = products[productId] || products.SP001;
    document.querySelector("[data-detail-name]").textContent = product[0];
    document.querySelector("[data-detail-price]").textContent = product[1];
    document.querySelector("[data-detail-description]").textContent = product[3];
    document.querySelector("[data-detail-category]").textContent = product[4];
    document.querySelectorAll("[data-detail-category]").forEach(function (field) {
      field.textContent = product[4];
    });
    var detailCode = document.querySelector("[data-detail-code]");
    if (detailCode) detailCode.textContent = products[productId] ? productId : "SP001";
    var detailImage = document.querySelector("[data-detail-image]");
    detailImage.src = product[2];
    detailImage.alt = product[0];
    var detailButton = document.querySelector("[data-detail-cart]");
    detailButton.dataset.addCart = product[0];
  }

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
