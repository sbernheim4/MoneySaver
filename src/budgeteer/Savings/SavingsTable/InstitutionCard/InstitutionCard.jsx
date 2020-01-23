import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';

import InstitutionInfoRow from './../InstitutionInfoRow.jsx';
import SavingsChart from './../../SavingsChart/SavingsChart.jsx';
import { determineNewWidth } from './helpers';

import './institutionCard.scss';

export default function InstitutionCard(props) {

	const {
		institutionInfo,
		institutionNames,
		institutionId,
		totalSavings,
	} = props;

	const [width, setWidth] = useState(0);
	const [institutionSavings, setInstitutionSavings] = useState(0);
	const [madeCall, setMadeCall] = useState(false);

	const institutionNameRef = useRef(null);
	const positionBankName = useCallback(() => determineNewWidth(institutionNameRef), [props.institutionNames]);

	useEffect(() => {

		async function getInstitutionData() {

			if (madeCall && institutionId && institutionId.length && institutionId.length > 0) {

				const institutionRequest = await axios.get(`/plaid-api/balance?institutionId=${institutionId}`);
				const institutionData = institutionRequest.data;

				setMadeCall(true);
				setInstitutionSavings(institutionData);

			}

		}

	}, [props.institutionId]);

	useEffect(() => {

		const newWidth = positionBankName(institutionNameRef);
		setWidth(newWidth);

	}, [props.institutionNames]);

	// TODO: totalSavings should really be state var institutionSavings
	function generateInstitutionInfoRows(institutionInfo, totalSavings) {

		const institutionInfoKeys = Object.keys(institutionInfo);

		const institutionInfoRows = institutionInfoKeys.map((acctId, i) => {
			return <InstitutionInfoRow
				key={i}
				institutionInfo={institutionInfo}
				totalSavings={totalSavings}
				acctId={acctId}
			/>
		});

		institutionInfoRows.sort((a, b) => {
			const aAccountId = a.props.acctId;
			const bAccountId = b.props.acctId;
			const aTotal = a.props.institutionInfo[aAccountId].accountBalance;
			const bTotal = b.props.institutionInfo[bAccountId].accountBalance;

			return bTotal - aTotal;
		});

		return institutionInfoRows;

	}


	const institutionInfoValues = Object.values(institutionInfo);
	const institutionBalanceTotal = institutionInfoValues.reduce((acc, currVal) => acc + currVal.accountBalance, 0);
	const institutionName = institutionNames[institutionId] || 'loading';
    const percent = Math.round(institutionBalanceTotal / totalSavings * 100, 2) === Infinity ?
		'...' :
		Math.round(institutionBalanceTotal / totalSavings * 100, 2);
	// TODO: Pass in the state variable institutionSavings instead of total savings
	const institutionInfoRows = generateInstitutionInfoRows(institutionInfo, totalSavings);
	const instituitionClassName = institutionName === 'loading' ?
		'institution-card--info--name institution-card--info--name--loading' :
		'institution-card--info--name';

	function handleClick() {
		const chart = institutionNameRef.current.closest('.institution-card');
		const card = chart.querySelector(".savings-chart");
		card.classList.toggle('savings-chart--show');
	}

	return (
		<div className='institution-card'>

			<div className='institution-card--info'
				onClick={handleClick}
			>
				<h3 style={{left: `calc(50% - ${width / 2}px`}}>
					<span
						className={instituitionClassName}
						ref={institutionNameRef}
					>
					{institutionName}
					</span>

					<span
						className='institution-card--info--percent'
					> - {percent}%
					</span>

				</h3>

				{institutionInfoRows}
			</div>

			<SavingsChart
				institutionId={institutionId}
			/>
		</div>
	);
}
