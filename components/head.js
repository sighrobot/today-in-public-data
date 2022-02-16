import { Head } from 'next/head'

const defaultDescription = "What's happening in public data today?"
const defaultOGURL = 'https://publicdata.today/'
const defaultOGImage = 'https://publicdata.today/tipd.png'

const CustomHead = props => (
  <Head>
    <title>{props.title || ''}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ''} />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />

    <meta property="og:image" content={props.ogImage || defaultOGImage} />
  </Head>
)

export default CustomHead
