import React from 'react'

import RowDropdown from './RowDropdown'


export default function TableRow({ metric, metricName, metricValue, toggledID, typeOfRow, fiscalPeriods, reports, dropdown, setDropdown, extras, setExtras, toggledMetric, setToggledMetric }) {
  function formatNumber(num) {
    if (typeof num === 'number') {
      num = num.toString()
    }
    if (Math.abs(num) >= 1000000000000) {
      return (num / 1000000000000).toFixed(1) + 'T'
    } else if (Math.abs(num) >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (Math.abs(num) >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (Math.abs(num) >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num;
    }
  }
  return (
    <tr id={toggledMetric ? `${toggledID}` : ''} onClick={() => {
      if (!toggledMetric) {
        setToggledMetric(true)
      } else {
        setToggledMetric(false)
      }
    }}>
      <td id={typeOfRow} className='row-name-dropdown'>
        {typeOfRow == 'real-row' ? <div className="row-dropdown" onClick={(event) => {
          event.stopPropagation();
          if (!dropdown) {
            setDropdown(true)
          } else {
            setDropdown(false)
          }
        }}>{dropdown ? <>&#8722;</> : <>&#43;</>}
          {dropdown ?
            <RowDropdown metric={metric} extras={extras} setExtras={setExtras} />
            :
            ''}
        </div>
          : ''}
        {typeOfRow == 'real-row' ? <div>{metricName}</div> : ''}
        {typeOfRow == 'YoY-row' ? <div>Year over Year</div> : ''}

      </td>
      {
        fiscalPeriods.map((year) => (
          <td id={typeOfRow} key={year}>
            {formatNumber(reports.find((report) => report.fiscalDateEnding.startsWith(year))[metricValue])}
          </td>
        ))
      }
    </tr>
  )
}
