const d3 = require('d3')

document.title = '柱状图'

const sheet = document.createElement('style')
sheet.innerHTML = `
  .bar {fill: steelblue;}
  .bar:hover {fill: brown;}
`
document.body.appendChild(sheet)

const svgWidth = 600
const svgHeight = 400

const svg = d3.select('body').append('svg')
svg.attr('width', svgWidth).attr('height', svgHeight)
const margin = {top: 20, right: 20, bottom: 20, left: 20}

const width = svg.attr('width') - margin.left - margin.right
const height = svg.attr('height') - margin.top - margin.bottom
const g = svg.append('g')
.attr('transform', `translate(${margin.left},${margin.top})`)

const data = [
  { key: 1, value: 5 },
  { key: 2, value: 4 },
  { key: 3, value: 7 },
  { key: 4, value: 2 },
  { key: 5, value: 4 },
  { key: 6, value: 8 },
  { key: 7, value: 3 },
  { key: 8, value: 6 }
]

// 定义x, y 轴
const x = d3.scaleBand()
.range([0, width]).domain(data.map(o => o.key))
.padding(0.1)
const y = d3.scaleLinear().domain([0, 8]).range([height, 0])

// 渲染x轴
g.append('g')
.attr('transform', `translate(0, ${height})`)
.call(d3.axisBottom(x));

// 渲染y轴
g.append('g').attr('transform', `translate(0, 0)`)
.call(d3.axisLeft(y));

g.append('g').selectAll('.bar').data(data).enter().append('rect')
.attr('class', 'bar')
.attr('x', d => x(d.key))
.attr('width', x.bandwidth())
.attr('y', d => y(d.value))
.attr('height', d => height - y(d.value));
