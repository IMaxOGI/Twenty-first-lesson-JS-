const STICKER_URL = "https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers/";

const stickerList = document.getElementById("block_with_stikers");

document.addEventListener("click", onClick);
document.getElementById("add_btn_id").addEventListener("click", onFormSubmit);
stickerList.addEventListener("focusout", onFocus);

let notesList = [];

function onClick(e) {
  if (e.target.matches(".delete_btn")) {
    deleteSticker(e.target);
  }
}

function onFocus(e) {
  if (e.target.matches(".sticker_place")) {
    updateNote(e.target);
  }
}

init();

function init() {
  getStickers();
}

function getStickers() {
  return fetch(STICKER_URL)
    .then((res) => res.json())
    .then((data) => (notesList = data))
    .then(renderStickers);
}

function renderStickers(list) {
  stickerList.innerHTML = "";
  list.forEach(
    (stickers) =>
      (stickerList.innerHTML += `<div data-id="${stickers.id}" class="block_stickers">
      <div class="delete_btn">&#10008</div>
      <textarea class="sticker_place" name="sticker" cols="30" rows="10">${stickers.description}</textarea>
    </div>\n`)
  );
}

function onFormSubmit(e) {
  e.preventDefault();
  submitForm();
  console.log("submited");
}

function submitForm() {
  const stickerObj = {
    description: "",
  };
  console.log("submited");
  addSticker(stickerObj).then(getStickers);
}

function addSticker(sticker) {
  return fetch(STICKER_URL, {
    method: "POST",
    body: JSON.stringify(sticker),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => console.error("Error occured in addSticker: ", error));
}

function deleteSticker(target) {
  const dataId = target.closest(".block_stickers").dataset.id;
  fetch(STICKER_URL + dataId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(getStickers)
    .catch((error) => console.error("Error occured in deleteSticker: ", error));
}

function updateNote(target) {
  const stickerObj = {
    description: target.value,
  };
  const dataId = target.closest(".block_stickers").dataset.id;
  fetch(STICKER_URL + dataId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stickerObj),
  }).then(getStickers);
}
