import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {ImageBackground, StyleSheet} from 'react-native';
import {Icons} from '../assets';
import {
  HomeScreen,
  NewNoteScreen,
  SettingScreen,
  SummaryScreen,
} from '../screens';
import {SCREEN_NAME} from './app.navigation';
import CustomHeader, {RightIcon} from './Component/CustomHeader';
import CustomTabBar from './Component/CustomTabBar';
import SummaryHeader from './Component/SummaryHeader';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const renderCustomTabBar = (
  props: React.JSX.IntrinsicAttributes & BottomTabBarProps,
  onBottomButtonPress: (currentRoute: string) => void,
) => {
  return <CustomTabBar {...props} onBottomButtonPress={onBottomButtonPress} />;
};

const renderHeader = ({
  title,
  showBackButton,
  rightIcon,
}: {
  title: string;
  showBackButton?: boolean;
  rightIcon?: RightIcon;
}) => {
  return (
    <CustomHeader
      title={title}
      showBackButton={showBackButton}
      rightIcon={rightIcon}
    />
  );
};

const renderSummaryHeader = ({title}: {title: string}) => {
  return <SummaryHeader title={title} />;
};

const TabNavigator = () => {
  const {t} = useTranslation();
  const newNodeRef = useRef<{saveNewNote: () => void} | null>(null);
  const settingRef = useRef<{deleteAllNote: () => void} | null>(null);

  const handleBottomButtonPress = (currentRoute: string) => {
    if (currentRoute === SCREEN_NAME.NewNoteScreen) {
      if (newNodeRef.current && 'saveNewNote' in newNodeRef.current) {
        newNodeRef.current.saveNewNote();
      }
    } else if (currentRoute === SCREEN_NAME.SettingScreen) {
      if (settingRef.current && 'deleteAllNote' in settingRef.current) {
        settingRef.current.deleteAllNote();
      }
    }
  };
  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAME.HomeScreen}
      tabBar={props => renderCustomTabBar(props, handleBottomButtonPress)}
      screenOptions={{
        sceneStyle: styles.transparentContent,
      }}>
      <Tab.Screen
        name={SCREEN_NAME.HomeScreen}
        component={HomeScreen}
        options={({navigation}) => ({
          header: () =>
            renderHeader({
              title: t('home'),
              rightIcon: {
                icon: Icons.setting,
                onPress: () => {
                  navigation.navigate(SCREEN_NAME.SettingScreen);
                },
              },
            }),
          title: t('home'),
        })}
      />
      <Tab.Screen
        name={SCREEN_NAME.NewNoteScreen}
        options={{
          header: () =>
            renderHeader({title: t('new_note'), showBackButton: true}),
          title: t('new_note'),
        }}>
        {() => <NewNoteScreen ref={newNodeRef} />}
      </Tab.Screen>
      <Tab.Screen
        name={SCREEN_NAME.SummaryScreen}
        component={SummaryScreen}
        options={{
          header: () => renderSummaryHeader({title: t('summary')}),
          title: t('summary'),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.SettingScreen}
        options={{
          header: () =>
            renderHeader({title: t('setting'), showBackButton: true}),
          tabBarButton: () => null,
          tabBarStyle: {display: 'none'},
        }}>
        {() => <SettingScreen ref={settingRef} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export const MainNavigation = () => {
  return (
    <ImageBackground
      source={require('../assets/images/img_bg.png')}
      resizeMode="cover"
      style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: styles.transparentContent,
          }}>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  transparentContent: {
    backgroundColor: 'transparent',
  },
});
