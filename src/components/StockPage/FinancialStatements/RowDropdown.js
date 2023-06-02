import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getFinancialStatementsExtras } from '../../../actions/financialStatementsExtras'


export default function RowDropdown({ metric, extras, setExtras }) {
  const dispatch = useDispatch()
  const name = `${metric}Extras`
  useEffect(() => {
    dispatch(getFinancialStatementsExtras({ [name]: extras }))
  }, [extras])

  return (
    <div className="row-dropdown-menu">

      <div id={extras.YoY ? 'toggled-YoY' : ''} className="row-dropdown-row" onClick={(event) => {
        event.stopPropagation();
        if (!extras.YoY) {
          setExtras({ YoY: true, margin: extras.margin })
        } else {
          setExtras({ YoY: false, margin: extras.margin })
        }
      }}>% Year over Year</div>

      {metric != 'totalRevenue' ?
        <div id={extras.margin ? 'toggled-margin' : ''} className="row-dropdown-row" onClick={(event) => {
          event.stopPropagation();
          if (!extras.margin) {
            setExtras({ YoY: extras.YoY, margin: true })
          } else {
            setExtras({ YoY: extras.YoY, margin: false })
          }
        }}>% of Revenue</div>
        : ''}
    </div>


  )
}
