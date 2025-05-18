import React, {FC, memo, ReactNode} from 'react';

import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';

import {AppText} from '../';
import {THEME_COLORS} from '../theme-colors/them-colors';

type TInputProps = {
  errorMessage?: string | null;
  icon?: ReactNode;
} & TextInputProps;

export const Input: FC<TInputProps> = memo(({errorMessage, icon, ...props}) => (
  <View>
    <TextInput
      style={icon ? styles.input : [styles.input, styles.defaultPaddings]}
      placeholderTextColor={THEME_COLORS.BLACK}
      allowFontScaling={false}
      {...props}
    />
    {icon && <View style={styles.icon}>{icon}</View>}
    {!!errorMessage && (
      <AppText fontWeight={400} text={errorMessage} color={THEME_COLORS.RED} />
    )}
  </View>
));

const styles = StyleSheet.create({
  input: {
    backgroundColor: THEME_COLORS.WHITE,
    borderColor: THEME_COLORS.BLACK,
    borderWidth: 1,
    height: 45,
    borderRadius: 8,
    paddingLeft: 40,
    fontSize: 16,
    marginBottom: 3,
  },
  icon: {
    position: 'absolute',
    top: 12,
    left: 16,
  },
  defaultPaddings: {
    paddingLeft: 16,
  },
  errorMessage: {
    marginTop: 5,
  },
});
