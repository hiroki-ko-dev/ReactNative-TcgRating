import React from 'react';
import { Platform, Image, ImageProps as RNImageProps } from 'react-native';
import ImageModal from 'react-native-image-modal';

type ImageModalProps = {
  uri: string,
  imageStyle?: RNImageProps['style'],
  modalStyle?: object,
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center',
};

const PlatformImage: React.FC<ImageModalProps> = ({ uri, imageStyle, modalStyle, resizeMode }) => {

  const isWeb = Platform.OS === 'web';
  if (isWeb) {
    return (
      <Image
        style={imageStyle}
        source={{
          uri,
        }}
        resizeMode={resizeMode}
      />
    );
  } else {
    return (
      <ImageModal
        swipeToDismiss={false}
        resizeMode={resizeMode}
        imageBackgroundColor="#000000"
        style={modalStyle}
        source={{
          uri,
        }}
      />
    );
  }
}

export default PlatformImage;
