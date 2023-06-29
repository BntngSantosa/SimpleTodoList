const btn = document.querySelector(".btn");
const list = document.querySelector(".text-list");

btn.addEventListener("click", () => {
  const tArea = document.querySelector("#t-area");
  const text = tArea.value;
  const failed = document.getElementById("failednone");
  const btnFailed = document.querySelector(".btn-failed");
  const success = document.getElementById("successnone");
  const btnSuccess = document.querySelector(".btn-success");

  if (text == "") {
    failed.id = "failed";
    return btnFailed.addEventListener("click", () => {
      failed.id = "failednone";
    });
  }

  success.id = "success";

  btnSuccess.addEventListener("click", () => {
    success.id = "successnone";
  });

  const newUl = document.createElement("ul");

  const newLi = document.createElement("li");
  const tLi = document.createTextNode(text);

  const newI = document.createElement("i");
  newI.setAttribute("class", "delete fa-solid fa-trash");

  newLi.appendChild(tLi);

  newUl.appendChild(newLi);
  newUl.appendChild(newI);

  list.appendChild(newUl);

  tArea.value = "";

  // Menyimpan data ke localStorage
  const savedData = localStorage.getItem("savedData") ? JSON.parse(localStorage.getItem("savedData")) : [];
  savedData.push(text);
  localStorage.setItem("savedData", JSON.stringify(savedData));
});

// Memulihkan data saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  const savedData = localStorage.getItem("savedData");

  if (savedData) {
    const data = JSON.parse(savedData);

    data.forEach((text) => {
      const newUl = document.createElement("ul");

      const newLi = document.createElement("li");
      const tLi = document.createTextNode(text);

      const newI = document.createElement("i");
      newI.setAttribute("class", "delete fa-solid fa-trash");

      newLi.appendChild(tLi);

      newUl.appendChild(newLi);
      newUl.appendChild(newI);

      list.appendChild(newUl);
    });
  }
});

list.addEventListener("click", (e) => {

  const container = document.querySelector("#containernone");
  const btnOke = document.querySelector(".btn-oke");
  const btnCancl = document.querySelector(".btn-cancel");

  if (e.target.classList.contains("delete")) {

    container.id = "container";

    btnOke.addEventListener("click", () => {

      e.target.parentElement.remove();
      container.id = "containernone";

      // Menghapus data dari localStorage
      const savedData = localStorage.getItem("savedData");

      if (savedData) {

        const data = JSON.parse(savedData);
        const text = e.target.previousSibling.textContent;
        const index = data.indexOf(text);

        if (index !== -1) {
          data.splice(index, 1);
          localStorage.setItem("savedData", JSON.stringify(data));
        }
      }
    });
  }

  btnCancl.addEventListener("click", () => {
    
    container.id = "containernone";
  });
});

// darkmode
const body = document.body;
const i = document.querySelector("nav i");

i.addEventListener("click", () => {

  i.classList.toggle("fa-sun");
  i.classList.toggle("fa-moon");
  body.classList.toggle("dark-mode");

});