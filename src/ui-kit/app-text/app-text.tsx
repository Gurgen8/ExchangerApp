import React, {FC} from 'react';

import {StyleSheet, Text} from 'react-native';
import {ColorValue, TextProps, TextStyle} from 'react-native';

import {THEME_COLORS} from '../theme-colors/them-colors';

type Variant = 'p1' | 'p2' | 'h2' | 'h1';

interface TypographyProps extends Omit<TextProps, 'fonWeight'> {
  variant?: Variant;
  color?: ColorValue;
  fontWeight?: TextStyle['fontWeight'];
  fontSize?: TextStyle['fontSize'];
  lineHeight?: TextStyle['lineHeight'];
  offsetBottom?: TextStyle['marginBottom'];
  textDecorationLine?: TextStyle['textDecorationLine'];
  width?: TextStyle['width'];
  fontFamily?: TextStyle['fontFamily'];
  text?: string;
}

export const AppText: FC<TypographyProps> = ({
  variant,
  style,
  fontSize,
  lineHeight,
  fontWeight,
  fontFamily,
  offsetBottom,
  text,
  color,
  ...props
}) => (
  <>
    <Text
      allowFontScaling={false}
      style={[
        {
          color: color || THEME_COLORS.BLACK,
        },
        variant && textStyles[variant],
        !!fontWeight && {fontWeight},
        !!fontSize && {fontSize},
        !!lineHeight && {lineHeight},
        !!fontFamily && {fontFamily},
        !!offsetBottom && {marginBottom: offsetBottom},
        style,
      ]}
      {...props}>
      {text}
    </Text>
  </>
);

const textStyles = StyleSheet.create({
  h1: {
    fontSize: 42,
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
  },
  h2: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.2,
    fontFamily: 'Inter-Bold',
  },
  p1: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
  },
  p2: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: -0.36,
    lineHeight: 24,
  },
});
