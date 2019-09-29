import React from 'react';

import { numberWithCommas, formatAmount } from '../../helpers.js';

import './networthTable.scss';

export default function NetworthTable(props) {
	const accountBalancesLoaded = props.accountBalances.length > 0;

	if (!accountBalancesLoaded) {

		return (

			<div className='networth--loading'>
				<h1>Hang tight, getting your data from the cloud</h1>
				<img src='/loading-gifs/loading-three.gif' alt='loading' />
			</div>

		);

	} else {

		return (

			<section className='networth-table'>

				{props.accountBalances.map((institution, i) => (
					<InstitutionInfo
						key={i}
						displayNames={props.displayNames}
						institutionId={institution.institutionId}
						institutionInfo={institution.institutionBalanceObject}
						institutionNames={props.institutionNames}
					/>
				))}

				<div className='institution-container'>
					<div className='networth--entry networth--total'>
						<p className='acct-name'>Total Savings</p>
						<p className='acct-value'>${numberWithCommas(formatAmount(props.savings))}</p>
					</div>
				</div>

			</section>

		);

	}

}

function InstitutionInfo(props) {
	function getDisplayName(acctId) {
		return props.displayNames.get(acctId) || props.institutionInfo[acctId].accountName;
	}

	const institutionInfo = props.institutionInfo;
	const InstitutionName = props.institutionNames[props.institutionId];

	return (
		<div className='institution-container'>
			<h3>{InstitutionName}</h3>

			{Object.keys(institutionInfo).map((acctId, i) => (

				<div key={i} className='networth--entry'>
					<p className='acct-name'>{getDisplayName(acctId)}</p>
					<p className='acct-value'>
						$
						{numberWithCommas(
							formatAmount(
								institutionInfo[acctId].accountType === 'credit'
									? institutionInfo[acctId].accountBalance * -1
									: institutionInfo[acctId].accountBalance
							)
						)}
					</p>
				</div>

			))}

		</div>

	);

}
