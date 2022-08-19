import React from 'react';
import Chart from '../../chart/Chart';
import FeaturedInfo from '../../featuredInfo/FeaturedInfo';
import "./home.css";
import { userData } from "../../../userData"
import WidgetSm from '../../widgetSm/WidgetSm';
import WidgetLg from '../../widgetLg/WidgetLg';

export default function Home() {
  return (
    <>
      <div className='home'>
        <FeaturedInfo />
        <Chart data={userData} title="Sales Analitics" grid dataKey="pv" />
        <div className='homeWidgets'>
          <WidgetSm />
          <WidgetLg />
        </div>
      </div>
    </>
  );
}
