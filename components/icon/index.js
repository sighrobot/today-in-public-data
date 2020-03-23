import './style.styl'

const icons = {
  grid: {
    children: (
      <path d="M53 17h12c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H53a1 1 0 01-1-1V18c0-.6.4-1 1-1zm1 2v10h10V19H54zm-36-3h12c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H18a1 1 0 01-1-1V17c0-.6.4-1 1-1zm1 2v10h10V18H19zM1 0h12c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H1a1 1 0 01-1-1V1c0-.6.4-1 1-1zm1 2v10h10V2H2zm34-2h12c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H36a1 1 0 01-1-1V1c0-.6.4-1 1-1zm1 2v10h10V2H37zm16 50h12c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H53a1 1 0 01-1-1V53c0-.6.4-1 1-1zm1 2v10h10V54H54zm-36-2h12c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H18a1 1 0 01-1-1V53c0-.6.4-1 1-1zm1 2v10h10V54H19zM1 35h12c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H1a1 1 0 01-1-1V36c0-.6.4-1 1-1zm1 2v10h10V37H2zm34-2h12c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H36a1 1 0 01-1-1V36c0-.6.4-1 1-1zm1 2v10h10V37H37z" />
    ),
    viewBox: '0 0 66 82.5',
  },
  gridFilled: {
    children: (
      <path d="M54 17h12a2 2 0 012 2v12a2 2 0 01-2 2H54a2 2 0 01-2-2V19c0-1.1.9-2 2-2zm-35-1h12a2 2 0 012 2v12a2 2 0 01-2 2H19a2 2 0 01-2-2V18c0-1.1.9-2 2-2zM2 0h12a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2C0 .9.9 0 2 0zm35 0h12a2 2 0 012 2v12a2 2 0 01-2 2H37a2 2 0 01-2-2V2c0-1.1.9-2 2-2zm17 52h12a2 2 0 012 2v12a2 2 0 01-2 2H54a2 2 0 01-2-2V54c0-1.1.9-2 2-2zm-35 0h12a2 2 0 012 2v12a2 2 0 01-2 2H19a2 2 0 01-2-2V54c0-1.1.9-2 2-2zM2 35h12a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V37c0-1.1.9-2 2-2zm35 0h12a2 2 0 012 2v12a2 2 0 01-2 2H37a2 2 0 01-2-2V37c0-1.1.9-2 2-2z" />
    ),
    viewBox: '0 0 68 85',
  },
  overlap: {
    children: (
      <path d="M287.5 1007.5V863.7H0V0h863.7v287.5h287.5v863.8H287.5v-143.8zm743.7-287.9V407.9l-310.8.4c-171 .2-311.1.7-311.5 1.1-.4.4-.8 140.5-1 311.3l-.3 310.6h623.6V719.6zm-743.7-204V287.5h456.2V120.6l-311.2.3-311.2.4-.4 311.2-.3 311.3h166.9V515.5z" />
    ),
    viewBox: '0 0 1151.3 1439.1',
  },

  // https://thenounproject.com/term/timeline/152347/
  timeline: {
    children: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        stroke="none"
        fill="currentColor"
        d="M50.13 89.55V66.86H95v22.69H50.13zM5 10.45h90v22.69H5V10.45zm67.44 50.9H27.56v-22.7h44.88v22.7z"
      />
    ),
    viewBox: '0 0 100 125',
  },

  list: {
    children: (
      <path
        fill="currentColor"
        d="M0 0h20v20H0zM0 40h20v20H0zM0 80h20v20H0zM40 80h60v20H40zM40 40h60v20H40zM40 0h60v20H40z"
      />
    ),
    viewBox: '0 0 100 125',
  },
}

export default ({ glyph }) => {
  const iconProps = icons[glyph]

  if (iconProps) {
    return (
      <svg
        className={`icon icon-${glyph}`}
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...iconProps}
      />
    )
  }

  return null
}
