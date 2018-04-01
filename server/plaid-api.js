require("dotenv").config()

const express = require("express");
const app = express();
const path = require("path");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const moment = require("moment");
const plaid = require("plaid");
const axios = require("axios");

const mongoose = require('mongoose');
const User = mongoose.model('User');

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;
const PLAID_ENV = process.env.PLAID_ENV

let ACCESS_TOKENS = [];
let PUBLIC_TOKEN = null;
let ITEM_IDS = [];

// Initialize the Plaid client
let client = new plaid.Client(
	PLAID_CLIENT_ID,
	PLAID_SECRET,
	PLAID_PUBLIC_KEY,
	plaid.environments[PLAID_ENV]
);

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json());

// Log All Requests
app.all("*", (req, res, next) => {
	console.log(chalk.yellow(`--PLAID-API-- ${req.method} request for ${req.path}`));
	next();
});

// Send back the public key and the environment to plaid
app.get("/key-and-env", (req, res) => {
	const jsonResponse = {
		"publicKey": PLAID_PUBLIC_KEY.toString(),
		"env": PLAID_ENV.toString()
	}

	res.send(jsonResponse);
});

app.post("/rotate-access-tokens", async (req, res) => {

		// First ensure that the tokens have been set, if not try and set them before continuing
		if (ACCESS_TOKENS.length === 0 || ITEM_IDS.length === 0) {
			// first try to set the access tokens and item ids by making a request to /set-storred-access-token.
			// if length is still 0, then return error
			let url = process.env.NODE_ENV === "production" ? "http://budgeteer-prod.herokuapp.com/" : "localhost:5001";

			axios.post(`${url}/plaid-apit/set-storred-access-token`).then(res => {
				if (ACCESS_TOKENS.length === 0 || ITEM_IDS.length === 0) {
					return res.json({
						error: "No accounts could be found. Please relink them"
					});
				}
			});
		}

	// Rotate access tokens
	let newAccessTokens = [];

	for (let token of ACCESS_TOKENS) {
		try {
			let result = await client.invalidateAccessToken(token);
			const accessToken = result.new_acccess_token;
			newAccessTokens.push(result.new_access_token);
		} catch(err) {
			console.error(err);
			res.json({
				error: err
			}).end();
		}
	}

	// Update access tokens on the server
	User.update({ _id: "5a63710527c6b237492fc1bb" }, { $set: { accessTokens: newAccessTokens } }, () => {
		console.log(chalk.green("Access Tokens have rotated"));
	});
});

app.post('/set-stored-access-token', async (req, res, next) => {

	let data;
	try {
		// TODO: Generalize this for SSO
		let person = await User.find({ _id: "5a63710527c6b237492fc1bb"});
		person = person[0];
		if (!person || person.accessTokens.length === 0 || person.itemID.length === 0) {

			let JSONError = JSON.stringify({ "Error": "No Account Infromation Found" });
			throw new Error(JSONError);
		}

		ACCESS_TOKENS = person.accessTokens;
		ITEM_IDS = person.itemID;
		console.log(chalk.green("✓✓✓ ACCESS_TOKENS and ITEM_IDS have been set ✓✓✓"));
		res.sendStatus(200).end();
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}

});

// Get Access Tokens and Item IDs from Plaid
app.post("/get-access-token", async (req, res) => {

	PUBLIC_TOKEN = req.body.public_token;
	try {
		// Get the token response
		let tokenResponse = await client.exchangePublicToken(PUBLIC_TOKEN);
		console.log(tokenResponse.access_token);
		console.log(tokenResponse.item_id);

		// Update our arrays on the server
		ACCESS_TOKENS.push(tokenResponse.access_token);
		ITEM_IDS.push(tokenResponse.item_id);

		// Update our arrays in the DB
		User.update({ _id: "5a63710527c6b237492fc1bb" }, { $set: { accessTokens: ACCESS_TOKENS, itemID: ITEM_IDS } }, () => {
			console.log(chalk.green("New account has been saved"));
		});
	} catch (err) {
		console.log("ERROR:");
		console.log(err);
		return res.json({
			error: err
		});
	}
});

// Get Transaction information
app.post("/transactions", async (req, res, next) => {

	// Default to past 30 days if no specific date is specified
	const days = req.body.days || 30;

	let tempStartDate;
	let tempEndDate;

	if (req.body.startDate && req.body.endDate) {
		tempStartDate = moment(new Date(req.body.startDate)).format("YYYY-MM-DD");
		tempEndDate = moment(new Date(req.body.endDate)).format("YYYY-MM-DD");
	}

	// Default to having today being the start date if no start date or end date were specified
	const startDate = tempStartDate || moment().subtract(days, "days").format("YYYY-MM-DD");
	const endDate = tempEndDate || moment().format("YYYY-MM-DD");

	try {
		const promiseArray = ACCESS_TOKENS.map(token => {
			return client.getTransactions(token, startDate, endDate, {
				count: 250,
				offset: 0,
			})
		});

		let totalData = await Promise.all(promiseArray);
		res.json(totalData);

	} catch (err) {
		if (err !== null) {
			console.log("TRANSACTIONS ERROR");
			console.log(err);
			return res.json({
				error: err
			});
		}
	}
});

app.post ("/balance", async (req, res, next) => {
	let netWorth = 0;
	let map = {};

	const promiseArray = ACCESS_TOKENS.map(token => {
		let x = client.getBalance(token);
		return x;
	});

	let totalData = await Promise.all(promiseArray);

	totalData.forEach(bank => {
		bank.accounts.forEach(acct => {
			if (acct.balances.available !== null) {
				let name = acct.name;
				let value = acct.balances.available;

				netWorth += value;
				map[name] = value;
			}
		});
	});

	res.json({
		"netWorth": netWorth,
		"myMap": map
	});
});


app.post('/linked-accounts', async (req, res) => {

	try {

		let banks = [];

		const itemInfo = ACCESS_TOKENS.map(token => client.getItem(token)); // Get Item ID for each access token
		let itemData = await Promise.all(itemInfo); // Wait for all the promises to resolve
		const ids = itemData.map(thing => client.getInstitutionById(thing.item.institution_id)); // Get the associated instituion for the given Item ID
		let data = await Promise.all(ids); // Wait for all the IDs to be processed
		data.forEach(place => banks.push(place.institution.name)); // Collate all the institutions into one array

		// Send back the array to the client
		res.json({
			"accounts": banks
		});

	} catch (err) {
		console.error(err);
	}
});

module.exports = app;
