import NextHead from 'next/head'
import { string } from 'prop-types'

const defaultDescription = 'What\'s happening in public data today?'
const defaultOGURL = 'https://publicdata.today/'
const defaultOGImage = 'https://publicdata.today/preview.png'

const Head = (props) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ''}</title>
    <meta name="description" content={props.description || defaultDescription} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" sizes="192x192" href="/touch-icon.png" />
    <link rel="apple-touch-icon" href="/touch-icon.png" />
    <link rel="mask-icon" href="/favicon-mask.svg" color="#49B882" />
    <link rel="icon" href="/favicon.ico" />
    <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet"/>
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ''} />
    <meta property="og:description" content={props.description || defaultDescription} />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta name="twitter:creator" content='@sighrobot' />

    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <link href="https://fonts.googleapis.com/css?family=Anonymous+Pro|Crimson+Text|Fredoka+One" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js" integrity="sha256-8E6QUcFg1KTnpEU8TFGhpTGHw5fJqB9vCms3OhAYLqw=" crossOrigin="anonymous"></script>
  </NextHead>
)

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head
