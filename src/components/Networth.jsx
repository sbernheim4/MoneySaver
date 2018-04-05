import React, { Component } from "react";
import helpers from "./helpers.js";

import '../scss/networth.scss';

class Networth extends Component {
	constructor(props) {
		super(props);

		this.state = {
			total: 0, // Keep track of total net worth
			accountBalances: [], // Map of account name to its balance
			recurringPayments: [] // Keep track of recurring costs like Spotify or Netflix etc
		}
	}

	componentWillReceiveProps(nextProps) {

		let duplicates = new Set();
		nextProps.transactions.forEach(val => {
			let numOccurances = 0;

			nextProps.transactions.forEach(secondVal => {
				if (JSON.stringify(val) === JSON.stringify(secondVal)) {
					numOccurances += 1;
				}
			});

			// TODO: Change the 1 to the minimum number of times you want the number of
			// occurances to be before its considered a recurring payment.
			//
			// Should also work to check that the payment has been made in the past two
			// most recent months (NOT INCLUDING THE CURRENT MONTH)
			if (numOccurances > 1) {
				duplicates.add(JSON.stringify(val));
			}
		});

		let recurringPayments = [];
		duplicates.forEach(payment => {
			recurringPayments.push(JSON.parse(payment));
		});

		this.setState({
			recurringPayments: recurringPayments
		});

	}

	async componentDidMount() {

		const fetchOptions = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		};

		let data = await fetch('plaid-api/balance', fetchOptions);
        data = await data.json();

		this.setState({
			total: data.networth,
			accountBalances: data.maps
		});

	}

	render () {
		let recurringPayments;

		if (this.state.recurringPayments.length === 0) {
			recurringPayments = <p>No Recurring Payments Found</p>
		} else {
			recurringPayments = <ul> this.state.recurringPayments.map(val => <li>val.name</li>) </ul>
		}

		return (
			<div className='networth'>
				<table>
					<thead>
						<tr>
							<th>Account Name</th>
							<th>Amount</th>
						</tr>
					</thead>

					<tbody>
						{this.state.accountBalances.map( (keyName, index) => (
							Object.keys(keyName).map( (acctName, index) => (
							<tr key={index} className='networth--entry'>
								<td className='acct-name'>{acctName}</td>
								<td className='acct-value'>{keyName[acctName]}</td>
							</tr>
							))
						))}
						<tr>
							<td className='acct-name'>Total</td>
							<td className='acct-value'>${this.state.total}</td>
						</tr>
					</tbody>
				</table>

				<div className='networth--recurring-payments'>
					<h2>Recurring Payments</h2>
					<hr />
					{recurringPayments}
				</div>

			</div>
			)
	}
}

export default Networth
