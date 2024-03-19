import { Dispatch, SetStateAction, createContext, useState } from "react";
import GeojsonInput from "./components/GeojsonInput";
import LeafletMap from "./components/LeafletMap";

interface MyContextType {
  geoJson: any[];
  setGeoJson: Dispatch<SetStateAction<any[]>>;
}

export const Context = createContext<MyContextType>({
  geoJson: [],
  setGeoJson: () => {},
});

const App = () => {
  const [geoJson, setGeoJson] = useState<any[]>([]);

  return (
    <div dir="rtl" className="flex flex-row w-full h-full gap-12 p-10">
      <Context.Provider value={{ geoJson, setGeoJson }}>
        <GeojsonInput />
        <LeafletMap />
      </Context.Provider>
    </div>
  );
};

export default App;
