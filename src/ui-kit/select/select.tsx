import React, {FC, memo, ReactNode} from 'react';

import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {AppText} from '../app-text/app-text';
import {THEME_COLORS} from '../theme-colors/them-colors';

export type TSelectProps = {
  value: string;
  flagSrc?: string;
  rightIcon?: ReactNode;
  label: string;
  onPress: () => void;
};

export const Select: FC<TSelectProps> = memo(
  ({value, rightIcon, flagSrc, label, onPress}) => {
    return (
      <View>
        <AppText offsetBottom={8} variant="p1" text={label} />

        <TouchableOpacity onPress={onPress} style={styles.select}>
          <View style={styles.leftView}>
            {!!flagSrc && (
              <Image style={styles.image} source={{uri: flagSrc}} />
            )}
            <AppText style={styles.text} text={value} variant="p1" />
          </View>
          {rightIcon}
        </TouchableOpacity>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  select: {
    padding: 16,
    backgroundColor: THEME_COLORS.GRAY,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 8,
    width: 140,
  },
  leftView: {
    flexDirection: 'row',
  },
  text: {
    marginLeft: 4,
  },
  image: {
    width: 30,
    height: 20,
  },
});
