import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./App.css";
import Infobox from "./Infobox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData } from "./util.js";
import logo from "../src/main.png"


function App() {
  const [countries, Setcountries] = useState([]);
  const [country, setcountry] = useState("worldwide");
  const [countryInfo, setcountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);


  const onCountryChange = async (event) => {
    const countrycode = event.target.value;

    const url =
      countrycode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countrycode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setcountryInfo(data);
        setcountry(countrycode);
      
console.log( data.countryInfo);
    
    
      });
   
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setcountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2, //uk, us , india
          }));
          const sortedData = sortData(data);
          Setcountries(countries);
          setTableData(sortedData);
        });
    };
    getCountriesData();
  }, []);

  return (
    <>
      <div className="app">
        <div className="design"></div>
        <div className="design2"></div>
        <div className="design3"></div>
    
    
      <div className="appDesign">
        <div className="app__left">
        <div className="design4"></div>
        <div className="design5"></div>
        <div className="design6"></div>
          <div className="app__header">
            <h1>COVID-19 Tracker</h1>
            <FormControl className="app__dropdown">
              <Select
                onChange={onCountryChange}
                varient="outlined"
                value={country}
              >
                {/*Loop Through all the country*/}
                <MenuItem  value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}

                {/* <MenuItem value="worldwide">Worldwide</MenuItem>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              <MenuItem value="worldwide">Worldwide</MenuItem> */}
              </Select>
            </FormControl>
          </div>
          <div className="main_container">
<div className="empty"> 
<div className="button">
  <button className="but">Get Well Soon Earth!</button>
</div>
<div className="headings">
  <h1>Let's Stop <br/> The COVID And, <br/> <span className="change"> Recover The Earth ! </span></h1>
</div>
<div className="content">
  <p>Due to covid outbreak the earth is grieve and we can stop it by follow some simple steps</p>
</div>
<div className="button_container">
     <button className="but1">Know More</button>
     <button className="but2">Watch Video</button>
   </div>
</div>
<div className="imgg">
  <img className="img_main" src= {logo} alt="mainImage" />
   </div>
   
</div>

          <div className="app__stats">
            <Infobox
              title="coronavirus Cases"
              cases={countryInfo.todayCases}
              total={countryInfo.cases}
            />
            <Infobox
              title="recoveres"
              cases={countryInfo.todayRecovered}
              total={countryInfo.recovered}
            />
            <Infobox
              title="Deaths"
              cases={countryInfo.todayDeaths}
              total={countryInfo.deaths}
            />
            {/*InfoBoxes*/}
            {/*InfoBoxes*/}
            {/*InfoBoxes*/}
          </div>

          {/*Table*/}
          {/*Graph*/}
        
        </div>

        <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Countries</h3>
            <Table countries={tableData} />
            <h3 className="casess">Worldwide new Cases</h3>
            <LineGraph/>
          </CardContent>
        </Card>
      </div>
      </div>
    </>
  );
}

export default App;
 