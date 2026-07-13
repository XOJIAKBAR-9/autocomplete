import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Main from './components/Main';

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    );
  }
}

export default App;