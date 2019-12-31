import React, { Component } from 'react';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';

import Budget from './BudgetChart/budgetCharts.jsx';
import WeekWeekendChart from './WeekWeekendChart/WeekWeekendChart.jsx';
import CategoryChart from './CategoryChart/CategoryChart.jsx';
import AnnualChart from './AnnualChart/AnnualChart.jsx';

import ScrollContainer from './ScrollContainer/ScrollContainer.jsx';

import './statistics.scss';

class Statistics extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		const elements = [];
		elements.push(
			<Budget />,
			<CategoryChart transactions={this.props.transactions} />,
			<AnnualChart transactions={this.props.transactions} />,
			<WeekWeekendChart transactions={this.props.transactions} />
		);

		return (
			<div className='statistics'>
				<ScrollContainer elements={elements} />
			</div>
		);
	}
}

export default Statistics;
