import Document, { Html, Head, Main, NextScript } from 'next/document'

const defaultTitle = 'Today in Public Data'
const defaultDescription = "What's happening in public data today?"
const defaultOGURL = 'https://publicdata.today/'
const defaultOGImage = 'https://publicdata.today/tipd.png'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="description" content={defaultDescription} />
          <link rel="icon" sizes="192x192" href="/touch-icon.png" />
          <link rel="apple-touch-icon" href="/touch-icon.png" />
          <link rel="mask-icon" href="/favicon-mask.svg" color="#49B882" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <meta property="og:url" content={defaultOGURL} />
          <meta property="og:title" content={defaultTitle} />
          <meta property="og:description" content={defaultDescription} />
          <meta name="twitter:site" content={defaultOGURL} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={defaultOGImage} />
          <meta name="twitter:creator" content="@sighrobot" />

          <meta property="og:image" content={defaultOGImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <link
            href="https://fonts.googleapis.com/css?family=Public+Sans:300,500&display=swap"
            rel="stylesheet"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js"
            integrity="sha256-8E6QUcFg1KTnpEU8TFGhpTGHw5fJqB9vCms3OhAYLqw="
            crossOrigin="anonymous"
          ></script>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
