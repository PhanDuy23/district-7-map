import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import tiles from "../map.json";

export default function MultiZoomLayer() {
  const map = useMap();

  useEffect(() => {
    function renderTiles() {
      const currentZoom = String(map.getZoom()); // giả sử bạn set zoom = 12,13,...

      // Xoá các layer cũ do mình thêm
      map.eachLayer((layer) => {
        if (layer.options && layer.options.customTile) {
          map.removeLayer(layer);
        }
      });

      if (!tiles[currentZoom]) return;

      // ---- TÍNH LƯỚI THEO JSON ----
      const tileSize = 256;

      const xList = Object.keys(tiles[currentZoom]).sort(
        (a, b) => Number(a) - Number(b)
      );
      const firstX = xList[0];

      const yList = Object.keys(tiles[currentZoom][firstX]).sort(
        (a, b) =>
          Number(a.replace(".png", "")) - Number(b.replace(".png", ""))
      );

      const cols = xList.length;
      const rows = yList.length;

      const originX = -(cols * tileSize) / 2;
      const originY = -(rows * tileSize) / 2;

      xList.forEach((x, colIndex) => {
        yList.forEach((yFile, rowIndex) => {
          const top = originY + rowIndex * tileSize;
          const left = originX + colIndex * tileSize;

          L.imageOverlay(
            `/quan72023/${currentZoom}/${x}/${yFile}`,
            [
              [top, left],
              [top + tileSize, left + tileSize],
            ],
            { customTile: true }
          ).addTo(map);
        });
      });
    }

    renderTiles();

    // re-render khi zoom đổi
    map.on("zoomend", renderTiles);
    return () => map.off("zoomend", renderTiles);
  }, [map]);

  return null;
}
