import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    height: 135,
    backgroundColor: '#505050',
  },
  profileButtons: {
    position: 'absolute',
    flexDirection: 'row',
    top: 0,
    right: 0,
    width: 80,
    height: 48,
    paddingTop: 10,
  },
  profileTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBottom: {
    height: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#fe931f',
  },
  user: {
    color: 'white',
    fontSize: 11,
  },
  picHome: {
    width: 60,
    height: 60,
    backgroundColor: 'gray',
    borderRadius: 50,
  },
  picIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#fe931f',
    borderRadius: 50,
  },
  picButtons: {
    width: 34,
  },
  badge: {
    position: 'absolute',
    width: 18,
    height: 18,
    backgroundColor: '#fe931f',
    top: 0,
    right: 0,
    borderRadius: 50,
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
  },
  content: {
    padding: 10,
    flexDirection: 'row',
    borderBottomColor: '#d7d7d7',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  listTitle: {
    alignSelf: 'center',
    marginLeft: 6,
    color: '#101010',
  },
  subTitleWrapper: {
    height: 32,
    justifyContent: 'center',
  },
  subTitle: {
    color: '#101010',
    marginLeft: 36,
  },
  withIcon: {
    alignSelf: 'center',
    flex: 1,
  },
  withIconText: {
    marginLeft: 6,
    color: '#101010',
  },
});
