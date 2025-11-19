import { LayersControl, MapContainer, Marker, Popup, TileLayer, useMapEvents, Polygon, Polyline } from "react-leaflet";
import L, { Layer } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";
const defaultIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const markerList = [
    { "id": 1, "name": "Cửa hàng A", "lat": 21.03, "lng": 105.85 },
    { "id": 2, "name": "Cửa hàng B", "lat": 21.04, "lng": 105.83 }
]

const RenderMarkers = () => {
    const [markers, setMarkers] = useState(markerList);
    useEffect(() => {
        async function fetchMarkers() {
            try {


                // Giả sử fetch từ API
                const response = await axios.get('https://api.example.com/markers');
                if (response.status === 200) {
                    setMarkers(response.data);
                }
            } catch (error) {
                console.error("Lỗi khi fetch markers:", error);

            }}
            fetchMarkers();
        }, []);

    return markers.map((marker) => (
        <Marker key={marker.id} position={[marker.lat, marker.lng]} icon={defaultIcon}>
            <Popup>{marker.name}</Popup>
        </Marker>
    ));
}

export const MakerOnClick = () => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
        }
    });
    return (
        position === null ? null :
            <Marker position={position} icon={defaultIcon} >
                <Popup>Lat: {position[0]}, lng: {position[1]}</Popup>
            </Marker>
    );
}
function ClickHandler({ onAddPoint }) {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            onAddPoint([lat, lng]);
        },
    });
    return null;
}
const MapInterface = () => {
    const [points, setPoints] = useState([]);

    const handleAddPoint = (latlng) => {
        setPoints((prev) => {
            // Nếu đã có 2 điểm rồi thì bắt đầu lại từ đầu với điểm mới
            if (prev.length >= 2) {
                return [latlng];
            }
            return [...prev, latlng];
        });
    };
    return (
        <div>
            <MapContainer center={[21.0278, 105.8342]} zoom={13} style={{ height: "1000px", width: "100%" }}>
                <LayersControl >
                    <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">

                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Stamen Toner">
                        <TileLayer url="https://tiles.stadiamaps.com/tiles/stamen_toner_dark/{z}/{x}/{y}{r}.png" />
                    </LayersControl.BaseLayer>
                </LayersControl>
                <Polygon positions={[[21.03, 105.8], [21.05, 105.82], [21.04, 105.85], [21.02, 105.84]]} color="blue" />
                <Marker position={[21.0278, 105.8342]} icon={defaultIcon} >
                    <Popup>Hồ Hoàn Kiếm</Popup>
                </Marker>
                <MakerOnClick />
                <RenderMarkers />
                {points.map((pos, idx) => (
                    <Marker key={idx} position={pos} icon={defaultIcon}>
                        <Popup>
                            Điểm {idx + 1}
                            <br />
                            Lat: {pos[0].toFixed(5)}, Lng: {pos[1].toFixed(5)}
                        </Popup>
                    </Marker>
                ))}

                {/* Vẽ đường nối 2 điểm nếu đủ 2 point */}
                {points.length === 2 && (
                    <Polyline positions={points} pathOptions={{ weight: 4 }} />
                )}
                <ClickHandler onAddPoint={handleAddPoint} />
            </MapContainer>
        </div>
    )
};

export default MapInterface;