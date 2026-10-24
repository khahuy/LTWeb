(function () {
  "use strict";

  var editDataElement = document.getElementById("admin-edit-data");
  var editData = editDataElement ? JSON.parse(editDataElement.textContent) : {};

  document.querySelectorAll("[data-profit-percent]").forEach(function (field) {
    field.addEventListener("input", function () {
      if (Number(field.value) < 0) field.value = "0";
    });
    field.addEventListener("change", function () {
      if (field.value === "" || !Number.isFinite(Number(field.value)) || Number(field.value) < 0) field.value = "0";
    });
  });

  function formatMoneyInput(field) {
    var raw = field.value;
    var caret = typeof field.selectionStart === "number" ? field.selectionStart : raw.length;
    var digitsBeforeCaret = raw.slice(0, caret).replace(/\D/g, "").length;
    var digits = raw.replace(/\D/g, "");
    var leadingZeros = (digits.match(/^0+(?=\d)/) || [""])[0].length;
    digits = digits.slice(leadingZeros);
    field.value = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (document.activeElement === field && field.setSelectionRange) {
      var wanted = Math.max(0, digitsBeforeCaret - leadingZeros);
      var nextCaret = 0;
      var seen = 0;
      while (nextCaret < field.value.length && seen < wanted) {
        if (/\d/.test(field.value.charAt(nextCaret))) seen += 1;
        nextCaret += 1;
      }
      field.setSelectionRange(nextCaret, nextCaret);
    }
  }

  document.querySelectorAll("[data-money]").forEach(function (field) {
    formatMoneyInput(field);
    field.addEventListener("input", function () { formatMoneyInput(field); });
  });

  function prepareEditor(modal, button) {
    var form = modal.querySelector("form");
    if (!form) return;
    form.reset();
    var code = button.dataset.editCode;
    var record = code ? editData[code] : null;
    var type = modal.id.replace("-modal", "");
    var titles = { product: "sản phẩm", category: "loại sản phẩm", import: "phiếu nhập", user: "khách hàng" };
    modal.querySelector("h2").textContent = (record ? "Sửa " : "Thêm ") + titles[type] + (record ? " · " + code : "");
    modal.querySelectorAll("[data-edit-field]").forEach(function (field) {
      var key = field.dataset.editField;
      field.value = record && record[key] != null ? record[key] : (field.dataset.newValue || "");
    });
    modal.querySelectorAll("[data-money]").forEach(formatMoneyInput);
    var preview = modal.querySelector("[data-current-image]");
    if (preview) {
      preview.hidden = !record || !record.image;
      if (record && record.image) {
        preview.src = record.image;
        preview.alt = "Hình hiện tại của " + record.name;
      } else {
        preview.removeAttribute("src");
        preview.alt = "";
      }
    }
  }

  document.querySelectorAll("[data-admin-logout]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (confirm("Bạn có chắc muốn đăng xuất khỏi khu vực Admin không?")) {
        alert("Đăng xuất Admin thành công!");
        window.location.href = "login.html";
      }
    });
  });

  document.querySelectorAll("[data-admin-action]").forEach(function (button) {
    button.addEventListener("click", function () {
      var message = button.dataset.adminAction || "Thao tác thành công!";
      var confirmMessage = button.dataset.confirm;
      if (!confirmMessage || confirm(confirmMessage)) {
        alert(message);
      }
    });
  });

  document.querySelectorAll("form[data-admin-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      alert(form.dataset.submitMessage || "Đã cập nhật dữ liệu mẫu!");
      var modal = form.closest(".modal");
      if (modal) {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
      }
      if (form.dataset.redirect) window.location.href = form.dataset.redirect;
    });
  });

  document.querySelectorAll("[data-modal-open]").forEach(function (button) {
    button.addEventListener("click", function (event) {
      if (button.tagName === "A") event.preventDefault();
      var modal = document.getElementById(button.dataset.modalOpen);
      if (modal) {
        prepareEditor(modal, button);
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
