import React, {FC, memo} from 'react';

import {Image, TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';

import {TCurrencyData} from '@/context';
import {formatLongText} from '@/helpers';
import {AppText, Radio, THEME_COLORS} from '@/ui-kit';

export interface TCountriesListRowProps {
  data: TCurrencyData;
  isSelected: boolean;
  onSelect: (data: TCurrencyData) => void;
  disabled: boolean;
}

export const CountriesListRow: FC<TCountriesListRowProps> = memo(
  ({isSelected, onSelect, data, disabled}) => (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onSelect(data)}
      style={
        isSelected
          ? [styles.row, styles.selectedRow]
          : [styles.row, disabled ? styles.disableRow : []]
      }>
      <View style={styles.leftView}>
        <Image style={styles.image} source={{uri: data.flagSrc}} />
        <AppText
          variant="p1"
          text={formatLongText(`${data.name} (${data.code})`, 30)}
        />
      </View>
      <Radio isSelected={isSelected} />
    </TouchableOpacity>
  ),
);

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 52,
    paddingHorizontal: 18,
  },
  selectedRow: {
    backgroundColor: THEME_COLORS.GRAY,
  },
  image: {
    width: 30,
    height: 20,
    marginRight: 8,
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disableRow: {
    opacity: 0.4,
  },
});
