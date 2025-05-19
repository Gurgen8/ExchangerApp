import React, {useCallback, useMemo, useState} from 'react';

import {
  Alert,
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import countriesData from '@/assets/data/currencies.json';
import {ArrowLeftIcon, MagnifyingGlassIcon} from '@/assets/icons';
import {EExchangePosition, TCurrencyData, useExchangeContext} from '@/context';
import {debounce} from '@/helpers';
import {
  EStackNavigationRoutes,
  TStackNavigationScreenProps,
} from '@/navigation';
import {useLatestCurrencyRatesState} from '@/storage';
import {AppText, Input, THEME_COLORS} from '@/ui-kit';

import {CountriesListRow} from './countries-list-row/countries-list-row';

const reversedPositions = {
  [EExchangePosition.from]: EExchangePosition.to,
  [EExchangePosition.to]: EExchangePosition.from,
};

const keyExtractor: FlatListProps<TCurrencyData>['keyExtractor'] = item =>
  item.code;

export const SelectCurrencyScreen = ({
  navigation,
  route,
}: TStackNavigationScreenProps<EStackNavigationRoutes.SelectCurrency>) => {
  const exchangePosition = route.params.exchangePosition;
  const [latestCurrencyRates] = useLatestCurrencyRatesState();

  const {exchangeData, selectCurrency} = useExchangeContext();
  const [search, setSearch] = useState<string>('');

  const filteredCountries = useMemo(
    () =>
      countriesData.filter(
        country =>
          country.name.toLowerCase().includes(search) ||
          country.code.toLowerCase().includes(search) ||
          country.symbol.toLowerCase().includes(search),
      ),
    [search],
  );

  const handleSelectCurrency = (selectedItemData: TCurrencyData) => {
    try {
      if (
        !latestCurrencyRates ||
        !JSON.parse(latestCurrencyRates)?.[selectedItemData?.code]
      ) {
        throw new Error('Currency not available!!');
      }

      selectCurrency?.({data: selectedItemData, type: exchangePosition});

      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleTextChange = useCallback(
    debounce((text: string) => {
      setSearch(text.toLowerCase());
    }, 300),
    [],
  );

  const renderItem: ListRenderItem<TCurrencyData> = ({item}) => (
    <CountriesListRow
      disabled={
        exchangeData[reversedPositions[exchangePosition]]?.code === item.code
      }
      isSelected={exchangeData[exchangePosition]?.code === item.code}
      data={item}
      onSelect={handleSelectCurrency}
    />
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <AppText variant="h2" text="Currency Select" />
      </View>
      <View style={styles.container}>
        <Input
          placeholder="Search"
          onChangeText={handleTextChange}
          icon={
            <MagnifyingGlassIcon
              width={18}
              height={20}
              color={THEME_COLORS.WHITE}
            />
          }
        />
        <View style={styles.countriesContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredCountries}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            bounces={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: THEME_COLORS.WHITE,
    paddingTop: 64,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  backButton: {
    marginRight: 16,
  },
  container: {
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 20,
    backgroundColor: THEME_COLORS.BACKGROUND,
    height: '100%',
  },
  countriesContainer: {
    borderRadius: 8,
    height: '80%',
    marginTop: 20,
    backgroundColor: THEME_COLORS.LIGHT_GRAY,
    overflow: 'hidden',
  },
});
