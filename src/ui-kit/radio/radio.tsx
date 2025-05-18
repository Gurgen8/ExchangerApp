import React, {FC, memo} from 'react';

import {StyleSheet, View} from 'react-native';

import {THEME_COLORS} from '../theme-colors/them-colors';

export type TRadioProps = {
  isSelected: boolean;
};

export const Radio: FC<TRadioProps> = memo(({isSelected}) => {
  return (
    <View style={styles.radioButton}>
      {isSelected && <View style={styles.circle} />}
    </View>
  );
});

const styles = StyleSheet.create({
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME_COLORS.BLACK,
    backgroundColor: THEME_COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  circle: {
    width: 7,
    height: 7,
    borderRadius: 2.5,
    backgroundColor: THEME_COLORS.BLACK,
  },
});
