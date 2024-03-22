import { ChangeEvent, DragEvent, useContext, useEffect, useState } from "react";
import { Context } from "../App";
import useExportJson from "../hooks/useExportJson";

const GeojsonInput = () => {
  const [editedGeoJSON, setEditedGeoJSON] = useState("");

  const { geoJson, setGeoJson } = useContext(Context);
  const dowloadGeoJsonFile = useExportJson(geoJson);

  useEffect(() => {
    setGeoJson(geoJson);
    setEditedGeoJSON(JSON.stringify(geoJson, null, 2));
  }, [geoJson]);

  const handleGeoJSONChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedGeoJSON(event.target.value);
    setGeoJson(JSON.parse(event.target.value));
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file.type === "application/geo+json") {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = String(e.target?.result);
      setGeoJson(JSON.parse(content));
    };
    reader.readAsText(file);
    } else {
      alert("Please drop a valid GeoJSON file.");
    }
  };

  return (
    <div
      className="w-1/2 flex flex-col gap-4"
      onDrop={handleDrop}
      onDragOver={(event: DragEvent) => event.preventDefault()}
    >
      <button
        className="outline-none p-2 md:1/5 xl:w-1/3 w-full rounded-md bg-green-400 text-white"
        onClick={dowloadGeoJsonFile}
      >
        Export geoJson
      </button>
      <textarea
        dir="ltr"
        value={editedGeoJSON}
        onChange={handleGeoJSONChange}
        className="outline-none border-2 rounded-md text-gray-600 border-gray-300 p-6"
        style={{ width: "100%", minHeight: "100vh" }}
      />
    </div>
  );
};

export default GeojsonInput;
