import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Image, Modal, Text, StyleSheet } from 'react-native';
import { ImageContext } from "./ImageContext";

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <ImageContext.Provider value={{ imageUrl, setImageUrl }}>
      {children}
      {imageUrl && 
        <Modal
          visible={!!imageUrl}
          transparent={true}
          onRequestClose={() => setImageUrl("")}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
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
                source={{uri: imageUrl}}
              />
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setImageUrl("")}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      }
    </ImageContext.Provider>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 40,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
  },
});
