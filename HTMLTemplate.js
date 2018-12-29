export default function (templateConfig) {
	const { title, message } = templateConfig.htmlWebpackPlugin.options;

return `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<!-- Plaid -->
			<script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>

			<!-- Google Fonts -->
			<link href="https://fonts.googleapis.com/css?family=Lato:300,400" rel="stylesheet preload">

			<meta charset="UTF-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge">

			<!-- Mobile Friendly Tag -->
			<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">

			<!-- TODO: Uncomment below line to load manifest.json -->
			<!-- <link rel="manifest" href='manifest.json'> -->

			<!-- Theme Color -->
			<meta name="theme-color" content="#346CA1">

			<!-- Meta Description Tag -->
			<meta name="description" content="Track and gain insights into your financial situation by viewing all your accounts in one place. View and track each of your transactions, visualize your spending patterns and learn where you can save most efficiently"/>

			<!-- Title -->
			<title>${title}</title>
			<meta name="${title}" content="Organize all your finances in one place">


			<!-- Global site tag (gtag.js) - Google Analytics -->
			<script async src="https://www.googletagmanager.com/gtag/js?id=UA-122709492-1"></script>
			<script>
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'UA-122709492-1');
			</script>
		</head>

		<body>
			<noscript>
				<h1>Please Enable JS in your browser in order to continue</h1>
			</noscript>

			<div id='root'></div>
			<script src='/${message}.js'></script>

			<!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk&libraries=visualization&callback=initMap" type="text/javascript"></script> -->
		</body>
	</html>
`;
}
