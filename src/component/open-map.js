import { MapContainer, ImageOverlay} from "react-leaflet";
import L from "leaflet";
import tiles from "../map.json";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import HandleZoom from "./handle-zoom";

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
      style={{ height: "100vh", width: "100%" }}
    >
      <HandleZoom setZoom={setZoom} />
 
      {X.map((x, colIndex) =>
        Y.map((y, rowIndex) => {
          const top = (rowIndex + 1) * tileSize;
          const left = colIndex * tileSize;
          console.log("top: " + top + ", left: " + left)
          return (
            <ImageOverlay
              key={`${x}-${y}`}
              url={`${process.env.PUBLIC_URL}/quan72023/${z}/${x}/${y}.png`}
              bounds={[
                [top, left],
                [top - tileSize, left + tileSize]
              ]}
            />
          );
        })
      )}
      
    </MapContainer>
  );
}
