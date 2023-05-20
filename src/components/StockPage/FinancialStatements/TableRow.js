import React from 'react'

import RowDropdown from './RowDropdown'


export default function TableRow({ metric, metricValue, toggledID, fiscalPeriods, reports, dropdown, setDropdown, extras, setExtras, toggledMetric, setToggledMetric }) {
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
      <td className='row-name-dropdown'>
        <div className="row-dropdown" onClick={(event) => {
          event.stopPropagation();
          if (!dropdown) {
            console.log(dropdown, 'To True')
            setDropdown(true)
          } else {
            console.log(dropdown, 'To false')
            setDropdown(false)
          }
        }}>{dropdown ? <>&#8722;</> : <>&#43;</>}
          {dropdown ?
            <RowDropdown extras={extras} setExtras={setExtras} />
            :
            ''}
        </div>
        <div>{metric}</div>
      </td>
      {
        fiscalPeriods.map((year) => (
          <td key={year}>
            {formatNumber(reports.find((report) => report.fiscalDateEnding.startsWith(year))[metricValue])}
          </td>
        ))
      }
    </tr>
  )
}
