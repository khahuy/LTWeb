(function () {
  "use strict";

  document.querySelectorAll("[data-login-required]").forEach(function (control) {
    control.addEventListener("click", function (event) {
      event.preventDefault();
      alert("Vui lòng đăng nhập để tiếp tục!");
      window.location.href = control.dataset.loginTarget || control.getAttribute("href") || "login.html";
    });
  });

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
