import ReactDOM from "react-dom";
import React, { Component } from "react";
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";

import subWeeks from 'date-fns/sub_weeks';
import isAfter from 'date-fns/is_after';
import isWithinRange from 'date-fns/is_within_range';
import differenceInDays from 'date-fns/difference_in_days';

import helpers from '../../helpers';

import "./weekSpendingChart.scss";

class CustomTooltip extends Component {

	render() {
		const { active } = this.props;

		if (active) {
			const { payload, label } = this.props;

			if (payload !== null) {
				const normalizedLabel = typeof label === "string" ? label : label + " day(s) ago";
				const amount = helpers.numberWithCommas(helpers.formatAmount(payload[0].value));

				return (
					<div className="week-spending-chart--custom-tooltip">
						<p>{normalizedLabel}</p>
						<p>${amount}</p>
					</div>
				);
			}

			return null;
		}

		return null;
	}
};

class WeekSpendingChart extends Component {
	constructor(props) {
		super(props)

		this.state = {
			weekData: []
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.transactions.length > 0) {

			// this is off, need to get all the transactions in the past 7 days
			// sum up the total spent for each day
			const endDate = new Date();
			const startDate = subWeeks(endDate, 1);

			let startingIndex = 0;

			for (let [index, t] of nextProps.transactions.entries()) {
				const transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));

				// Get the index of the first transaction to fall inside the range
				if (isWithinRange(transactionDate, startDate, endDate)) {
					startingIndex = index;
					break;
				}

				// If we get through the whole array and haven't yet returned it means there
				// are no transactions which fall within our range
				if (index === nextProps.transactions.length - 1) {
					startingIndex = 0;
				}
			}

			let amts = new Array(7).fill(0);

			if (startingIndex !== 0) {
				const pastWeekTransactions = nextProps.transactions.slice(startingIndex);

				pastWeekTransactions.forEach(t => {
					let transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));
					const index = differenceInDays(endDate, transactionDate);

					amts[index] += t.amount;
				});

				amts.reverse();
			}

			const labels = [6, 5, 4, 3, 2, 1, "Today"];
			let data = [];

			for (let i = 0; i < 7; i++) {
				data.push({
					name: labels[i],
					value: amts[i]
				});
			}

			return {
				weekData: data
			}
		}

		return null;
	}

	render() {

		return (
			<ResponsiveContainer className="week-spending-chart" width="90%" height={200} >
				<ComposedChart data={this.state.weekData}>
					<CartesianGrid vertical={false} horizontal={true}/>

					<XAxis dataKey="name" tick={{stroke: 'white'}}/>
					<YAxis tick={{stroke: 'white'}}/>

					<Tooltip content={<CustomTooltip />}/>

					<Bar barSize={8} dataKey="value" stackId="a" fill="rgb(78,  153, 114)" />
				</ComposedChart>
			</ResponsiveContainer>
		);
	}
}

export default WeekSpendingChart;



