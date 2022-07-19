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

Library.prototype.remove = function (item) {};

Library.prototype.render = function () {
  this.clear();

  this.items.forEach((i) => {
    let item = document.createElement("div");
    item.innerHTML =
      "<div>" +
      i.author +
      "</div><div>" +
      i.title +
      "</div><div>" +
      i.status +
      "</div><div class='item--delete'>delete</div>";
    item.className = "item";

    this.playlist.appendChild(item);
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
