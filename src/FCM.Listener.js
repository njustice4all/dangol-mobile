import { Platform, AsyncStorage, Vibration } from 'react-native';
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

const showLocalNotification = async (notification, notif) => {
  await FCM.presentLocalNotification({
    vibrate: 500,
    title: notification.title,
    body: notification.body,
    priority: 'high',
    show_in_foreground: true,
    group: 'test',
    status: notif.status,
    my_custom_data: notification.payload,
  });
};

export const registerKilledListener = () => {
  FCM.on(FCMEvent.Notification, notif => {
    AsyncStorage.setItem('lastNotification', JSON.stringify(notif));
  });
};

export const registerAppListener = async (receiveMessage, webview, alarm) => {
  FCM.on(FCMEvent.Notification, async notif => {
    console.log(notif);
    if (notif.opened_from_tray) {
      console.log('from tray: ', notif);
      return;
    }

    try {
      const notification = JSON.parse(notif.custom_notification);
      // receiveMessage();

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

      // await showLocalNotification(JSON.parse(notif.custom_notification), notif);
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
