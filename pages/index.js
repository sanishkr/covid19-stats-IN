import React, { Component } from 'react';

import styled from 'styled-components';
import tw from 'tailwind.macro';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actionCreators as StatsActionsCreators,
  selectors,
} from '../store/stats';

import Header from '../components/Header';
import StatsCard from '../components/StatsCard';

const Container = styled.div`
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.text};
  ${tw`flex flex-col items-center justify-start w-full min-h-screen pt-4`};
`;
const Wrapper = styled.div`
  ${tw`flex flex-row flex-wrap items-center justify-center w-full pb-4 border-b border-gray-300 border-dotted md:w-2/3`};
`;

const LastUpdated = styled.span`
  ${tw`self-start m-2 ml-4 font-mono text-xs antialiased text-purple-600`};
`;
class Stats extends Component {
  componentDidMount = async () => {
    const params = { id: 'IN' };
    await Promise.all([
      this.props.getCountryStats(params),
      this.props.getStats(),
      // this.props.getStats()
    ]);
  };
  render() {
    const { stats, countries, countryStats, currentTheme } = this.props;
    // console.log({
    //   stats,
    //   countries,
    //   countryStats,
    //   currentTheme,
    //   props: this.props,
    // });
    return (
      <>
        {stats.lastUpdate && countryStats.lastUpdate ? (
          <>
            <Header changeTheme={this.props.changeTheme} />
            <Container>
              <div css={tw`flex flex-col w-full md:w-2/3`}>
                <h2 css={tw`self-start ml-4 text-3xl text-red-500`}>
                  Global Cases
                </h2>
                <LastUpdated>
                  Last updated: {new Date(stats.lastUpdate).toUTCString()}
                </LastUpdated>
              </div>
              <Wrapper>
                <StatsCard type="confirmed" count={stats.confirmed.value} />
                <StatsCard type="recovered" count={stats.recovered.value} />
                <StatsCard type="deaths" count={stats.deaths.value} />
              </Wrapper>
              <div css={tw`flex flex-col w-full md:w-2/3`}>
                <h2 css={tw`self-start ml-4 text-3xl text-red-500`}>
                  Cases In India
                </h2>
                <LastUpdated>
                  Last updated:{' '}
                  {new Date(countryStats.lastUpdate).toUTCString()}
                </LastUpdated>
              </div>
              <Wrapper>
                <StatsCard
                  type="confirmed"
                  count={countryStats.confirmed.value}
                />
                <StatsCard
                  type="recovered"
                  count={countryStats.recovered.value}
                />
                <StatsCard type="deaths" count={countryStats.deaths.value} />
              </Wrapper>
            </Container>
          </>
        ) : null}
      </>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getStats: StatsActionsCreators.getStats,
      getCountryStats: StatsActionsCreators.getCountryStats,
    },
    dispatch,
  );

const mapStateToProps = store => ({
  stats: selectors.getStats(store),
  currentTheme: selectors.getTheme(store),
  countries: selectors.getCountries(store),
  countryStats: selectors.getCountryStats(store),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
