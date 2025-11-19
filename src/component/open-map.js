import { MapContainer, ImageOverlay, useMapEvent, Marker, Popup, useMapEvents } from "react-leaflet";
import { useMap } from "react-leaflet";
import L from "leaflet";
import tiles from "../map.json";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
function HandleZoom({ center, setZoom }) {
  const map = useMap();

  const fixedZoom = 0;        // zoom cố định của MapContainer
  const minTileZoom = 12;     // giới hạn zoom ảo tối thiểu
  const maxTileZoom = 16;     // giới hạn zoom ảo tối đa

  const [zoomFocus, setZoomFocus] = useState(null);

  useMapEvents({
    zoomstart(e) {
      setZoomFocus(e.latlng);
    },

    zoomend() {
      const current = map.getZoom();

      if (current !== fixedZoom) {
        map.setZoom(fixedZoom, { animate: false });
      }

      setZoom((z) => {
        if (current > fixedZoom) return Math.min(z + (current - fixedZoom), maxTileZoom);
        if (current < fixedZoom) return Math.max(z - (fixedZoom - current), minTileZoom);
        return z;
      });

      // giữ center theo đúng điểm zoom vào
      if (zoomFocus) {
        map.panTo(zoomFocus, { animate: false });
      }
    },
  });

  return null;
}
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Map() {
  const [zoom, setZoom] = useState(12);
  const z = String(zoom);

  console.log("Render zoom level:", z);

  const tileSize = 526;

  const X = [...tiles[z].x].sort((a, b) => a - b);
  const Y = [...tiles[z].y].sort((a, b) => a - b);
  const cols = X.length;
  const rows = Y.length;

  const width = cols * tileSize;
  const height = rows * tileSize;
  const center = [height / 2, width / 2];

  return (
    <MapContainer
      crs={L.CRS.Simple}
      center={[center[0]-100,center[1]+200]}
      zoom={0}
      minZoom={-3}
      maxZoom={5}
      // maxBounds={[[0, 0], [height, width]]}
      //  maxBoundsViscosity={1.0}
      style={{ height: "100vh", width: "100%" }}
    >
      <HandleZoom center={center} setZoom={setZoom} />
 
      {X.map((x, colIndex) =>
        Y.map((y, rowIndex) => {
          const top = (rowIndex + 1) * tileSize;
          const left = colIndex * tileSize;
          console.log("top: " + top + ", left: " + left)
          return (
            <ImageOverlay
              key={`${x}-${y}`}
              url={`/quan72023/${z}/${x}/${y}.png`}
              bounds={[
                [top, left],
                [top - tileSize, left + tileSize]
              ]}
            />
          );
        })
      )}
      {/* <Marker key={1} position={[center[0]-100,center[1]+200]} icon={defaultIcon}>
        <Popup>chính giữa</Popup>
      </Marker>
      <Marker key={2} position={[0, 0]} icon={defaultIcon}>
        <Popup>Gốc</Popup>
      </Marker>
      <Marker key={10} position={[width, height]} icon={defaultIcon}>
        <Popup>max</Popup>
      </Marker> */}
    </MapContainer>
  );
}
