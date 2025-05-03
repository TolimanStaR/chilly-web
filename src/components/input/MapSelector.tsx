import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style } from "ol/style";
import { defaults as defaultControls } from "ol/control";
import "ol/ol.css";

type MapSelectorProps = {
  onChange: (lat: number, lon: number) => void;
  setAddress: (address: string) => void;
  latitude: number;
  longitude: number;
};

export const MapSelector: React.FC<MapSelectorProps> = ({
  onChange,
  setAddress,
  latitude,
  longitude,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapObj = useRef<Map | null>(null);
  const markerRef = useRef<Feature<Point> | null>(null);
  const vectorSource = useRef<VectorSource>(new VectorSource());

  useEffect(() => {
    if (!mapRef.current) return;

    const defaultCenter = fromLonLat([43.9361, 56.2965]); // Нижний Новгород

    const vectorLayer = new VectorLayer({
      source: vectorSource.current,
    });

    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: new View({
        center: defaultCenter,
        zoom: 11,
      }),
      controls: defaultControls({ attribution: false, zoom: true, rotate: false }),
    });

    map.on("click", async (e) => {
      const coords = toLonLat(e.coordinate);
      const [lon, lat] = coords;
      onChange(lat, lon);

      if (!markerRef.current) {
        const marker = new Feature({
          geometry: new Point(e.coordinate),
        });

        marker.setStyle(
          new Style({
            image: new Icon({
              anchor: [0.5, 1],
              src: "/marker.svg",
              scale: 0.05, displacement: [0.5, -4.5]
            }),
          })
        );

        vectorSource.current.addFeature(marker);
        markerRef.current = marker;
      } else {
        markerRef.current.setGeometry(new Point(e.coordinate));
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
        );
        const data = await response.json();
        if (data && data.display_name) {
          setAddress(data.display_name);
        }
      } catch (error) {
        console.error("Ошибка при обратном геокодировании:", error);
      }
    });

    mapObj.current = map;

    return () => map.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (mapObj.current && latitude && longitude) {
      const coords = fromLonLat([longitude, latitude]);

      if (!markerRef.current) {
        const marker = new Feature({
          geometry: new Point(coords),
        });

        marker.setStyle(
          new Style({
            image: new Icon({
              anchor: [0.5, 1],
              src: "/marker.svg",
              scale: 0.05, displacement: [0.5, -4.5]
            })
          })
        );

        vectorSource.current.addFeature(marker);
        markerRef.current = marker;
      } else {
        markerRef.current.setGeometry(new Point(coords));
      }
    }
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};
