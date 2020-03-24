/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import tw from 'tailwind.macro';
import NoSSR from 'react-no-ssr';
import dynamic from 'next/dynamic';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actionCreators as StatsActionsCreators,
  selectors,
} from '../store/stats';
import {
  actionCreators as IndiaStatsActionsCreators,
  selectors as IndiaSelectors,
} from '../store/india';

import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import { Wrapper } from './index';
const LineChartCountry = dynamic(import('../components/LineChartCountry'));

const OpenModal = keyframes`
  0% {
    opacity: 0;
    transform: scaleY(0);
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
`;

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

const StyledDiv = styled.div`
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.text};
  ${tw`fixed z-30 flex flex-col items-center justify-start visible w-full h-full min-h-screen pt-4 overflow-y-scroll font-sans`};
  ${props =>
    props.visible
      ? css`
          animation: ${OpenModal} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        `
      : ``}
}
`;

const Country = ({
  visible,
  cb,
  stats,
  stateStats,
  states,
  dailySummaryIndia,
  ...props
}) => {
  const [currentState, setCurrentState] = useState(
    localStorage.getItem('state') || 'Karnataka',
  );
  const [ss, setSS] = useState({});
  const [showChart, setShowChart] = useState(false);
  useEffect(() => {
    props.getStats();
  }, [visible]);

  useEffect(() => {
    stateStats(currentState);
    const ss = stateStats(currentState);
    ss.length > 0 && setSS(ss[0]);
  }, [stats.total]);

  useEffect(() => {
    const ss = stateStats(currentState);
    // console.log({ stateStats: ss[0] });
    ss.length > 0 && setSS(ss[0]);
  }, [currentState]);
  const options = states
    ? Object.keys(states).map(st => ({
        label: states[st],
        value: states[st],
      }))
    : [];
  // console.log({ states, options, ss });
  return (
    <StyledDiv visible={visible}>
      <div css={tw`flex flex-row justify-between w-full px-4 mb-4 md:w-2/3`}>
        <div css={tw`flex flex-col`}>
          <h1 css={tw`text-base text-red-500 md:text-2xl lg:text-4xl`}>
            COVID-19 Latest Stats - India
          </h1>
          <span css={tw`text-red-500`}>
            Data Source:{' '}
            <a
              css={tw`text-sm text-blue-500`}
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/amodm/api-covid19-in"
            >
              amodm
            </a>
            's APIs
          </span>
        </div>
        <i className="h-12 text-2xl not-italic cursor-pointer" onClick={cb}>
          &#10005;
        </i>
      </div>

      <div css={tw`flex flex-col w-full md:w-2/3`}>
        <div css={tw`flex flex-row items-center justify-between mx-4`}>
          <h2 css={tw`self-start text-3xl text-red-500`}>India - Summary</h2>
          <img
            css={tw`w-8 h-8 cursor-pointer`}
            src="/images/linechart.png"
            alt="line chart"
            onClick={() => setShowChart(!showChart)}
          />
        </div>
      </div>

      {stats.total ? (
        showChart ? (
          <div css={tw`w-full mx-auto my-4 md:w-2/3`}>
            <LineChartCountry />
          </div>
        ) : (
          <Wrapper>
            <StatsCard type="confirmed" count={stats.total} />
            <StatsCard type="recovered" count={stats.discharged} />
            <StatsCard type="deaths" count={stats.deaths} />
          </Wrapper>
        )
      ) : null}

      <div css={tw`flex flex-col w-full md:w-2/3`}>
        <div css={tw`self-start w-4/5 mt-4 ml-4 md:w-3/5`}>
          {options.length > 0 ? (
            <NoSSR>
              <StyledSelect
                options={options}
                // onOpen={myOpenFunc}
                value={currentState}
                onChange={s => {
                  setCurrentState(s);
                  localStorage.setItem('state', s);
                  // this.props.getCountryStats({
                  //   id: c,
                  // });
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
      </div>
      {ss && ss.loc ? (
        <Wrapper>
          <StatsCard
            type="confirmed"
            count={ss.confirmedCasesIndian + ss.confirmedCasesForeign}
          />
          <StatsCard type="recovered" count={ss.discharged} />
          <StatsCard type="deaths" count={ss.deaths} />
        </Wrapper>
      ) : null}
    </StyledDiv>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getStats: IndiaStatsActionsCreators.getLatestStatsIndia,
      getDailySummaryIndia: IndiaStatsActionsCreators.getDailySummaryIndia,
    },
    dispatch,
  );

const mapStateToProps = store => ({
  stats: IndiaSelectors.getLatestStatsIndia(store),
  stateStats: IndiaSelectors.getStateStatsIndia(store),
  currentTheme: selectors.getTheme(store),
  dailySummaryIndia: IndiaSelectors.getDailySummaryIndia(store),
  states: IndiaSelectors.getStates(store),
});

export default connect(mapStateToProps, mapDispatchToProps)(Country);
