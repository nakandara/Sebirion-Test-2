import React, { useEffect, useRef, useState } from 'react';
import "./widgetLg.css";
import useAxiosPrivate from '../../Application/fndbas/hooks/useAxiosPrivate';

const API_URL = "v1/Quotation/";

export default function WidgetLg() {
  const axiosPrivate = useAxiosPrivate();
  const Button = ({ type }) => {
    return <button className={'widgetLgButton ' + type}>{type}</button>
  }

  const [quotations, setQuotations] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    const controller = new AbortController();

    const getQuotations = async () => {
      try {
        const response = await axiosPrivate.get(API_URL + "get_all",
          {
            headers: {
              signal: controller.signal
            }
          }
        );

        setQuotations(response.data);
      } catch (err) {
        console.error(err);
      }

    }
    isMounted.current && getQuotations();
    return () => {
      isMounted.current = false;
      controller.abort();
    }
  }, [isMounted,axiosPrivate])

  return (
    <div className='widgetLg'>
      <h3 className="widgetLgTitle">Latest Price Summeries</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">ID - Description</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <span className="widgetLgName">0718965702 - Ones Zeros</span>
            </td>
            <td className="widgetLgDate">2022-01-01</td>
            <td className="widgetLgAmount">$ 250</td>
            <td className="widgetLgStatus"><Button type="Approved" /></td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <span className="widgetLgName">0718965702 - Ones Zeros</span>
            </td>
            <td className="widgetLgDate">2022-01-01</td>
            <td className="widgetLgAmount">$ 250</td>
            <td className="widgetLgStatus"><Button type="Approved" /></td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <span className="widgetLgName">0718965702 - Ones Zeros</span>
            </td>
            <td className="widgetLgDate">2022-01-01</td>
            <td className="widgetLgAmount">$ 250</td>
            <td className="widgetLgStatus"><Button type="Approved" /></td>
          </tr>
          {/* <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <span className="widgetLgName"><Link to={`/quotation/${quotations[0].id}`}>{quotations[0].quotationId + " - " + quotations[0].description}</Link></span>
            </td>
            <td className="widgetLgDate">{moment(quotations[0].dateCreated).format("MM/DD/YYYY HH:mm")}</td>
            <td className="widgetLgAmount">$ {quotations[0].quotationItems[0].totalCost}</td>
            <td className="widgetLgStatus"><Button type="Approved" /></td>
          </tr>

          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <span className="widgetLgName">{quotations[1].quotationId + " - " + quotations[1].description}</span>
            </td>
            <td className="widgetLgDate">{moment(quotations[0].dateCreated).format("MM/DD/YYYY HH:mm")}</td>
            <td className="widgetLgAmount">$ {quotations[1].quotationItems[0].totalCost}</td>
            <td className="widgetLgStatus"><Button type="Approved" /></td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <span className="widgetLgName">{quotations[2].quotationId + " - " + quotations[2].description}</span>
            </td>
            <td className="widgetLgDate">{moment(quotations[2].dateCreated).format("MM/DD/YYYY HH:mm")}</td>
            <td className="widgetLgAmount">$ {quotations[2].quotationItems[0].totalCost}</td>
            <td className="widgetLgStatus"><Button type="Approved" /></td>
          </tr> */}
        </tbody>
      </table>
    </div>
  )
}
