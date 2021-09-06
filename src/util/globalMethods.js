import {AppState, Linking} from 'react-native';

export const removeListeners = listnersArray => {
  if (listnersArray && listnersArray.length) {
    listnersArray.forEach(listnerObject => {
      let type =
        listnerObject && listnerObject.type ? listnerObject.type : 'default';
      let ref = listnerObject && listnerObject.ref ? listnerObject.ref : null;

      switch (type) {
        case 'DeviceEventEmitter':
          ref && ref.remove();
          break;
        case 'navigation':
          ref && ref.remove();
          break;
        case 'NetInfo':
          ref && ref();
          break;
        case 'BackHandler':
          ref && ref.remove();
          break;
        case 'AppState':
          ref && AppState.removeEventListener(ref, () => {});
          break;
        case 'Linking':
          ref && Linking.removeEventListener(ref, () => {});
          break;
        default:
          ref && ref.remove();
      }
    });
  }
};

export const getDisplayDate = date => {
  let today = new Date(date);
  let displayDate = `${today.getDate()} ${months[
    today.getMonth()
  ].toUpperCase()}, ${today.getFullYear()}`;

  return displayDate;
};
