import React, { Component } from "react";
import axios from 'axios';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"
import isSameMonth from "date-fns/is_same_month";
import isSameYear from "date-fns/is_same_year";

import { formatAmount, numberWithCommas } from "../../helpers.js";

import "./budgetChart.scss";

const COLORS = [
	"#D46363",
	"#007255",
];

class CustomTooltip extends Component {

	render() {
		const { active } = this.props;

		if (active) {
			return (

				<div className="budget--tooltip">
					<p className="budget--tooltip--spent" >Spent: ${this.props.spent}</p>
					<p className="budget--tooltip--remaining">Remaining: ${this.props.remaining}</p>
				</div>
			);
		}

		return null;
	}
};

class BudgetChart extends Component {
	constructor(props){
		super(props);

		this.state = {
			monthlyBudget: 0,
			totalSpent: 0, // Total spent this month
			rechartsData: [
				{name: 'Spent', value: 0},
				{name: 'Remaining', value: 1}
			]
		};

		this.handleChange = this.handleChange.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {

		if (nextProps.transactions.length <= 0) {
			return null;
		} else {
			let today = new Date();
			let totalSpent = 0;

			for (let t of nextProps.transactions) {
				const transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));

				if (isSameMonth(transactionDate, today) && isSameYear(transactionDate, today)) {
					totalSpent += Math.abs(t.amount);
				}
			}

			const monthlyBudget = localStorage.getItem("monthlyBudget");
			const remaining = monthlyBudget - totalSpent;

			// Create chart data set
			const chartData = [
				{ name: 'Spent', value: totalSpent },
				{ name: 'Remaining', value: remaining },
			];

			// Set the state
			return {
				totalSpent: totalSpent,
				rechartsData: chartData,
				monthlyBudget: monthlyBudget
			};
		}
	}

	handleChange(event) {
		const newMonthlyBudget = event.target.value.trim();

		// Save data to the current local store
		localStorage.setItem("monthlyBudget", newMonthlyBudget);

		const spent = this.state.totalSpent;
		const remaining = (newMonthlyBudget - this.state.totalSpent) <= 0 ? 0 : (newMonthlyBudget - this.state.totalSpent);

		// Update the chart
		let amts = [
			{name: 'Spent', value: spent},
			{name: 'Remaining', value: remaining},
		];

		this.setState({
			rechartsData: amts,
			monthlyBudget: newMonthlyBudget
		});

		axios({
			method: 'POST',
			url: '/user-info/monthly-budget',
			data: {
				monthlyBudget: newMonthlyBudget
			}
		});
	}

	render() {
		let spent = formatAmount(this.state.totalSpent)
		spent = numberWithCommas(spent);

		let remaining = (this.state.monthlyBudget - this.state.totalSpent);
		remaining = formatAmount(remaining);
		remaining = numberWithCommas(remaining);

		const input = this.props.displayInput === false ? "" : (<form className="budget--form">
					<label>
						<input placeholder="Enter your budget" type="number" name="budget" value={this.state.monthlyBudget} onChange={this.handleChange} />
					</label>
				</form>);

		return (
			<div className="budget">

				{input}

				{/*<Doughnut className="budget--doughnut-chart" data={this.state.data} />*/}
				<ResponsiveContainer className="budget--doughnut-chart" width="100%" min-height={400} height={400} >
					<PieChart>
						<Pie
							dataKey="value"
							data={this.state.rechartsData}
							innerRadius="50%"
							outerRadius="90%"
							fill="#8884d8"
							paddingAngle={0}>

							{
								this.state.rechartsData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
							}
							{/*<Label className="center-label" fill={"white"} value={this.state.totalSpent} position="center" />*/}
						</Pie>
						<Tooltip content={<CustomTooltip remaining={remaining} spent={spent}/>}/>
					</PieChart>
				</ResponsiveContainer>
			</div>
		);
	}
}

export default BudgetChart;