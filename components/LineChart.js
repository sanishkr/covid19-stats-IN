/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import theme from '../config/theme';
import {
  actionCreators as StatsActionsCreators,
  selectors,
} from '../store/stats';

const LineChart = ({ dailySummary, currentTheme, ...props }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    props.getDailySummary();
  }, []);
  useEffect(() => {
    const cases = [];
    const labels = [];
    const newcases = [];
    // console.log({ dailySummary });

    dailySummary.forEach(smry => {
      cases.push(smry.totalConfirmed);
      newcases.push(smry.deltaConfirmed);
      labels.push(smry.reportDateString.replace('2020/', ''));
    });
    setData({
      labels,
      datasets: [
        {
          label: '# of total cases',
          fill: false,
          pointBorderColor: 'rgba(75,192,192,1)',
          pointHoverRadius: 5,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,1)',
          data: cases,
        },
        {
          label: '# of new cases',
          fill: false,
          pointBorderColor: 'rgb(237, 137, 54)',
          pointHoverRadius: 5,
          borderColor: 'rgb(237, 137, 54)',
          backgroundColor: 'rgb(237, 137, 54)',
          data: newcases,
        },
      ],
    });
  }, [dailySummary]);

  return (
    <>
      {dailySummary.length > 0 ? (
        <Line
          data={data}
          width={100}
          height={50}
          options={{ maintainAspectRatio: true }}
        />
      ) : null}
    </>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getDailySummary: StatsActionsCreators.getDailySummary,
    },
    dispatch,
  );

const mapStateToProps = store => ({
  dailySummary: selectors.getDailySummary(store),
  currentTheme: selectors.getTheme(store),
});

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);
