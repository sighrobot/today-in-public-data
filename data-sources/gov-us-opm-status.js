const moment = require('moment')

module.exports = {
  gov_us_opm_status: {
    name: 'USOPM Current Status',
    description:
      'The operating status API provides real time data on the Federal Government operating status for the DC area.',
    web: 'https://www.opm.gov/developer/documentation/current-status-api/',
    baseUrl: 'https://www.opm.gov/json/operatingstatus.json',
    dateFields: [
      {
        name: 'date',
        value: d => moment(d).format('MM/DD/YYYY'),
      },
    ],
    get: {
      collection: data => [data],
      title: item => item.StatusSummary,
      url: item => item.Url,
      time: item => {
        const currentDate = parseInt(
          item.CurrentDate.split('(')[1].split(')')[0],
          10
        )
        const dateStatusPosted = parseInt(
          item.DateStatusPosted.split('(')[1].split(')')[0],
          10
        )

        if (moment(currentDate).isSame(dateStatusPosted, 'day')) {
          return currentDate
        }

        return dateStatusPosted
      },
      count: () => 1,
      data: () => ({}),
      body: item => item.LongStatusMessage,
    },
  },
}
