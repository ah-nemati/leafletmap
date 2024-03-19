const useExportJson = (data: any) => {
  const downloadGeoJson = () => {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.geojson";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return downloadGeoJson;
};

export default useExportJson;
