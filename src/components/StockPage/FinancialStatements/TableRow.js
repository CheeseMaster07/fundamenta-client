import React, { useState } from 'react';

import RowDropdown from './RowDropdown'


export default function TableRow({ metric, metricName, metricValue, toggledID, typeOfRow, collapsible, income_expense, isSubrow, fiscalPeriods, reports, dropdown, setDropdown, extras, setExtras, toggledMetric, setToggledMetric, toggleSubrows, setToggleSubrows }) {

  const [isHovered, setIsHovered] = useState(false);

  const colors = {
    totalRevenue: 'rgb(68, 137, 255)',
    costOfGoodsAndServicesSold: 'rgb(231, 12, 12)',
    grossProfit: 'rgb(77, 208, 225)',
    operatingExpenses: 'rgb(231, 12, 12)',
    operatingIncome: 'rgb(180, 136, 255)',
    nonOperatingIncome: 'rgb(231, 12, 12)',
    pretaxIncome: 'rgb(245, 127, 23)',
    taxes: 'rgb(231, 12, 12)',
    netIncome: 'rgb(251, 193, 45)',

    totalAssets: 'rgb(68, 138, 255)',
    totalLiabilities: 'rgb(77, 208, 225)',
    totalEquity: 'rgb(245, 127, 23)',
  }


  function formatNumber(num, type, income_expense) {
    if (type == 'change' && typeof num == 'number') {
      return `${((num * 100)?.toFixed(2))}%`
    }
    if (type == 'margin' && typeof num == 'number') {
      return `${((num * 100).toFixed(2))}%`
    }

    let result

    if (Math.abs(num) >= 1000000000000) {
      result = (num / 1000000000000).toFixed(1) + 'T'
    } else if (Math.abs(num) >= 1000000000) {
      result = (num / 1000000000).toFixed(1) + 'B';
    } else if (Math.abs(num) >= 1000000) {
      result = (num / 1000000).toFixed(1) + 'M';
    } else if (Math.abs(num) >= 1000) {
      result = (num / 1000).toFixed(1) + 'K';
    } else {
      result = num;
    }

    if (income_expense == 'expense' && metric != 'nonOperatingIncome') {
      result = `-${result}`
    }
    return result
  }

  return (
    <tr className={income_expense}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (!toggledMetric) {
          setToggledMetric(true)
        } else {
          setToggledMetric(false)
        }
      }}>

      <td style={toggledMetric ? { backgroundColor: 'rgba(40, 40, 40)' } : {}} id={typeOfRow != 'real-row' ?
        (toggledMetric ? `${toggledID}` : isHovered ? `${typeOfRow}-hover` : typeOfRow)
        :
        (toggledMetric ? `${toggledID}-${income_expense}` : isHovered ? `${typeOfRow}-${income_expense}-hover` : `${typeOfRow}-${income_expense}`)
      } className='row-name-dropdown'>
        {typeOfRow == 'real-row' ?
          <>
            <div style={income_expense == 'expense' ? { display: 'flex', alignItems: 'center', height: '20px' } : { display: 'flex', alignItems: 'center', height: '30px' }}>
              {toggledMetric ?
                <div style={
                  extras.YoY ? (
                    income_expense == 'expense' ?
                      { height: '69px', position: 'relative', top: '12.5px', backgroundColor: colors[metric] } :
                      { height: '83.5px', position: 'relative', top: '12.5px', backgroundColor: colors[metric] }
                  ) : (
                    income_expense == 'expense' ?
                      { height: '45px', backgroundColor: colors[metric] } :
                      { height: '59px', backgroundColor: colors[metric] }
                  )
                }
                  className='color-bar'
                ></div>
                :
                ''
              }

              {typeOfRow == 'real-row' ?
                <div style={toggledMetric ? { marginLeft: '-8px' } : {}} className="row-dropdown" onClick={(event) => {
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

              {collapsible ?
                <div style={isSubrow ? { marginLeft: '50px' } : {}} className="subrow-button" onClick={(event) => {
                  event.stopPropagation();
                  if (!toggleSubrows) {
                    setToggleSubrows(true)
                  } else {
                    setToggleSubrows(false)
                  }
                }}>{toggleSubrows ? <span style={{ display: 'inline-block', fontWeight: 400, transform: 'rotate(90deg)' }}>&gt;</span> : <span style={{ display: 'inline-block', fontWeight: 400 }}>&gt;</span>}
                </div>
                : <div style={isSubrow ? { marginLeft: '50px' } : {}}></div>}

              {typeOfRow == 'real-row' ? <div style={isSubrow ? { fontSize: '22px' } : {}}>{metricName}</div> : ''}
            </div>

            <div style={{ marginLeft: '2rem' }}>
              {extras.YoY ? <div id={'YoY-row'}><span>&#10149;</span> % Year over Year</div> : ''}
            </div>
          </>

          :
          <>
            <div style={{ display: 'flex', position: 'relative', height: '26px' }}>
              {toggledMetric ?
                <div style={
                  { height: '33px', position: 'relative', overflow: 'auto', bottom: '3px', backgroundColor: colors[metric] }
                }
                  className='color-bar'
                ></div>
                :
                ''
              }
              {typeOfRow == 'margin-row' ? <div style={toggledMetric ? { marginLeft: '24px', display: 'flex' } : { marginLeft: '32px', display: 'flex' }}>

                <span>&#10149;</span> % of Revenue</div> : ''}
            </div>

          </>

        }


      </td>

      {
        typeOfRow === 'real-row' ?
          fiscalPeriods.map((period, index) => {
            const currentReport = reports.find((report) => report.fiscalDateEnding.startsWith(period));
            const previousReport = reports[reports.length - index];
            const currentValue = currentReport[metricValue];
            const previousValue = previousReport ? previousReport[metricValue] : 0;
            let change = (currentValue - previousValue) / previousValue
            if (previousReport == undefined) { change = '' }
            return (
              <td style={toggledMetric ? { backgroundColor: 'rgba(40, 40, 40)' } : {}} key={period} id={typeOfRow != 'real-row' ?
                (toggledMetric ? `${toggledID}` : isHovered ? `${typeOfRow}-hover` : typeOfRow)
                :
                (toggledMetric ? `${toggledID}-${income_expense}` : isHovered ? `${typeOfRow}-${income_expense}-hover` : `${typeOfRow}-${income_expense}`)
              }>
                <div >
                  {formatNumber(reports.find((report) => report.fiscalDateEnding.startsWith(period))[metricValue], 'value', income_expense)}
                </div>
                {
                  extras.YoY ?
                    <div className={change > 0 ? 'positive' : 'negative'} id={'YoY-row'} key={period}>
                      {formatNumber(change, 'change')}
                    </div>


                    :
                    ''
                }
              </td>

            )

          })
          :
          ''
      }

      {
        typeOfRow === 'margin-row' ?

          fiscalPeriods.map((period, index) => {

            const revenue = reports.find((report) => report.fiscalDateEnding.startsWith(period)).totalRevenue;
            const metric = reports.find((report) => report.fiscalDateEnding.startsWith(period))[metricValue];
            let margin = metric / revenue

            return (
              <td className={'margin-color'} id={toggledMetric ? `toggled-margin` : isHovered ? `${typeOfRow}-hover` : typeOfRow} key={period}>
                {formatNumber(margin, 'margin')}
              </td>
            );
          })
          :
          ''
      }

    </tr >
  )
}
// `rgba${colors[metric].substring(3).substring(0, colors[metric].substring(3).length - 1)}, .75)`

{/* <div>
  <div>
    1
  </div>
  <div>
    2
  </div>
</div> */}