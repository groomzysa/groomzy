import { GoogleMap } from "@capacitor/google-maps";
import {
  GoogleMapConfig,
  MarkerClickCallbackData,
} from "@capacitor/google-maps/dist/typings/definitions";
import { useCallback, useEffect, useRef, useState } from "react";
import { addressName } from "../../../../../utils/address";
import { MAP_CONFIG } from "../constants";
import { getAddressPosition } from "../../../../../utils/location";
import { useFetchProvider } from "../../../../../api/hooks/queries";
import { useParams } from "react-router-dom";
import {
  Provider,
  ProviderQueryVariables,
} from "../../../../../api/graphql/api.schema";
import { getErrorMessage } from "../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";
import { useIonToast } from "@ionic/react";

export const useDetailsHandlers = () => {
  const [provider, setProvider] = useState<Provider | undefined | null>();
  const [providerLoading, setProviderLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const mapRef = useRef(null);

  /**
   *
   * Hooks
   *
   */
  const [present, dismiss] = useIonToast();

  const { fetchProvider } = useFetchProvider();

  const createMap = useCallback(
    async (mapConfig: GoogleMapConfig, address: string) => {
      if (!mapRef.current) return;

      const map = await GoogleMap.create({
        id: "google-map",
        element: mapRef.current,
        apiKey: process.env.REACT_APP_GROOMZY_GOOGLE_API_KEY || "",
        config: mapConfig,
      });

      map.setOnMarkerClickListener((marker) => markerClick(marker));

      map.addMarker({
        coordinate: mapConfig.center,
        title: address,
      });
    },
    []
  );

  const fetchProviderData = useCallback(
    async (variables: ProviderQueryVariables) => {
      try {
        setProviderLoading(true);
        const response = await fetchProvider(variables).unwrap();

        const providerData = response.provider;

        if (!providerData) {
          setProviderLoading(false);

          return;
        }

        if (providerData.addresses?.length) {
          const address = addressName(providerData.addresses[0]);
          const addressPosition = await getAddressPosition(address);

          if (addressPosition) {
            const newMapConfig = {
              ...MAP_CONFIG,
              center: addressPosition,
              zoom: 14,
            };

            createMap(newMapConfig, address);
          }
        }

        setProvider(response.provider);
        setProviderLoading(false);
      } catch (error) {
        setProviderLoading(false);

        present({
          message:
            getErrorMessage(error as ErrorResponse) ||
            "Something went wrong fetching data",
          layout: "stacked",
          buttons: [
            {
              text: "Ok",
              handler: () => {
                dismiss();
              },
            },
          ],
        });
      }
    },
    [fetchProvider, createMap, dismiss, present]
  );

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!id) {
      return;
    }

    fetchProviderData({ providerId: Number(id) });
  }, [fetchProviderData, id]);

  /**
   *
   * Handlers
   *
   */

  const markerClick = (marker: MarkerClickCallbackData) => {
    window.open(
      `https://maps.google.com?q=${marker.latitude},${marker.longitude}`
    );
  };

  return {
    mapRef,
    provider,
    providerLoading,
  };
};
