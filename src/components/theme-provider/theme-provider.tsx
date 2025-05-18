import React, {FC, memo} from 'react';
import {ReactNode} from 'react';

import {SafeAreaView, View} from 'react-native';
import {StyleSheet} from 'react-native';

import {THEME_COLORS} from '@/ui-kit';

export type TThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: FC<TThemeProviderProps> = memo(({children}) => (
  <SafeAreaView style={styles.wrapper}>
    <View style={styles.root}>{children}</View>
  </SafeAreaView>
));

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: THEME_COLORS.BACKGROUND,
  },
  root: {
    paddingHorizontal: 18,
    flex: 1,
  },
});
