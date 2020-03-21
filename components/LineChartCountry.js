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
import {
  actionCreators as IndiaStatsActionsCreators,
  selectors as IndiaSelectors,
} from '../store/india';

const LineChart = ({ dailySummaryIndia, currentTheme, ...props }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    props.getDailySummaryIndia();
  }, []);
  useEffect(() => {
    const cases = [];
    const labels = [];
    const deaths = [];
    const newcases = [];
    // console.log({ dailySummaryIndia });

    let prevDayCases =
      dailySummaryIndia.length > 0 ? dailySummaryIndia[0].summary.total : 0;
    dailySummaryIndia.forEach(smry => {
      cases.push(smry.summary.total);
      deaths.push(smry.summary.deaths);
      newcases.push(smry.summary.total - prevDayCases);
      labels.push(smry.day.replace('2020-', ''));
      prevDayCases = smry.summary.total;
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
          pointBorderColor: '#ed8936',
          pointHoverRadius: 5,
          borderColor: '#ed8936',
          backgroundColor: '#ed8936',
          data: newcases,
        },
        {
          label: '# of total deaths',
          fill: false,
          pointBorderColor: '#f56565',
          pointHoverRadius: 5,
          borderColor: '#f56565',
          backgroundColor: '#f56565',
          data: deaths,
        },
      ],
    });
  }, [dailySummaryIndia]);

  return (
    <>
      {dailySummaryIndia.length > 0 ? (
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
      getDailySummaryIndia: IndiaStatsActionsCreators.getDailySummaryIndia,
    },
    dispatch,
  );

const mapStateToProps = store => ({
  dailySummaryIndia: IndiaSelectors.getDailySummaryIndia(store),
  currentTheme: selectors.getTheme(store),
});

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);
