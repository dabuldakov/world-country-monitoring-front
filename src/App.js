import { useState } from "react";

import { GetMainTabs } from "./tabs/Tabs"
import { CountryButton } from "./button/CountryButtot";

export default function App() {

  const [selectedCountry, setSelectedCountry] = useState("RUS");

  return (
    <div className="App">
      <h2>Country Monitoring</h2>
    <CountryButton selectedCountry= {selectedCountry} setSelectedCountry = {setSelectedCountry}/>  
    <GetMainTabs selectedCountry = {selectedCountry}/>
    </div>
  );
}