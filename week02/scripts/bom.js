const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

button.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = input.value;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.setAttribute("aria-label", `Remove ${input.value}`);

    li.append(deleteButton);

    list.append(li);

    input.value = "";

    input.focus();

    deleteButton.addEventListener("click", () => {
      list.removeChild(li);
      input.focus();
    });
  } else {
    alert("Please enter a chapter before adding!");
    input.focus();
  }
});
