import React from 'react';
import {MainNavigation} from './main.navigation';

export enum SCREEN_NAME {
  HomeScreen = 'HomeScreen',
  NewNoteScreen = 'NewNoteScreen',
  SummaryScreen = 'SummaryScreen',
  SettingScreen = 'SettingScreen',
}

export const AppNavigation = () => {
  return <MainNavigation />;
};
