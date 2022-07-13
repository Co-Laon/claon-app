import { useState, useCallback } from 'react';
import * as ImagePicker from 'react-native-image-picker';

/* toggle includeExtra */
const includeExtra = true;

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const takeImageAction: Action = {
  title: 'Take Image',
  type: 'capture',
  options: {
    saveToPhotos: true,
    mediaType: 'photo',
    includeBase64: false,
    includeExtra,
  },
};
const selectImageAction: Action = {
  title: 'Select Image',
  type: 'library',
  options: {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 0,
    mediaType: 'photo',
    includeBase64: false,
    includeExtra,
  },
};
const takeVideoAction: Action = {
  title: 'Take Video',
  type: 'capture',
  options: {
    saveToPhotos: true,
    mediaType: 'video',
    includeExtra,
  },
};
const selectVideoAction: Action = {
  title: 'Select Video',
  type: 'library',
  options: {
    selectionLimit: 0,
    mediaType: 'video',
    includeExtra,
  },
};
const selectVideoAndImageAction: Action = {
  title: 'Select Image or Video\n(mixed)',
  type: 'library',
  options: {
    selectionLimit: 0,
    mediaType: 'mixed',
    includeExtra,
  },
};

export const useImagePicker = () => {
  const makeImagePicker = useCallback(async ({ type, options }, callback) => {
    if (type === 'capture') {
      await ImagePicker.launchCamera(options, callback);
    } else {
      await ImagePicker.launchImageLibrary(options, callback);
    }
  }, []);
  const [pickerResponse, setPickerResponse] = useState<any>(null);
  const testPicker = useCallback(async () => {
    console.log(ImagePicker);
    await ImagePicker.launchImageLibrary(
      selectImageAction.options,
      setPickerResponse
    );
  }, [pickerResponse]);
  const takeImage = () => makeImagePicker(takeImageAction, setPickerResponse);
  const selectImage = () =>
    makeImagePicker(selectImageAction, setPickerResponse);
  const takeVideo = () => makeImagePicker(takeVideoAction, setPickerResponse);
  const selectVideo = () =>
    makeImagePicker(selectVideoAction, setPickerResponse);
  const selectVideoAndImage = () =>
    makeImagePicker(selectVideoAndImageAction, setPickerResponse);
  return {
    pickerResponse,
    takeImage,
    selectImage,
    takeVideo,
    selectVideo,
    selectVideoAndImage,
    testPicker,
  };
};
