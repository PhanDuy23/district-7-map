import L from "leaflet";

export const PDFTileLayer = L.GridLayer.extend({
  createTile(coords) {
    const { x, y, z } = coords;

    const tile = document.createElement("img");
    tile.src = `/quan72023/${z}/${x}/${y}.png`;
    tile.style.width = "100%";
    tile.style.height = "100%";
    tile.alt = "";

    return tile;
  }
});
