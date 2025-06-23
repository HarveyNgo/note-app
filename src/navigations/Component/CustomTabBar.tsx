import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {SCREEN_NAME} from '../app.navigation';
import {Colors} from '../../constants/colors';
import {Icons} from '../../assets';
import CustomText from '../../components/CustomText';
import PrimaryButton from '../../components/PrimaryButton';
import {useTranslation} from 'react-i18next';

interface CustomTabBarProps extends BottomTabBarProps {
  onBottomButtonPress: (currentRoute: string) => void;
}
const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  onBottomButtonPress,
}) => {
  const {t} = useTranslation();
  const currentRoute = state.routes[state.index].name;
  const label =
    currentRoute === SCREEN_NAME.NewNoteScreen
      ? t('save')
      : currentRoute === SCREEN_NAME.SettingScreen
      ? t('delete_all_note')
      : '';
  if (
    currentRoute === SCREEN_NAME.NewNoteScreen ||
    currentRoute === SCREEN_NAME.SettingScreen
  ) {
    const handleBottomButtonPress = () => {
      if (onBottomButtonPress) {
        onBottomButtonPress(currentRoute);
      }
    };
    return (
      <View style={[styles.container, styles.newNoteContainer]}>
        <PrimaryButton title={label} onPress={handleBottomButtonPress} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const icons: {[key: string]: any} = {
          HomeScreen: isFocused ? Icons.homeActive : Icons.home,
          NewNoteScreen: isFocused ? Icons.newNote : Icons.newNote,
          SummaryScreen: isFocused ? Icons.summaryActive : Icons.summary,
        };
        const imageSource = icons[route.name];

        if (route.name === SCREEN_NAME.SettingScreen) {
          return <View key={index} />;
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={[styles.tab, isFocused && styles.activeTab]}>
            <Image source={imageSource} style={[styles.image]} />
            <CustomText style={[styles.label, isFocused && styles.activeLabel]}>
              {route.name !== SCREEN_NAME.NewNoteScreen ? options.title : ''}
            </CustomText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: Colors.bottomColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 29,
    paddingRight: 26,
  },
  tab: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {},
  label: {
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: 500,
    lineHeight: 12 * 1.2,
    letterSpacing: 12 * -0.02,
    marginTop: 6,
  },
  activeLabel: {
    color: Colors.primary,
  },
  image: {
    width: 50.29,
    height: 47,
    resizeMode: 'contain',
  },
  newNoteContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 87,
    paddingRight: 88,
  },
});

export default CustomTabBar;
