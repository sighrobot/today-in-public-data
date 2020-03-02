import React from 'react'

import './style.styl'

const arr = []
for (var i = 1; i <= 23; i++) {
  arr.push(i)
}

export const Line = ({ children }) => {
  return (
    <div className="line">
      {children}
      <hr />
    </div>
  )
}

export default ({ numbers = false }) => {
  return (
    <div className="grid">
      {numbers
        ? arr.map((a, idx) => (
            <Line key={`${idx}${a >= 12 ? 'p' : 'a'}`}>
              <span>
                {a === 12 ? a : a % 12}
                {a >= 12 ? 'pm' : 'am'}
              </span>
            </Line>
          ))
        : arr.map((a, idx) => <Line key={`${idx}${a >= 12 ? 'p' : 'a'}`} />)}
    </div>
  )
}
