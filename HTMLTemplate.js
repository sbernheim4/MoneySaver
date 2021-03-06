export default function (templateConfig) {
    const { title, message } = templateConfig.htmlWebpackPlugin.options;

    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <title>${title}</title>

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
                <meta name="${title}" content="Organize all your finances in one place">

                <!-- Favicon -->
                <link rel="shortcut icon" type="image/png" href="https://img.icons8.com/dusk/64/000000/cash-in-hand.png"/>

            </head>

            <body>
                <noscript>
                    <h1>Please Enable JS in your browser in order to continue</h1>
                </noscript>

                <div id='root'></div>

            </body>
        </html>
    `;
}
