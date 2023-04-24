import { GoogleMap } from "@capacitor/google-maps";
import {
  GoogleMapConfig,
  MarkerClickCallbackData,
} from "@capacitor/google-maps/dist/typings/definitions";
import { useEffect, useRef, useState } from "react";
import { addressName } from "../../../../../utils/address";
import { MAP_CONFIG } from "../constants";
import { getAddressPosition } from "../../../../../utils/location";
import { useFetchProvider } from "../../../../../api/hooks/queries";
import { useParams } from "react-router-dom";
import { isEqual } from "lodash";

export const useDetailsHandlers = () => {
  const [mapConfig, setMapConfig] = useState(MAP_CONFIG);
  const { id } = useParams<{ id: string }>();
  const mapRef = useRef(null);

  /**
   *
   * Hooks
   *
   */
  const {
    fetchProvider,
    provider,
    providerError,
    providerHasError,
    providerLoading,
  } = useFetchProvider();

  /**
   *
   * State check
   *
   */

  if (provider?.addresses?.length) {
    getAddressPosition(addressName(provider.addresses[0])).then(
      (addressPosition) => {
        if (addressPosition) {
          const newMapConfig = {
            ...mapConfig,
            center: addressPosition,
            zoom: 14,
          };

          if (!isEqual(mapConfig, newMapConfig)) {
            setMapConfig(newMapConfig);
            createMap(newMapConfig);
          }
        }
      }
    );
  }

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    fetchProvider({ providerId: Number(id) });
  }, [fetchProvider, id]);

  /**
   *
   * Handlers
   *
   */

  // const markerClick = (marker: MarkerClickCallbackData) => {
  //   window.open(
  //     `https://maps.google.com?q=${marker.latitude},${marker.longitude}`
  //   );
  // };

  const createMap = async (mapConfig: GoogleMapConfig) => {
    if (!mapRef.current) return;

    const map = await GoogleMap.create({
      id: "google-map",
      element: mapRef.current,
      apiKey: process.env.REACT_APP_GROOMZY_GOOGLE_API_KEY || "",
      config: mapConfig,
    });

    // map.setOnMarkerClickListener((marker) => markerClick(marker));

    if (
      mapConfig.center.lat !== MAP_CONFIG.center.lat &&
      mapConfig.center.lat !== MAP_CONFIG.center.lng &&
      provider?.addresses?.[0]
    ) {
      map.addMarker({
        coordinate: mapConfig.center,
        title: addressName(provider.addresses[0]),
      });
    }
  };

  return {
    mapRef,
    provider,
    providerError,
    providerHasError,
    providerLoading,
  };
};
