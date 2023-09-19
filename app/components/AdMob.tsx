import React from 'react';
import { AdIconView, AdMediaView, AdTriggerView, BannerAd, BannerAdSize, InterstitialAd, AdSettings } from 'expo-ads-facebook';

// Facebook Audience Networkの広告枠IDを設定します。
const placementId = 'YOUR_PLACEMENT_ID';

export default function App() {
  return (
    <BannerAd
      placementId={placementId}
      size={BannerAdSize.BANNER_HEIGHT_50}
      onError={(error) => console.log('Error', error)}
      onAdLoaded={() => console.log('Ad loaded')}
    />
  );
}
