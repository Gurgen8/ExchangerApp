import React from 'react';

import {StyleSheet, View} from 'react-native';

import {AppText} from '@/ui-kit';

export const ErrorFallback = () => {
  return (
    <View style={styles.container}>
      <AppText text="Something went wrong" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
