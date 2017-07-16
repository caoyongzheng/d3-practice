const d3 = require('d3');
const d3Tip = require('d3-tip')

document.title = '柱状图带提示框'

const sheet = document.createElement('style')
sheet.innerHTML = `
  svg {margin: 100px auto; display: block;}
  .bar {fill: steelblue;}
  .bar:hover {fill: brown;}
  .d3-tip {
    background: rgba(0, 0, 0, 0.7);
    padding: 4px 16px;
    border-radius: 2px;
    pointer-events: none;
    color: #FFFFFF;
  }
  .d3-tip:after {
    box-sizing: border-box;
    display: block;
    font-size: 10px;
    line-height: 10px;
    color: rgba(0, 0, 0, 0.7);
    content: '\\25BC';
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
  }
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

// tootip
/* Initialize tooltip */
tip = d3Tip().attr('class', 'd3-tip').offset([-10, 0]).html(d => d.value);
/* Invoke the tip in the context of your visualization */
g.call(tip)

g.append('g').selectAll('.bar').data(data).enter().append('rect')
.attr('class', 'bar')
.attr('x', d => x(d.key))
.attr('width', x.bandwidth())
.attr('y', d => y(d.value))
.attr('height', d => height - y(d.value))
.on('mouseover', tip.show)
.on('mouseout', tip.hide)
