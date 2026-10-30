(function () {
  "use strict";

  var editDataElement = document.getElementById("admin-edit-data");
  var editData = editDataElement ? JSON.parse(editDataElement.textContent) : {};

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

  function allowedOrderStatus(field) {
    var transitions = {
      "Chưa xác nhận": ["Chưa xác nhận", "Đã xác nhận", "Hủy"],
      "Đã xác nhận": ["Đã xác nhận", "Đã giao", "Hủy"],
      "Đã giao": ["Đã giao"],
      "Hủy": ["Hủy"]
    };
    return transitions[field.dataset.initialStatus].indexOf(field.value) !== -1;
  }

  document.querySelectorAll("[data-order-status]").forEach(function (field) {
    field.addEventListener("change", function () {
      if (!allowedOrderStatus(field)) {
        field.value = field.dataset.initialStatus;
        alert("Không thể chuyển đơn hàng về trạng thái trước hoặc mở lại đơn đã kết thúc!");
      }
    });
  });

  document.querySelectorAll("input[type=file]").forEach(function (field) {
    field.addEventListener("change", function () {
      var modal = field.closest(".modal");
      var preview = modal && modal.querySelector("[data-current-image]");
      if (!preview) return;
      var file = field.files[0];
      preview.src = preview.dataset.originalSrc || "";
      preview.alt = preview.dataset.originalAlt || "";
      preview.hidden = !preview.dataset.originalSrc;
      if (!file) return;
      if (file.type.indexOf("image/") !== 0) {
        field.value = "";
        alert("Vui lòng chọn một tệp hình ảnh!");
        return;
      }
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        if (field.files[0] !== file || !modal.classList.contains("is-open")) return;
        preview.src = reader.result;
        preview.alt = "Ảnh đã chọn: " + file.name;
        preview.hidden = false;
      });
      reader.readAsDataURL(file);
    });
  });

  function prepareEditor(modal, button) {
    var form = modal.querySelector("form");
    if (!form) return;
    form.reset();
    var code = button.dataset.editCode;
    var record = code ? editData[code] : null;
    var type = modal.id.replace("-modal", "");
    var titles = { product: "sản phẩm", category: "loại sản phẩm", user: "khách hàng" };
    modal.querySelector("h2").textContent = (record ? "Sửa " : "Thêm ") + titles[type] + (record ? " · " + code : "");
    modal.querySelectorAll("[data-edit-field]").forEach(function (field) {
      var key = field.dataset.editField;
      field.value = record && record[key] != null ? record[key] : (field.dataset.newValue || "");
    });
    if (type === "user") {
      form.dataset.submitMessage = record ? "Cập nhật khách hàng thành công!" : "Thêm khách hàng thành công!";
      form.querySelector("button[type=submit]").textContent = record ? "Lưu thay đổi" : "Thêm khách hàng";
    }
    modal.querySelectorAll("[data-money]").forEach(formatMoneyInput);
    var preview = modal.querySelector("[data-current-image]");
    if (preview) {
      preview.dataset.originalSrc = record && record.image ? record.image : "";
      preview.dataset.originalAlt = record ? "Hình hiện tại của " + record.name : "";
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
      if (button.hasAttribute("data-order-save")) {
        var status = button.closest("tr").querySelector("[data-order-status]");
        if (!allowedOrderStatus(status)) {
          alert("Trạng thái đơn hàng không hợp lệ!");
          return;
        }
      }
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
