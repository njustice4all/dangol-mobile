import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { IconBell, IconChat, IconPerson, IconSetting, IconShop } from './Icons';

import styles from './SideMenu.styles';

const MANAGE_SUBS = ['업소 정보 수정', '업소 부관리자 관리', '배달 주문 임시 중단', '업소 통계'];
const CUSTOMER_SUBS = ['앱 이용안내', '1:1 문의', '자주묻는 질문'];

const Sub = ({ title, _onPress }) => (
  <View style={styles.subTitleWrapper}>
    <Text style={styles.subTitle}>{title}</Text>
  </View>
);

class SideMenu extends Component {
  render() {
    const { onChangeRoute, onLogout, goUserWebview } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <View style={styles.profileTop}>
            <View style={[styles.picHome, styles.center]}>
              <IconShop size={40} />
            </View>
            <View style={styles.profileButtons}>
              <View style={[styles.picButtons, styles.center]}>
                <IconBell size={20} />
                <View style={[styles.badge, styles.center]}>
                  <Text style={styles.badgeText}>5</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.picButtons, styles.center]} onPress={onLogout}>
                <IconPerson size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.profileBottom}>
            <Text style={styles.title}>교촌치킨 선릉점</Text>
            <Text style={styles.user}>홍길동 사장님 안녕하세요</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={[styles.picIcon, styles.center]}>
              <IconShop size={18} />
            </View>
            <Text style={styles.listTitle}>업소 운영관리</Text>
          </View>
          <View style={[styles.content, { flexDirection: 'column' }]}>
            <TouchableOpacity style={styles.subTitleWrapper} onPress={goUserWebview}>
              <Text style={styles.subTitle}>업소 정보 수정</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subTitleWrapper}
              onPress={onChangeRoute('/menus/management')}>
              <Text style={styles.subTitle}>업소 부관리자 관리</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subTitleWrapper}
              onPress={onChangeRoute('/menus/delivery')}>
              <Text style={styles.subTitle}>배달 주문 임시 중단</Text>
            </TouchableOpacity>
            <View style={styles.subTitleWrapper}>
              <Text style={styles.subTitle}>업소 통계</Text>
            </View>
          </View>
          <View style={styles.content}>
            <View style={[styles.picIcon, styles.center]}>
              <IconSetting size={22} />
            </View>
            <TouchableOpacity
              style={{ alignSelf: 'center', flex: 1 }}
              onPress={onChangeRoute('/menus/setting')}>
              <Text style={styles.withIconText}>설정</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <View style={[styles.picIcon, styles.center]}>
              <IconChat size={18} />
            </View>
            <Text style={styles.listTitle}>고객센터</Text>
          </View>
          <View style={[styles.content, { flexDirection: 'column' }]}>
            <View style={styles.subTitleWrapper}>
              <Text style={styles.subTitle}>앱 이용안내</Text>
            </View>
            <View style={styles.subTitleWrapper}>
              <Text style={styles.subTitle}>1:1 문의</Text>
            </View>
            <View style={styles.subTitleWrapper}>
              <Text style={styles.subTitle}>자주묻는 질문</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default SideMenu;
