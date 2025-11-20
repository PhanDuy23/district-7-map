import { useMap, useMapEvents } from "react-leaflet";
import { useState } from "react";
export default function HandleZoom({ setZoom }) {
  const map = useMap();
  const [zoomFocus, setZoomFocus] = useState(null);

  const fixedZoom = 0;        // zoom cố định của MapContainer
  const minTileZoom = 12;     // giới hạn zoom ảo tối thiểu
  const maxTileZoom = 16;     // giới hạn zoom ảo tối đa

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