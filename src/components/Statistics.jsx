import React, { Component } from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';

// Date functions 
import isWithinRange from 'date-fns/is_within_range';
import subMonths from 'date-fns/sub_months';
import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';

import '../scss/statistics.scss';

class Statistics extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categoryDoughnutData: {},
			lineChartData: {}
		}
	}

	componentDidMount() {
		// Doughnut Chart stuff
		this.generateDoughnutChart();
		this.generateLineChart();
	}

	/************************************* Doughnut Chart *************************************/

	calculateDoughnutAmounts() {
		// Initialize a new array of size 8 and fill it with 0s initially
		let amts = new Array(14);
		amts.fill(0);

		this.props.transactions.forEach(t => {

			let category = (t.category || [''])[0];
			let amount = t.amount;

			switch (category) {
				case 'Food and Drink':
					amts[0] += amount;
					break;
				case 'Travel':
					amts[1] += amount;
					break;
				case 'Shops':
					amts[2] += amount;
					break;
				case 'Recreation':
					amts[3] += amount;
					break;
				case 'Service':
					amts[4] += amount;
					break;
				case 'Community':
					amts[5] += amount;
					break;
				case 'Healthcare':
					amts[6] += amount;
					break;
				case 'Bank Fees':
					amts[7] += amount;
					break;
				case 'Cash Advance':
					amts[8] += amount;
					break;
				case 'Interest':
					amts[9] += amount;
					break;
				case 'Payment':
					amts[10] += amount;
					break;
				case 'Tax':
					amts[11] += amount;
					break;
				case 'Transfer':
					amts[12] += amount;
					break;
				default:
					amts[13] += amount
			}
		});

		// Normalize each value to always have two decimals
		amts = amts.map(val => {
			return (Math.round(val * 100) / 100).toFixed(2);
		})

		// TODO: remove 0 values from the amounts
		return amts;
	}

	generateDoughnutLabels(amountsArray) {

		let defaultLabelsArray = ['Food and Drink', 'Travel', 'Shops', 'Recreation', 'Service', 'Community', 'Healthcare', 'Bank Fees', 'Cash Advance', 'Interest', 'Payment', 'Tax', 'Transfer', 'Other'];

		let labelsArray = [];
		for (let i = 0; i < amountsArray.length; i++) {
			if (amountsArray[i] !== "0.00") {
				labelsArray.push(defaultLabelsArray[i]);
			}
		}

		return labelsArray;
	}

	generateDoughnutChart() {
		// get the data array
		let amounts = this.calculateDoughnutAmounts();

		// get the label array
		let doughnutLabels = this.generateDoughnutLabels(amounts);

		const data = {
			labels: doughnutLabels,
			datasets: [{
				data: amounts,
				backgroundColor: ['#578CA9', '#F6D155', '#004B8D', '#F2552C', '#95DEE3', '#CE3175', '#5A7247', '#CFB095', '#578CA9', '#f4d942', '#afc47d', '#558244', '#347759', '#2d7582']
			}],
			options: {
				responsive: false
			}
		};
		this.setState({ categoryDoughnutData: data });
	}

	/************************************* End Doughnut Chart *************************************/



	/************************************* Line Chart *************************************/

	generateLineChart() {
		/* Sum up costs by week */
		let amounts = new Array(12);
		amounts.fill(0);

		/* Get transactions for the past 365 days */
		$.post('/plaid-api/transactions', { days: 365 }, data => {
			if (!data.transactions) {
				console.error('-----------------------------');
				throw Error('Invalid data from server');
			}

			let allTransactions = data.transactions;

			/* Sort the transactions by date */
			allTransactions = allTransactions.sort((a, b) => {
				return a.date - b.date;
			});

			let mostRecentDate = allTransactions[0].date;
			let year = mostRecentDate.slice(0, 4);
			let month = mostRecentDate.slice(5, 7);
			let day = mostRecentDate.slice(8);

			// Most recent transaction's date
			let x = new Date(year, month, day);
			let i = 0;

			allTransactions.forEach(t => {
				let transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7), t.date.slice(8));

				if (isWithinRange(transactionDate, startOfMonth(x), endOfMonth(x))) {
					amounts[i] += t.amount;
				} else {
					i++;
					// I've moved beyond the current range

					// Go back one week
					x = subMonths(x, 1);

					amounts[i] += t.amount;
				}
			});

			// Round the amounts to two decimals
			amounts = amounts.map(val => {
				return (Math.round(val * 100) / 100).toFixed(2);
			})

			// amounts is in reverse chrnological order 
			//[0 weeks ago, 1 week ago, 2 weeks ago, 3 weeks ago, ... , 51 weeks ago, 52 weeks ago]
			// this.setState({ lineChartBlob: amounts });

			const lineData = {
				labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], //13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
				datasets: [{
					data: amounts
				}],
				options: {
					responsive: false
				}
			};

			this.setState({ lineChartData: lineData });
		});
	}

	/************************************* End Line Chart *************************************/

	render() {
		return (

			<div className='stats'>

				<div className='stats--doughnut'>

					{/* Render a doughnut chart for categorical spending */}
					<Doughnut data={this.state.categoryDoughnutData} />
					<Line data={this.state.lineChartData} />

				</div>
			</div>

		);
	}
}

export default Statistics;