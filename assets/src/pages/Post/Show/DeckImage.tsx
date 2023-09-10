import React from 'react';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { POKEKA_DECK_URL } from "@/config";
import { useImage } from '@/contexts/image/useImage';

type DeckImageProps = {
  imageUrl: string;
};

const DeckImage: React.FC<DeckImageProps> = ( props ) => {

  const { setImageUrl } = useImage();

  return (
    <TouchableOpacity onPress={() => setImageUrl(POKEKA_DECK_URL + props.imageUrl)}>
      <ScrollView
        maximumZoomScale={3}
        minimumZoomScale={1}
        pinchGestureEnabled={true}
        centerContent={true}
      >
        <Image
          resizeMode="contain"
          style={{
            width: 380,
            height: 190,
          }}
          source={{uri: POKEKA_DECK_URL + props.imageUrl}}
        />
      </ScrollView>
    </TouchableOpacity>
  );
}

export default DeckImage;
