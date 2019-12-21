/* eslint no-undefined: 0 */
/* eslint no-multi-spaces: 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTape,
	faSearch,
	faTags,
	faCalendar,
	faUtensils,
	faPlane,
	faShoppingBag,
	faWrench,
	faUsers,
	faMedkit,
	faPercent,
	faMoneyBillAlt,
	faExchangeAlt,
	faUniversity,
	faQuestion
} from '@fortawesome/free-solid-svg-icons';

import { storeDisplayNames } from './../redux/actions/app';

import WeekSpendingChart from './WeekSpendingChart/WeekSpendingChart.jsx';
import TransactionContainer from './TransactionContainer/TransactionContainer.jsx';

import './accountsContainer.scss';

import { formatAmount, toTitleCase } from '../helpers';

class AccountsContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filteredTransactions: [],
			filterType: '',
			filteredTotal: 0.0,
			keyWord: ''
		};

		this.months = ['Jan.', 'Feb.', 'Mar.', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

		this.getAccountTransactions = this.getAccountTransactions.bind(this);
		this.getCategoryTransactions = this.getCategoryTransactions.bind(this);
		this.getDate = this.getDate.bind(this);
		this.searchByDate = this.searchByDate.bind(this);
		this.searchByKeyword = this.searchByKeyword.bind(this);
		this.getKeyword = this.getKeyword.bind(this);
		this.getAccountDisplayName = this.getAccountDisplayName.bind(this);
	}

	async componentDidMount() {

		this.props.getDisplayNames();
		this.getAccountTransactions('all');

	}

	componentWillReceiveProps() {

		this.getAccountTransactions();

	}

	getAccountTransactions(account_id = 'all') {

		let releventTransactions = [];
		let type;
		let total = 0;

		if (account_id === 'all') {

			releventTransactions = this.props.transactions;
			type = 'All Categories';

		} else {

			releventTransactions = this.props.transactions.filter((t) => {
				return t.account_id === account_id;
			});

		}

		total = releventTransactions.reduce((acc, transaction) => transaction.amount + acc, 0);
		total = formatAmount(total);

		// Update the state with the relevent transactions and how the user is sorting them
		// Get the account name based on what the ID is ex: Checking Account, Savings Account, Credit Card etc.
		if (type === undefined) {

			this.props.accounts.forEach((account) => {

				if (account.account_id === account_id) {
					type = account.name;
					return;
				}

			});

		}

		releventTransactions.sort((a, b) => {
			let dateOne = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
			let dateTwo = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
			return dateOne - dateTwo;
		});

		const now = new Date();
		const nowString = this.months[now.getMonth()] + '  ' + now.getDate() + '.  ' + now.getFullYear();
		const prevString = this.months[now.getMonth()] + '  ' + now.getDate() + '.  ' + (now.getFullYear() - 1);

		const categoryType = type === 'All Categories' ?
			prevString + ' - ' + nowString :
			this.getAccountDisplayName(account_id, type);

		this.setState({
			categoryTransactions: releventTransactions,
			categoryType: categoryType,
			categoryTotal: total
		});

	}

	getCategoryTransactions(categoryString) {
		let releventTransactions = [];

		// Other displays transactions with a category of null
		if (categoryString === 'Other') {

			releventTransactions = this.props.transactions.filter((t) => {
				t.category === null ||
					t.category[0] === 'Bank Fees' ||
					t.category[0] === 'Cash Advance' ||
					t.category[0] === 'Tax';
			});

		} else {

			releventTransactions = this.props.transactions.filter((t) => {
				return t.category !== null && t.category[0] === categoryString
			});

		}

		// Get the total spent for the current Category
		let total = 0;

		releventTransactions.forEach((transaction) => {
			total += transaction.amount;
		});

		total = formatAmount(total);

		// Sort the transactions newest to oldest
		releventTransactions.sort((a, b) => {
			let dateOne = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
			let dateTwo = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
			return dateOne - dateTwo;
		});

		// Update the state with the relevent transactions and how the user is sorting them
		this.setState({
			categoryTransactions: releventTransactions,
			categoryType: categoryString,
			categoryTotal: total
		});
	}

	getDate(e, val) {
		this.setState({ [val]: e.target.value });
	}

	getAccountDisplayName(accountID, defaultName) {

		return this.props.displayNames === undefined ? defaultName : this.props.displayNames.get(accountID);
	}

	async searchByDate(e) {
		// TODO: Need additional validation if using forms to get data
		// Ensure month is between 1 and 12
		// Ensure the day given is between 1 - 30, 1 -31, 1 - 28 or 1 - 29 based on the month and year
		// Don't allow a range greater than 5 years or some other arbitrary amount

		e.preventDefault();
		let dateOne = new Date(this.state.yearOne, this.state.monthOne - 1, this.state.dayOne);
		let dateTwo = new Date(this.state.yearTwo, this.state.monthTwo - 1, this.state.dayTwo);
		let releventTransactions = [];
		let total = 0;

		try {
			const data = await axios({
				method: 'GET',
				url: '/plaid-api/transactions',
				data: {
					startDate: dateOne,
					endDate: dateTwo
				}
			});

			data.forEach((acct) => {
				acct.transactions.forEach((transaction) => {
					releventTransactions.push(transaction);
					total += transaction.amount;
				});
			});

			total = formatAmount(total);

			// Sort the transactions newest to oldest
			releventTransactions.sort((a, b) => {
				let dateOne = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
				let dateTwo = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
				return dateOne - dateTwo;
			});

			this.setState({
				categoryTransactions: releventTransactions,
				categoryTotal: total,
				categoryType: `${this.months[dateOne.getMonth()]} ${dateOne.getDate()} - ${
					this.months[dateTwo.getMonth()]
				} ${dateTwo.getDate()}`
			});
		} catch (err) {
			console.error(err);
		}
	}

	searchByKeyword(searchTerm) {

		const normalizedKeyWord = searchTerm.toLowerCase().trim();

		if (normalizedKeyWord === '') {
			return this.getAccountTransactions();
		}

		const matchingTransactions = this.props.transactions.filter((transaction) => {
			const normalizedTransactionName = transaction.name.toLowerCase().trim();
			return normalizedTransactionName.includes(normalizedKeyWord);
		});

		const categoryTotal = matchingTransactions.reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
		const formattedCategoryTotal = formatAmount(categoryTotal);

		const sortedTransactions = matchingTransactions.sort((a, b) => {
			let dateOne = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
			let dateTwo = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
			return dateOne - dateTwo;
		});

		const categoryType = toTitleCase(searchTerm);

		this.setState({
			categoryTransactions: sortedTransactions,
			categoryType,
			categoryTotal: formattedCategoryTotal
		});

	}

	getKeyword(e) {
		let searchTerm = e.target.value;

		this.searchByKeyword(searchTerm);

		this.setState({
			keyWord: searchTerm
		});
	}

	openCategoryViewer() {
		const otherViewer = document.querySelector('.accounts--search-options--icon-search--accts-search--accts');
		otherViewer.classList.remove('accounts--search-options--icon-search--accts-search--accts__active');

		const elem = document.querySelector('.accounts--search-options--icon-search--categorical-search--categories');
		elem.classList.add('accounts--search-options--icon-search--categorical-search--categories__active');
	}

	closeCategoryViewer() {
		const elem = document.querySelector('.accounts--search-options--icon-search--categorical-search--categories');
		elem.classList.remove('accounts--search-options--icon-search--categorical-search--categories__active');
	}

	openAccountsViewer() {
		const otherViewer = document.querySelector(
			'.accounts--search-options--icon-search--categorical-search--categories'
		);
		otherViewer.classList.remove('accounts--search-options--icon-search--categorical-search--categories__active');

		const elem = document.querySelector('.accounts--search-options--icon-search--accts-search--accts');
		elem.classList.add('accounts--search-options--icon-search--accts-search--accts__active');
	}

	closeAccountsViewer() {
		const elem = document.querySelector('.accounts--search-options--icon-search--accts-search--accts');
		elem.classList.remove('accounts--search-options--icon-search--accts-search--accts__active');
	}

	render() {
		return (
			<div className='accounts'>
				<div className='accounts--search-options'>
					<div className='accounts--search-options--keyword-search'>
						{/*<FontAwesomeIcon className="icon" icon={faSearch}/>*/}

						<form onSubmit={(e) => e.preventDefault()}>
							<input
								type='text'
								placeholder='Search transactions'
								value={this.state.keyWord}
								onChange={(e) => {
									this.getKeyword(e);
								}}
							/>
						</form>

					</div>

					<div className='accounts--search-options--icon-search'>
						<div className='accounts--search-options--icon-search--categorical-search'>
							<FontAwesomeIcon className='icon' icon={faTags} onMouseEnter={this.openCategoryViewer} />

							{/* display this div when icon above is clicked */}
							<div
								className='accounts--search-options--icon-search--categorical-search--categories'
								onMouseLeave={this.closeCategoryViewer}>
								<div>
									<section>
										<FontAwesomeIcon
											className='category-icon'
											onClick={() => {
												this.getCategoryTransactions('Food and Drink');
												this.closeCategoryViewer();
											}}
											icon={faUtensils}
										/>
										<p>Food and Drink</p>
									</section>
									<section>
										<FontAwesomeIcon
											className='category-icon'
											onClick={() => {
												this.getCategoryTransactions('Travel');
												this.closeCategoryViewer();
											}}
											icon={faPlane}
										/>
										<p>Travel</p>
									</section>
									<section>
										<FontAwesomeIcon
											className='category-icon'
											onClick={() => {
												this.getCategoryTransactions('Shops');
												this.closeCategoryViewer();
											}}
											icon={faShoppingBag}
										/>
										<p>Shops</p>
									</section>
									<section>
										<FontAwesomeIcon
											className='category-icon'
											onClick={() => {
												this.getCategoryTransactions('Recreation');
												this.closeAccountsViewer();
											}}
											icon={faTape}
										/>
										<p>Recreation</p>
									</section>
									<section>
										<FontAwesomeIcon
											className='category-icon'
											onClick={() => {
												this.getCategoryTransactions('Service');
												this.closeCategoryViewer();
											}}
											icon={faWrench}
										/>
										<p>Service</p>
									</section>
									<section>
										<FontAwesomeIcon
											className='category-icon'
											onClick={() => {
												this.getCategoryTransactions('Community');
												this.closeCategoryViewer();
											}}
											icon={faUsers}
										/>
										<p>Community</p>
									</section>
									<section>
										<FontAwesomeIcon
											className='category-icon'
											onClick={() => {
												this.getCategoryTransactions('Healthcare');
												this.closeCategoryViewer();
											}}
											icon={faMedkit}
										/>
										<p>Healthcare</p>
									</section>
									<section>
										<FontAwesomeIcon
											className='category-icon'
											onClick={() => {
												this.getCategoryTransactions('Bank Fees');
												this.closeCategoryViewer();
											}}
											icon={faQuestion}
										/>
										<p>Bank Fees</p>
									</section>
									<section>
										<FontAwesomeIcon
											className='category-icon'
											onClick={() => {
												this.getCategoryTransactions('Cash Advance');
												this.closeCategoryViewer();
											}}
											icon={faQuestion}
										/>
										<p>Cash Advance</p>
									</section>
									<section>
										<FontAwesomeIcon
											className='category-icon'
											onClick={() => {
												this.getCategoryTransactions('Interest');
												this.closeCategoryViewer();
											}}
											icon={faPercent}
										/>
										<p>Interest</p>
									</section>
									<section>
										<FontAwesomeIcon
											className='category-icon'
											onClick={() => {
												this.getCategoryTransactions('Payment');
												this.closeCategoryViewer();
											}}
											icon={faMoneyBillAlt}
										/>
										<p>Payment</p>
									</section>
									<section>
										<FontAwesomeIcon
											className='category-icon'
											onClick={() => {
												this.getCategoryTransactions('Tax');
												this.closeCategoryViewer();
											}}
											icon={faQuestion}
										/>
										<p>Tax</p>
									</section>
									<section>
										<FontAwesomeIcon
											className='category-icon'
											onClick={() => {
												this.getCategoryTransactions('Transfer');
												this.closeCategoryViewer();
											}}
											icon={faExchangeAlt}
										/>
										<p>Transfer</p>
									</section>
									<section>
										<FontAwesomeIcon
											className='category-icon'
											onClick={() => {
												this.getCategoryTransactions('Other');
												this.closeCategoryViewer();
											}}
											icon={faQuestion}
										/>
										<p>Other</p>
									</section>
								</div>
							</div>
						</div>

						<div className='accounts--search-options--icon-search--date-search'>
							<FontAwesomeIcon className='icon' icon={faCalendar} />
						</div>

						<div className='accounts--search-options--icon-search--accts-search'>
							<FontAwesomeIcon
								className='icon'
								icon={faUniversity}
								onMouseEnter={this.openAccountsViewer}
							/>

							<div
								className='accounts--search-options--icon-search--accts-search--accts'
								onMouseLeave={this.closeAccountsViewer}>
								<div>
									<button
										onClick={() => {
											this.getAccountTransactions('all');
											this.closeAccountsViewer();
										}}>
										All Transactions
									</button>

									{this.props.accounts.map((a, index) => (
										<button
											key={index}
											onClick={() => {
												this.getAccountTransactions(a.account_id);
												this.closeAccountsViewer();
											}}>
											{this.getAccountDisplayName(a.account_id, a.name)}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				<WeekSpendingChart transactions={this.state.filteredTransactions} />

				<TransactionContainer
					categoryType={this.state.filterType}
					categoryTotal={this.state.filteredTotal}
					transactions={this.state.filteredTransactions}
					accounts={this.props.accounts}
					displayNames={this.props.displayNames}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {

	const displayNamesMap = state.app.displayNames ? new Map(state.app.displayNames) : new Map();

	return {
		transactions: state.app.transactions || [],
		accounts: state.app.accounts || [],
		displayNames: displayNamesMap
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getDisplayNames: () => dispatch(storeDisplayNames())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountsContainer);
