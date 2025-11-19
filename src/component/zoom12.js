import { MapContainer, ImageOverlay } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Zoom12() {
  return (
    <MapContainer
      crs={L.CRS.Simple}
      center={[384, 384]}   // Center giữa 768 x 768
      zoom={0}
      minZoom={-2}
      maxZoom={2}
      style={{ height: "100vh", width: "100%" }}
    >

      {/* --- ROW 0 (Y = 4340) --- */}

      {/* Col 0: x=6523, y=4340 */}
      <ImageOverlay
        url="/quan72023/13/6523/4340.png"
        bounds={[[0, 0], [256, 256]]}
      />

      {/* Col 1: x=6524 */}
      <ImageOverlay
        url="/quan72023/13/6524/4340.png"
        bounds={[[0, 256], [256, 512]]}
      />

      {/* Col 2: x=6525 */}
      <ImageOverlay
        url="/quan72023/13/6525/4340.png"
        bounds={[[0, 512], [256, 768]]}
      />


      {/* --- ROW 1 (Y = 4341) --- */}

      <ImageOverlay
        url="/quan72023/13/6523/4341.png"
        bounds={[[256, 0], [512, 256]]}
      />

      <ImageOverlay
        url="/quan72023/13/6524/4341.png"
        bounds={[[256, 256], [512, 512]]}
      />

      <ImageOverlay
        url="/quan72023/13/6525/4341.png"
        bounds={[[256, 512], [512, 768]]}
      />


      {/* --- ROW 2 (Y = 4342) --- */}

      <ImageOverlay
        url="/quan72023/13/6523/4342.png"
        bounds={[[512, 0], [768, 256]]}
      />

      <ImageOverlay
        url="/quan72023/13/6524/4342.png"
        bounds={[[512, 256], [768, 512]]}
      />

      <ImageOverlay
        url="/quan72023/13/6525/4342.png"
        bounds={[[512, 512], [768, 768]]}
      />

    </MapContainer>
  );
}
