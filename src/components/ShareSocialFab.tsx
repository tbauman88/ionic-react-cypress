import { IonLoading, IonFab, IonFabButton, IonIcon, IonFabList } from "@ionic/react"
import { shareSocial, logoVimeo, logoInstagram, logoTwitter, logoFacebook } from "ionicons/icons"
import React, { useState } from "react"

const ShareSocialFab: React.FC = () => {
  const [loadingMessage, setLoadingMessage] = useState('')
  const [showLoading, setShowLoading] = useState(false);

  const openSocial = (network: string) => {
    setLoadingMessage(`Posting to ${network}`);
    setShowLoading(true);
  };

  return(
    <>
      <IonLoading
        isOpen={showLoading}
        message={loadingMessage}
        duration={2000}
        spinner="crescent"
        onDidDismiss={() => setShowLoading(false)}
      />
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton data-cy="share-social-icon">
          <IonIcon icon={shareSocial} />
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton data-cy="share-on-vimeo" color="vimeo" onClick={() => openSocial('Vimeo')}>
            <IonIcon icon={logoVimeo} />
          </IonFabButton>
          <IonFabButton data-cy="share-on-instagram" color="instagram" onClick={() => openSocial('Instagram')}>
            <IonIcon icon={logoInstagram} />
          </IonFabButton>
          <IonFabButton data-cy="share-on-twitter" color="twitter" onClick={() => openSocial('Twitter')}>
            <IonIcon icon={logoTwitter} />
          </IonFabButton>
          <IonFabButton data-cy="share-on-facebook" color="facebook" onClick={() => openSocial('Facebook')}>
            <IonIcon icon={logoFacebook} />
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </>
  )
};

export default ShareSocialFab;
