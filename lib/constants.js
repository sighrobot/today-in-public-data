const COLORS_RAINBOW = [
  '#e6194b',
  '#3cb44b',
  '#ffe119',
  '#4363d8',
  '#f58231',
  '#911eb4',
  '#46f0f0',
  '#f032e6',
  '#bcf60c',
  '#fabebe',
  '#008080',
  '#e6beff',
  '#9a6324',
  '#fffac8',
  '#800000',
  '#aaffc3',
  '#808000',
  '#ffd8b1',
  '#000075',
  '#808080',
  '#ffffff',
  '#000000',
]
// const COLORS = [
//     '#e6194B',
//     '#3cb44b',
//     '#ffe119',
//     '#4363d8',
//     '#f58231',
//     '#42d4f4',
//     '#f032e6',
//     '#fabebe',
//     '#469990',
//     '#e6beff',
//     '#9A6324',
//     '#fffac8',
//     '#800000',
//     '#aaffc3',
//     '#000075',
//     '#a9a9a9',
//     '#ffffff',
//     '#000000'
// ]

const DARK_ON_LIGHT = [2, 6, 8, 9, 11, 13, 15, 17, 20]

export const getHighlightStyle = idx => {
  const style = {
    background: COLORS_RAINBOW[idx % COLORS_RAINBOW.length],
    color: DARK_ON_LIGHT.includes(idx) ? '#16161d' : 'white',
  }

  return style
}
