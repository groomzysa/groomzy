import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonLoading,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";
import { useGallery } from "./hooks";
import { PAGE_SIZE } from "./constants";
import { useParams } from "react-router-dom";
import "./styles.css";
import { GIconBackButton } from "../../../../components";
import { routes } from "../../../../route/routes";

export const Gallery: FC = () => {
  /**
   *
   * Hooks
   *
   */
  const { id } = useParams<{ id: string }>();

  const {
    cursor,
    fetchGalleryData,
    galleries,
    galleriesError,
    galleriesHasError,
    galleriesLoading,
    onRefetchGallery,
  } = useGallery();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <GIconBackButton route={routes.home.base.use()} />
          </IonButtons>
          <IonTitle>Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={onRefetchGallery}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonLoading isOpen={galleriesLoading} />

        <IonGrid>
          {galleriesHasError && (
            <IonRow>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
              <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
                <span className="error">{galleriesError}</span>
              </IonCol>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
            </IonRow>
          )}
          <IonRow>
            {galleries?.map((gallery) => {
              return (
                <IonCol key={gallery.id} sizeXs="12" sizeSm="6" sizeMd="3">
                  <IonImg
                    class="provider-trading-gallery-image"
                    src={gallery.galleryImageUrl!}
                    alt={gallery.name!}
                  ></IonImg>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            fetchGalleryData({
              providerId: Number(id),
              limit: PAGE_SIZE,
              cursor,
            });
            setTimeout(() => ev.target.complete(), 1000);
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};
