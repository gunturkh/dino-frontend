import { useEffect, useState, useCallback } from "react";
import { axiosInstance } from "../utils/api";
import { formatUnits } from "@ethersproject/units";
import { useAuthStore, useStore } from "../utils/store";
import { shortenString } from "../utils/functions";

type Page = "Transactions" | "Rewards";

export function History() {
  const token = useAuthStore((state) => state.token);
  const changeScene = useStore((state) => state.changeScene);

  const [datas, setDatas] = useState<any>();

  const [rewardDatas, setRewardDatas] = useState<any>();

  const [selectedPage, setSelectedPage] = useState<Page>("Transactions");

  const ShowData = (props: any) => {
    const { data } = props;
    var date = new Date(data.created * 1000);

    // Will display time in 10:30:23 format
    var formattedTime =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    return (
      <tr className="table-row">
        <td>{formattedTime}</td>
        <td className="text-green-400 p-2">{shortenString(data?.txhash)}</td>
        <td>$ {parseFloat(formatUnits(data.total)).toFixed(2)}</td>
        <td className={`${data.type === 'BUY' ? 'text-green-400' : 'text-red-500'} text-right`}>{data.type}</td>
      </tr>
    );
  };
  const ShowRewardsData = (props: any) => {
    const { data } = props;
    var date = new Date(data.created * 1000);

    // Will display time in 10:30:23 format
    var formattedTime =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    return (
      <tr className="table-row">
        <td>{formattedTime}</td>
        <td className="text-green-400 p-2">{shortenString(data?.address)}</td>
        <td className="text-right">$ {parseFloat(formatUnits(data.total)).toFixed(2)}</td>
      </tr>
    );
  };

  const History = () => {
    const loadHistory = async () => {
      let options = {
        headers: {
          "my-auth-key": token,
        },
      };
      const response = await axiosInstance({
        url: "/report/egg",
        method: "GET",
        headers: options.headers,
      });

      console.log("response", response);
      setDatas(response.data.result);
    };

    useEffect(() => {
      if (!datas) loadHistory();
    }, []);

    return (
      <>
        <table className="w-full text-base text-left text-white dark:text-gray-400">
          <thead className="text-xs text-white uppercase border-y ">
            <tr>
              <th className="w-[5rem] py-3">Date</th>
              <th className="w-[5rem] py-3 px-2">TxHash</th>
              <th className="w-[7rem] py-3">Amt</th>
              <th className="w-[8rem] py-3 text-right">Description</th>
            </tr>
          </thead>
          <tbody>
            {datas?.data?.length > 0
              ? datas?.data?.map((elm: any, idx: number) => (
                <ShowData key={idx} data={elm} />
              ))
              : null}
          </tbody>
        </table>
      </>
    );
  };

  const EggRewards = () => {
    const loadEggRewards = async () => {
      let options = {
        headers: {
          "my-auth-key": token,
        },
      };
      const response = await axiosInstance({
        url: "/report/reward",
        method: "GET",
        headers: options.headers,
      });

      console.log("response", response);
      setRewardDatas(response.data.result);
    };

    useEffect(() => {
      if (!rewardDatas) loadEggRewards();
    }, []);

    return (
      <>
        <table className="w-full text-base text-left text-white dark:text-gray-400">
          <thead className="text-xs text-white uppercase border-y ">
            <tr>
              <th className="w-[20rem] py-3">Date</th>
              <th className="w-[20rem] py-3 px-2">Address</th>
              <th className="w-[10rem] py-3 text-right">Amt</th>
            </tr>
          </thead>
          <tbody>
            {rewardDatas?.data?.length > 0
              ? rewardDatas?.data?.map((elm: any, idx: number) => (
                <ShowRewardsData key={idx} data={elm} />
              ))
              : null}
          </tbody>
        </table>
      </>
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Paginate = (props: any) => {
    var pctn = [];
    const loadDownlineWithPage = async (props: any) => {
      let options = {
        headers: {
          "my-auth-key": token,
        },
      };
      const response = await axiosInstance({
        url: "/report/egg",
        params: {
          page: props,
        },
        method: "GET",
        headers: options.headers,
      });
      console.log("page response", response);
      console.log("page props", props.current);
      setDatas(response.data.result);
    };

    for (let i = 1; i <= props.total; i++) {
      let classs = "";
      if (parseInt(props.current) === i) classs = "active";
      pctn.push(
        <li
          key={i}
          className={`font-Magra font-bold px-2 border border-gray-400 rounded-md cursor-pointer ${classs === "active"
            ? "bg-yellow-700 text-white"
            : "bg-white text-black"
            }`}
          onClick={() => loadDownlineWithPage(i)}
        >
          {i}
        </li>
      );
    }

    return <ul className="flex flex-row space-x-2">{pctn}</ul>;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const PaginateRewards = (props: any) => {
    var pctn = [];
    const loadDownlineWithPage = async (props: any) => {
      let options = {
        headers: {
          "my-auth-key": token,
        },
      };
      const response = await axiosInstance({
        url: "/report/egg",
        params: {
          page: props,
        },
        method: "GET",
        headers: options.headers,
      });
      console.log("page response", response);
      console.log("page props", props.current);
      setRewardDatas(response.data.result);
    };

    for (let i = 1; i <= props.total; i++) {
      let classs = "";
      if (parseInt(props.current) === i) classs = "active";
      pctn.push(
        <li
          key={i}
          className={`font-Magra font-bold px-2 border border-gray-400 rounded-md cursor-pointer ${classs === "active"
            ? "bg-yellow-700 text-white"
            : "bg-white text-black"
            }`}
          onClick={() => loadDownlineWithPage(i)}
        >
          {i}
        </li>
      );
    }

    return <ul className="flex flex-row space-x-2">{pctn}</ul>;
  };

  const HistoryCallback = useCallback(History, [datas, token]);
  const EggRewardCallback = useCallback(EggRewards, [rewardDatas, token]);

  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      <img
        src="image/profileBackground.png"
        className="absolute w-full h-full object-cover "
        alt="background"
      />
      <div className="flex z-20 h-[98vh] w-[450px] max-[450px]:w-[calc(100vw)] max-w-[450px] justify-center items-center flex-col sm:px-4 shadow-sm rounded-sm ">
        <div className="flex flex-row w-full justify-between mt-4 mb-1">
          <img
            src="image/backBtn.png"
            width={40}
            height={40}
            alt="Back"
            onClick={() => changeScene("HOME")}
          />
          <div className="flex flex-col items-center justify-center text-[1.5rem] text-white font-bold font-magra ">
            History
          </div>
          <div className="w-10 h-10"></div>
        </div>
        <div className="flex flex-col h-full w-full px-4 pt-6 pb-6 bg-gray-800/30 backdrop-blur-sm overflow-y-visible overflow-auto">
          <div className="flex w-full flex-row items-center">
            <button
              type="button"
              onClick={() => setSelectedPage("Transactions")}
              className={`${selectedPage === "Transactions" ? "text-blue-500" : "text-white"
                } font-bold font-Magra px-3.5 py-2.5 text-xl focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
            >
              Transactions
            </button>
            <button
              type="button"
              onClick={() => setSelectedPage("Rewards")}
              className={`${selectedPage === "Rewards" ? "text-blue-500" : "text-white"
                } font-bold font-Magra px-3.5 py-2.5 text-xl focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
            >
              Rewards
            </button>
          </div>
          <div className="bg-transparent">
            {selectedPage === "Transactions" && <HistoryCallback />}
            {selectedPage === "Rewards" && <EggRewardCallback />}
          </div>
          {!(datas?.data?.length > 0) && (
            <div className="flex w-full h-full flex-col justify-center items-center">
              {/* show no data display */}
              <div className="flex flex-row justify-center items-center">
                <div className=" text-white font-bold font-magra text-lg">
                  No Data
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="flex flex-col justify-end h-auto pt-3">
            {selectedPage === "Transactions" && (
              <Paginate total={datas?.totalpage} current={datas?.pagenow} />
            )}
            {selectedPage === "Rewards" && (
              <PaginateRewards
                total={rewardDatas?.totalpage}
                current={rewardDatas?.pagenow}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
