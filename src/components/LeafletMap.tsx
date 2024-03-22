import { useContext, useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman";
import { Context } from "../App";

const LeafletMap = () => {
  const { geoJson, setGeoJson } = useContext(Context);
  const mapRef = useRef<L.Map | null>(null);
  const [isShapeAdded, setisShapeAdded] = useState(false);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("leafletmap").setView(
        [35.71036282327142, 51.39235916824567],
        13
      );
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

      map.pm.addControls({
        drawControls: true,
        editControls: true,
      });

      map.on("pm:create", (e) => {
        if (!isShapeAdded) {
          //@ts-ignore
          setGeoJson([...map.pm.getGeomanLayers(true).toGeoJSON().features]);
          setisShapeAdded(true);
        }
        e.layer.on("pm:edit", () => {
          //@ts-ignore
          setGeoJson([...map.pm.getGeomanLayers(true).toGeoJSON().features]);
        });
      });

      map.on("pm:remove", () => {
        //@ts-ignore
        setGeoJson([...map.pm.getGeomanLayers(true).toGeoJSON().features]);
        setisShapeAdded(false);
      });

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [setGeoJson]);

  useEffect(() => {
    if (mapRef.current) {
      const geoJsonLayer = L.geoJSON(geoJson).addTo(mapRef.current);
      return () => {
        if (mapRef.current && geoJsonLayer) {
          mapRef.current.removeLayer(geoJsonLayer);
          setisShapeAdded(false);
        }
      };
    }
  }, [geoJson]);

  useEffect(() => {
    if (isShapeAdded) {
      mapRef.current = null;
    }
  }, [isShapeAdded]);

  return (
    <div
      className="w-1/2 h-full border-[16px] rounded-md border-gray-100"
      id="leafletmap"
    ></div>
  );
};

export default LeafletMap;
