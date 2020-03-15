import React, { Component } from 'react';

import styled from 'styled-components';
import tw from 'tailwind.macro';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actionCreators as StatsActionsCreators,
  selectors,
} from '../store/stats';

import StatsCard from '../components/StatsCard';

const Container = styled.div`
  ${tw`w-full md:w-4/5 bg-gray-100 flex flex-row flex-wrap items-center justify-center`};
`;

class Page1 extends Component {
  static async getInitialProps({ store, isServer, query, res }) {
    const params = { id: 'IN' };
    await Promise.all([
      // store.dispatch(StatsActionsCreators.getCountryStats(params)),
      // store.dispatch(StatsActionsCreators.getCountries()),
    ]);
    return { ...isServer };
  }
  componentDidMount = () => {
    this.props.getStats();
  };
  render() {
    const { stats, countries, countryStats } = this.props;
    console.log({ stats, countries, countryStats });
    return (
      <>
        <Container>
          <StatsCard type="confirmed" count={stats.confirmed.value} />
        </Container>
      </>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getStats: StatsActionsCreators.getStats,
      // getCountryStats: StatsActionsCreators.getCountryStats,
    },
    dispatch,
  );

const mapStateToProps = store => ({
  stats: selectors.getStats(store),
  countries: selectors.getCountries(store),
  countryStats: selectors.getCountryStats(store),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Page1);
