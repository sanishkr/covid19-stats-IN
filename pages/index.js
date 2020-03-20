import React, { Component } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import NoSSR from 'react-no-ssr';
import dynamic from 'next/dynamic';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actionCreators as StatsActionsCreators,
  selectors,
} from '../store/stats';

import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import Footer from '../components/Footer';

const Select =
  typeof window === 'object'
    ? dynamic(import('react-styled-select'))
    : styled.select;
const StyledSelect = styled(Select)`
  & div {
    background-color: ${props => props.theme.bg};
    color: ${props => props.theme.text};
  }
`;

const LineChart = dynamic(import('../components/LineChart.js'));

const Container = styled.div`
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.text};
  ${tw`flex flex-col items-center justify-start w-full min-h-screen pt-4 font-sans`};
`;
const Wrapper = styled.div`
  ${tw`flex flex-row flex-wrap items-center justify-center w-full pb-4 border-b border-gray-300 border-dotted md:w-2/3`};
`;

const LastUpdated = styled.span`
  ${tw`self-start m-2 ml-4 font-mono text-xs antialiased text-purple-600`};
`;
class Stats extends Component {
  state = {
    currentCountry:
      typeof window === 'object' ? localStorage.getItem('country') : null,
    showChart: false,
  };
  componentDidMount = async () => {
    const params = {
      id: this.state.currentCountry || localStorage.getItem('country') || 'IN',
    };
    await Promise.all([
      this.props.getStats(),
      this.props.getCountryStats(params),
    ]);
    this.props.getCountries();
  };
  render() {
    const { stats, countries, countryStats, currentTheme } = this.props;
    // console.log({
    //   stats,
    //   countries,
    //   countryStats,
    //   currentTheme,
    // });
    const options = countries
      ? Object.keys(countries).map((c, i) => ({
          label: c,
          value: countries[c],
        }))
      : [];
    return (
      <>
        {stats.lastUpdate && countryStats.lastUpdate ? (
          <>
            <Header changeTheme={this.props.changeTheme} />
            <Container>
              <div css={tw`flex flex-col w-full md:w-2/3`}>
                <div css={tw`flex flex-row items-center justify-between mx-4`}>
                  <h2 css={tw`self-start text-3xl text-red-500`}>
                    Global Cases
                  </h2>
                  <img
                    css={tw`w-8 h-8`}
                    src="/images/linechart.png"
                    alt="line chart"
                    onClick={() =>
                      this.setState({ showChart: !this.state.showChart })
                    }
                  />
                </div>
                {this.state.showChart ? null : (
                  <LastUpdated>
                    Last updated: {new Date(stats.lastUpdate).toUTCString()}
                  </LastUpdated>
                )}
              </div>
              {this.state.showChart ? (
                <div css={tw`w-full mx-auto my-4 md:w-2/3`}>
                  <LineChart />
                </div>
              ) : (
                <Wrapper>
                  <StatsCard type="confirmed" count={stats.confirmed.value} />
                  <StatsCard type="recovered" count={stats.recovered.value} />
                  <StatsCard type="deaths" count={stats.deaths.value} />
                </Wrapper>
              )}

              <div css={tw`flex flex-col w-full md:w-2/3`}>
                <div css={tw`self-start w-4/5 mt-4 ml-4 md:w-3/5`}>
                  {options.length > 0 ? (
                    <NoSSR>
                      <StyledSelect
                        options={options}
                        // onOpen={myOpenFunc}
                        value={this.state.currentCountry || 'IN'}
                        onChange={c => {
                          this.setState({
                            currentCountry: c,
                          });
                          localStorage.setItem('country', c);
                          this.props.getCountryStats({
                            id: c,
                          });
                        }}
                        css={tw`bg-black`}
                        classes={{
                          selectValue: 'my-custom-value',
                          selectArrow: 'my-custom-arrow',
                          selectControl: 'bg-gray-900',
                        }}
                      />
                    </NoSSR>
                  ) : null}
                </div>
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
              <button
                style={{
                  display: 'none',
                }}
                css={tw`inline-block px-8 py-3 m-2 text-sm font-medium leading-none text-gray-900 bg-white border rounded`}
                className="ad2hs-prompt"
              >
                Install App
              </button>
              <Footer />
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
      getCountries: StatsActionsCreators.getCountries,
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
