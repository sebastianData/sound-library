const defaultData = {
  author: "William Thomas",
  title: "Power of Love",
  status: "planned",
};

const Library = function (playlistElement) {
  this.items = [];
  this.playlist = document.getElementById(playlistElement);
  this.items.push(defaultData);
  this.render();
};

Library.prototype.add = function (item) {
  if (item.author && item.title && item.status) {
    this.items.push(item);
    this.render();
  }
};

Library.prototype.remove = function (i) {
  this.items.splice(i.dataset.id, 1);
  this.render();
};

Library.prototype.render = function () {
  let self = this;
  self.clear();

  self.items.forEach((n, i) => {
    let item = document.createElement("div");
    item.setAttribute("data-id", i);
    item.innerHTML =
      "<div>" +
      n.author +
      "</div><div>" +
      n.title +
      "</div><div>" +
      n.status +
      "</div><div class='item--delete'>delete</div>";
    item.className = "item";

    self.playlist.appendChild(item);
    item.querySelector(".item--delete").addEventListener("click", function () {
      self.remove(item);
    });
  });
};

Library.prototype.clear = function () {
  this.playlist.querySelectorAll(".item").forEach((item) => {
    this.playlist.removeChild(item);
  });
};

const playlist = new Library("playlist");
const form = document.querySelector("#library-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  playlist.add(data);
  form.reset();
});
