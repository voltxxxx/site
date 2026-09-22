/* ROSE FREITAS — main.js
   Funcionalidades compartilhadas do protótipo (sem backend). */

document.addEventListener("DOMContentLoaded", () => {

  /* ---- Menu mobile (hambúrguer) ---- */
  const burger = document.querySelector(".burger");
  const navMain = document.querySelector(".nav-main");
  if (burger && navMain) {
    burger.addEventListener("click", () => {
      navMain.classList.toggle("open");
      burger.setAttribute("aria-expanded", navMain.classList.contains("open"));
    });
  }

  /* ---- Marca link ativo no menu conforme a página atual ---- */
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-main a, .app-side nav a").forEach(a => {
    if (a.getAttribute("href") === current) a.classList.add("active");
  });

  /* ---- Accordion (perguntas frequentes / módulos do curso) ---- */
  document.querySelectorAll(".accordion-trigger").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".accordion-item");
      const panel = item.querySelector(".accordion-panel");
      const isOpen = item.classList.contains("open");

      // fecha os irmãos do mesmo accordion (comportamento tipo "sanfona")
      const group = item.parentElement;
      if (group && group.dataset.exclusive === "true") {
        group.querySelectorAll(".accordion-item.open").forEach(other => {
          if (other !== item) {
            other.classList.remove("open");
            other.querySelector(".accordion-panel").style.maxHeight = null;
          }
        });
      }

      item.classList.toggle("open", !isOpen);
      panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
    });
  });

  /* ---- Tabs ---- */
  document.querySelectorAll(".tabs-nav").forEach(nav => {
    const buttons = nav.querySelectorAll("button");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const target = btn.dataset.tab;
        const container = nav.parentElement;
        container.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
        container.querySelector(`#${target}`)?.classList.add("active");
      });
    });
  });

  /* ---- Busca de cursos (filtro simples client-side) ---- */
  const search = document.querySelector("#courseSearch");
  if (search) {
    search.addEventListener("input", () => {
      const term = search.value.trim().toLowerCase();
      document.querySelectorAll("[data-course-name]").forEach(card => {
        const name = card.dataset.courseName.toLowerCase();
        card.style.display = name.includes(term) ? "" : "none";
      });
    });
  }

  /* ---- Botão voltar ao topo ---- */
  const backTop = document.querySelector("#backTop");
  if (backTop) {
    window.addEventListener("scroll", () => {
      backTop.classList.toggle("show", window.scrollY > 500);
    });
    backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---- Utilidade genérica p/ formulários de demonstração ---- */
  document.querySelectorAll("[data-demo-form]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const msg = form.querySelector(".form-msg");
      if (msg) {
        msg.textContent = form.dataset.successMsg || "Enviado com sucesso!";
        msg.classList.remove("err");
        msg.classList.add("show", "ok");
      }
      form.reset();
    });
  });

});

/* FUTURA INTEGRAÇÃO COM BACKEND
   Estas funções (auth.js, courses.js, checkout.js, student.js, admin.js)
   deverão futuramente chamar uma API real em vez de localStorage. */
