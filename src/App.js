import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import BuggerBuilder from './containers/BuggerBuilder/BuggerBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout >
            <BuggerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;