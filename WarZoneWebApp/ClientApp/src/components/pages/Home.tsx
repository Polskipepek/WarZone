import React, { FunctionComponent, useContext, useState, useEffect } from "react";
import { AppContext, IAppContext } from "../../App";
import NumberInfo from "ant-design-pro/lib/NumberInfo";
import "ant-design-pro/dist/ant-design-pro.css";

import { ChartCard, Field, MiniArea, MiniBar, MiniProgress } from "ant-design-pro/lib/Charts";

import moment from "moment";
import { StatClient, INumberInfo } from "../../ApiClient";
import { openErrorNotification } from "../../helpers/NotificationHelper";
export interface IHomeProps {}

const Home: FunctionComponent<IHomeProps> = (props: IHomeProps) => {
  const { appUser } = useContext<IAppContext>(AppContext);

  const [dailyRevenues, setDailyRevenues] = useState<INumberInfo | null>(null);

  /////////////////////////
  var date = new Date();
  var miniAreaData = [];

  for (let i = 0; i < 20; i += 1) {
    miniAreaData.push({
      x: moment(new Date(date.getDay() + 1000 * 60 * 60 * 24 * i)).format("YYYY-MM-DD"),
      y: Math.floor(Math.random() * 100) + 10,
    });
  }

  ////////////////////

  useEffect(() => {
    GetDailyRevenues();
  }, []);

  const GetDailyRevenues = (day?: Date) => {
    if (day) {
      new StatClient()
        .getDailyIncome(day)
        .then((r: INumberInfo | null) => {
          setDailyRevenues(r);
        })
        .catch(() => openErrorNotification(`Błąd przy GetDailyRevenues(day)`, ``));
    } else {
      new StatClient()
        .getDailyIncome()
        .then((r: INumberInfo | null) => {
          setDailyRevenues(r);
        })
        .catch(() => openErrorNotification(`Błąd przy GetDailyRevenues()`, ``));
    }
  };

  return (
    <>
      {appUser && appUser.id > 1 && `HOME`}
      {appUser && appUser.id === 1 && (
        <>
          {dailyRevenues && (
            <NumberInfo
              subTitle={<span>Dzisiejsze przychody</span>}
              total={dailyRevenues.total}
              subTotal={dailyRevenues.subtotal}
              status={dailyRevenues.total > dailyRevenues.subtotal ? "down" : "up"}
              style={{ width: "80%" }}
            />
          )}
          <MiniArea line height={100} data={miniAreaData} />
        </>
      )}
    </>
  );
};

export default Home;
