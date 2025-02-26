import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import Papa from "papaparse";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import L from "leaflet";

export const processMunicipiosData = (municipios) => {
  return municipios.map((row) => {
    const porcentagemRaw = row["% moradores cobertos"]?.replace("%", "").replace(",", ".") || "0";
    const porcentagem = parseFloat(porcentagemRaw);
    return {
      ...row,
      "% moradores cobertos": porcentagem,
      "Código IBGE": row["Código IBGE"] ? String(row["Código IBGE"].trim()) : "Desconhecido",
    };
  });
};

const Legend = () => {
  const map = useMap(); 
  useEffect(() => {
    const legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "info legend");
      const grades = [0, 20, 40, 60, 80];
    

      for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' + getColor(grades[i]) + '"></i> ' +
          grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] : "+") + "<br>";
      }

      return div;
    };

    legend.addTo(map); 

    return () => {
      map.removeControl(legend); 
    };
  }, [map]);

  const getColor = (value) => {
    return value >= 80
      ? "#225ea8"
      : value >= 60
      ? "#41b6c4"
      : value >= 40
      ? "#a1dab4"
      : value >= 20
      ? "#ffffcc"
      : "gray";
  };

  return null;
};

const MapComponent = () => {
  const [geoData, setGeoData] = useState(null);
  const [municipiosData, setMunicipiosData] = useState(null);
  const [mergedGeoData, setMergedGeoData] = useState(null);

  useEffect(() => {
    fetch("/geojs-pb-mun.json")
      .then((response) => response.json())
      .then((data) => {
        const cleanedGeoData = {
          ...data,
          features: data.features.map((feature) => ({
            ...feature,
            id: String(feature.id).trim(),
          })),
        };
        setGeoData(cleanedGeoData);
      })
      .catch((error) => console.error("Erro ao carregar os dados geojson:", error));
  }, []);

  useEffect(() => {
    fetch("/parahybaCities.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, { header: true }).data;
        const processedData = processMunicipiosData(parsedData);
        setMunicipiosData(processedData);
      })
      .catch((error) => console.error("Erro ao carregar o CSV:", error));
  }, []);

  useEffect(() => {
    if (geoData && municipiosData) {
      const mergedData = {
        ...geoData,
        features: geoData.features.map((feature) => {
          const municipioId = feature.properties?.id || feature.id;
          const municipioData = municipiosData.find(
            (row) => row["Código IBGE"] === String(municipioId)
          );

          const porcentagem = municipioData?.["% moradores cobertos"] || "N/A";

          return {
            ...feature,
            properties: {
              ...feature.properties,
              ...municipioData,
              porcentagem,
            },
          };
        }),
      };
      setMergedGeoData(mergedData);
    }
  }, [geoData, municipiosData]);

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: (e) => {
        const nomeMunicipio =
          feature.properties?.NOME || feature.properties?.name || "Nome não disponível";
        const porcentagem =
          feature.properties?.porcentagem !== undefined
            ? `${feature.properties.porcentagem}%`
            : "Informação não disponível";

        const popupContent = `
          <div>
            <h3>Município: ${nomeMunicipio}</h3>
            <p>Porcentagem de moradores cobertos: ${porcentagem}</p>
          </div>
        `;

        layer.bindPopup(popupContent).openPopup(e.latlng);
      },
    });
  };

  const getColor = (value) => {
    return value > 80
      ? "#225ea8"
      : value > 60
      ? "#41b6c4"
      : value > 40
      ? "#a1dab4"
      : value > 20
      ? "#ffffcc"
      : "gray";
  };

  const style = (feature) => {
    const porcentagem = feature.properties.porcentagem;
    return {
      fillColor: getColor(porcentagem),
      weight: 0.5,
      opacity: 1,
      color: "black",
      fillOpacity: 0.8,
    };
  };

  if (!mergedGeoData) {
    return <div>Carregando mapa...</div>;
  }

  return (
    <div>
      <div id="text-map">
        <h1 id="title">Mapa de cidades e seus níveis de conectividade</h1>
        <hr />
        <p id="Date-hour">publicado: data e hora, ultima modificação: data e hora da modificação</p>
        <hr />
      </div>

      <MapContainer
        center={[-7.1, -38.2]}
        zoom={8}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
        />
        <GeoJSON data={mergedGeoData} style={style} onEachFeature={onEachFeature} />
        <Legend /> {}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
