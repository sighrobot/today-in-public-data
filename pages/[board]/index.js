import { useRouter } from 'next/router'

import Header from '../../components/footer'
import useData from '../../lib/hooks/useData'
import sources from '../../lib/sources'

export default () => {
  const router = useRouter()
  const { data } = useData({
    // date: '2021-12-04',
    sources: [
      'nyc_311_dob',
      'nyc_311_tlc',
      'nyc_311_nypd',
      'nyc_311_dohmh',
      'nyc_311_hpd',
    ],
    board: router.query.board,
  })
  console.log(router.query.board, data)

  const keys = Object.keys(data).filter(s => data[s].data.length > 0)

  return (
    <div>
      <Header />

      {keys.map(s => {
        const source = data[s]
        return (
          <section key={s}>
            <h3>{sources[s].name}</h3>
            {source.data.map((d, idx) => {
              return <article key={idx}>{d.title}</article>
            })}
          </section>
        )
      })}
    </div>
  )
}
