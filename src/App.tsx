import GeojsonInput from "./components/GeojsonInput";
import LeafletMap from "./components/LeafletMap";

const App = () => {
  return (
    <div dir="rtl" className="flex flex-row w-full h-full">
      <GeojsonInput />
      <LeafletMap />
    </div>
  );
};

export default App;
