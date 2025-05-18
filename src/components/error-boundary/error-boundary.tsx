import React, {Component, PropsWithChildren} from 'react';

import {ErrorFallback} from './error-fallback';

type State = {error: Error | null};

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  state: State = {error: null};

  static getDerivedStateFromError(error: Error): State {
    return {error};
  }

  render() {
    return this.state.error ? <ErrorFallback /> : this.props.children;
  }
}
