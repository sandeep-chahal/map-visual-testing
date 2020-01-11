import React from "react";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { StaticMap } from "react-map-gl";
import { data } from "./data";
import { MapboxLayer } from "@deck.gl/mapbox";

// Set your mapbox access token here

// Initial viewport settings
const initialViewState = {
	longitude: -100,
	latitude: 40,
	zoom: 5,
	pitch: 0,
	bearing: 0
};

// Data to be used by the LineLayer
// const data = [
// 	{
// 		sourcePosition: [-122.41669, 37.7853],
// 		targetPosition: [-122.41669, 37.781]
// 	}
// ];

const scatterLayer = new ScatterplotLayer({
	id: "scatterPlot",
	data,
	opacity: 0.8,
	filled: true,
	radiusMinPixels: 2,
	radiusMaxPixels: 5,
	getPosition: d => d.geometry.coordinates
});
const heatmapLayer = new HeatmapLayer({
	id: "heatPlot",
	data,
	getPosition: d => [d.longitude, d.latitude],
	radiusPixels: 60
});

const layers = [scatterLayer, heatmapLayer];

class App extends React.Component {
	render() {
		return (
			<DeckGL
				initialViewState={initialViewState}
				controller={true}
				layers={layers}>
				<StaticMap
					mapStyle="mapbox://styles/mapbox/dark-v8"
					mapboxApiAccessToken={
						"pk.eyJ1Ijoic2FuZGVlcC1jaGFoYWwiLCJhIjoiY2s1OWh2bDRjMGxudDNrcmY0ZXpibTBoYyJ9.2pLuuZbDvWt9O_jskii__g"
					}
				/>
			</DeckGL>
		);
	}
}

export default App;
