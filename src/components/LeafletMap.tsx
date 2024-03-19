import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman";

const LeafletMap = () => {
  const [geoJson, setGeoJson] = useState<any[]>([]);

  useEffect(() => {
    const map = L.map("leafletmap").setView(
      [35.71036282327142, 51.39235916824567],
      13
    );
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    map.pm.addControls({
      drawControls: true,
      editControls: true,
      optionsControls: true,
      customControls: true,
      oneBlock: false,
    });

    
    return () => {
      map.remove();
    };
  }, [geoJson]);

  return <div className="w-1/2 h-full" id="leafletmap"></div>;
};

export default LeafletMap;
