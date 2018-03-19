import { Platform, AsyncStorage, Vibration } from 'react-native';
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType,
} from 'react-native-fcm';

AsyncStorage.getItem('lastNotification').then(data => {
  console.log(data);
  if (data) {
    AsyncStorage.removeItem('lastNotification');
  }
});

export const registerKilledListener = () => {
  FCM.on(FCMEvent.Notification, notif => {
    AsyncStorage.setItem('lastNotification', JSON.stringify(notif));
  });
};

export const registerAppListener = async (receiveMessage, webview, alarm) => {
  FCM.on(FCMEvent.Notification, async notif => {
    // console.log(notif);
    // if (notif.opened_from_tray) {
    //   console.log('from tray: ', notif);
    //   return;
    // }

    try {
      const notification = JSON.parse(notif.custom_notification);

      webview.postMessage(
        JSON.stringify({
          type: 'firebase/MESSAGE_RECEIVED',
          order: notification.order,
        })
      );

      if (alarm) {
        alarm.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
            // reset the player to its uninitialized state (android only)
            // this is the only option to recover after an error occured and use the player again
            onSound.reset();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }

    if (notif.local_notification) {
      console.log('local: ', notif);
      return;
    }

    if (Platform.OS === 'ios') {
      // Vibration.vibrate(500);
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
  });

  FCM.enableDirectChannel();
  FCM.on(FCMEvent.DirectChannelConnectionChanged, data => {
    console.log('direct channel connected' + data);
  });

  setTimeout(function() {
    FCM.isDirectChannelEstablished().then(d => null);
  }, 1000);
};
