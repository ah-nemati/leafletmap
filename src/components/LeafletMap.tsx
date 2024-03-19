import { useContext, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman";
import { Context } from "../App";

const LeafletMap = () => {
  const { geoJson, setGeoJson } = useContext(Context);
  console.log(geoJson);

  useEffect(() => {
    const map = L.map("leafletmap").setView(
      [35.71036282327142, 51.39235916824567],
      13
    );
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    map.pm.addControls({
      drawControls: true,
      editControls: true,
      optionsControls: false,
      customControls: false,
      oneBlock: false,
    });

    map.on("pm:create", (e) => {
      //@ts-ignore
      setGeoJson([...map.pm.getGeomanLayers(true).toGeoJSON().features]);
      e.layer.on("pm:edit", () => {
        //@ts-ignore
        setGeoJson([...map.pm.getGeomanLayers(true).toGeoJSON().features]);
      });
    });

    map.on("pm:remove", () => {
      //@ts-ignore
      setGeoJson([...map.pm.getGeomanLayers(true).toGeoJSON().features]);
    });

    const geoJsonLayer = L.geoJSON(geoJson).addTo(map);

    return () => {
      map.remove();
      map.removeLayer(geoJsonLayer);
    };
  }, [geoJson]);

  return (
    <div
      className="w-1/2 h-full border-[16px] rounded-md border-gray-100"
      id="leafletmap"
    ></div>
  );
};

export default LeafletMap;
