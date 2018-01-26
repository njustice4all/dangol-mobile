import { Platform, AsyncStorage } from 'react-native';
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType,
} from 'react-native-fcm';

AsyncStorage.getItem('lastNotification').then(data => {
  if (data) {
    AsyncStorage.removeItem('lastNotification');
  }
});

export const registerKilledListener = () => {
  FCM.on(FCMEvent.Notification, notif => {
    AsyncStorage.setItem('lastNotification', JSON.stringify(notif));
  });
};

export const registerAppListener = () => {
  FCM.on(FCMEvent.Notification, notif => {
    console.log(notif);

    if (notif.local_notification) {
      console.log('local: ', notif);
      return;
    }
    if (notif.opened_from_tray) {
      console.log('from tray: ', notif);
      return;
    }

    if (Platform.OS === 'ios') {
      switch (notif._notificationType) {
        case NotificationType.Remote:
          notif.finish(RemoteNotificationResult.NewData);
          break;
        case NotificationType.NotificationResponse:
          notif.finish();
          break;
        case NotificationType.WillPresent:
          notif.finish(WillPresentNotificationResult.All);
          break;
      }
    }
  });

  FCM.on(FCMEvent.RefreshToken, token => {
    console.log('TOKEN (refreshUnsubscribe)', token);
    this.props.onChangeToken(token);
  });

  FCM.enableDirectChannel();
  FCM.on(FCMEvent.DirectChannelConnectionChanged, data => {
    console.log('direct channel connected' + data);
  });

  setTimeout(function() {
    FCM.isDirectChannelEstablished().then(d => null);
  }, 1000);
};
