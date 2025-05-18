import React, {useCallback, useState} from 'react';

import {useFocusEffect} from '@react-navigation/native';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {convertCurrency, TConvertCurrencyResponse} from '@/api';
import {ChevronDownIcon, SwapIcon} from '@/assets/icons';
import {ThemeProvider} from '@/components';
import {
  EExchangePosition,
  useAppStateContext,
  useExchangeContext,
} from '@/context';
import {debounce, offlineConvertCurrency} from '@/helpers';
import {
  EStackNavigationRoutes,
  TStackNavigationScreenProps,
} from '@/navigation';
import {useLatestCurrencyRatesState} from '@/storage';
import {AppText, Input, Select} from '@/ui-kit';

interface TConvertedResult {
  result: TConvertCurrencyResponse | null;
  errorMessage?: null | string;
}

export const ConvertCurrencyScreen = ({
  navigation,
}: TStackNavigationScreenProps<EStackNavigationRoutes.ConvertCurrency>) => {
  const {exchangeData, swapExchange} = useExchangeContext();
  const [latestCurrencyRates] = useLatestCurrencyRatesState();

  const {isOfflineMode} = useAppStateContext();

  const [convertedResult, setConvertedResult] = useState<TConvertedResult>();

  const onFromSelectPress = useCallback(() => {
    navigation.navigate(EStackNavigationRoutes.SelectCurrency, {
      exchangePosition: EExchangePosition.from,
    });
  }, [navigation]);
  const onToSelectPress = useCallback(() => {
    navigation.navigate(EStackNavigationRoutes.SelectCurrency, {
      exchangePosition: EExchangePosition.to,
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const initialFetch = async () => {
        if (
          !exchangeData.from?.code ||
          !exchangeData.to?.code ||
          !convertedResult?.result?.query.amount
        ) {
          setConvertedResult({result: null});

          return;
        }

        try {
          if (isOfflineMode) {
            if (isOfflineMode) {
              setConvertedResult({
                result: {
                  result: offlineConvertCurrency(
                    JSON.parse(latestCurrencyRates as string),
                    exchangeData.from.code,
                    exchangeData.to.code,
                    convertedResult?.result?.query.amount,
                  ),

                  query: {amount: convertedResult?.result?.query.amount},
                },
              });
              return;
            }
          }
          const result = await convertCurrency({
            from: exchangeData.from.code,
            to: exchangeData.to.code,
            amount: convertedResult?.result?.query.amount,
          });

          if (result) {
            setConvertedResult({result});
          }
        } catch (error) {
          setConvertedResult({
            errorMessage: 'Conversation failed',
            result: null,
          });
        }
      };

      initialFetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exchangeData.from?.code, exchangeData.to?.code, isOfflineMode]),
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAmountChange = useCallback(
    debounce(async (newAmount: string) => {
      if (!exchangeData.from?.code || !exchangeData.to?.code) {
        if (!newAmount && convertedResult?.result) {
          setConvertedResult({result: null});
        }

        return;
      }

      try {
        if (isOfflineMode) {
          setConvertedResult({
            result: {
              result: offlineConvertCurrency(
                JSON.parse(latestCurrencyRates as string),
                exchangeData.from.code,
                exchangeData.to.code,
                +newAmount,
              ),

              query: {amount: +newAmount},
            },
          });
          return;
        }
        const result = await convertCurrency({
          from: exchangeData.from.code,
          to: exchangeData.to.code,
          amount: +newAmount,
        });

        if (result) {
          setConvertedResult({result});
        }
      } catch (error) {
        setConvertedResult({errorMessage: 'Conversation failed', result: null});
      }
    }, 300),
    [exchangeData, isOfflineMode],
  );

  const handleCloseKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ThemeProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={styles.keyboardContainer}>
        <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
          <View style={styles.container}>
            <View style={styles.selectsRow}>
              <Select
                rightIcon={<ChevronDownIcon />}
                label="From:"
                value={exchangeData.from?.code || ''}
                flagSrc={exchangeData.from?.flagSrc}
                onPress={onFromSelectPress}
              />
              <TouchableOpacity onPress={swapExchange}>
                <SwapIcon style={styles.swapIcon} width={20} height={20} />
              </TouchableOpacity>
              <Select
                rightIcon={<ChevronDownIcon />}
                label="To:"
                value={exchangeData.to?.code || ''}
                flagSrc={exchangeData.to?.flagSrc}
                onPress={onToSelectPress}
              />
            </View>

            <View>
              <AppText offsetBottom={8} text="Amount:" variant="p1" />
              <Input
                maxLength={30}
                keyboardType="numeric"
                onChangeText={handleAmountChange}
                errorMessage={convertedResult?.errorMessage}
                editable={!!(exchangeData.from?.code && exchangeData.to?.code)}
              />
            </View>
            <View style={styles.resultExchange}>
              {!!convertedResult?.result?.query?.amount && (
                <AppText
                  variant="p1"
                  offsetBottom={8}
                  text={`${convertedResult?.result?.query.amount}${exchangeData.from?.symbol} =`}
                />
              )}

              {!!convertedResult?.result && (
                <AppText
                  variant="h1"
                  text={`${convertedResult.result?.result} ${exchangeData.to?.symbol}`}
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  selectsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  swapIcon: {
    marginTop: 26,
  },
  resultExchange: {
    marginTop: 24,
    height: 130,
  },
});
