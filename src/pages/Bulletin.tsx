import { useEffect, useState, useCallback } from "react";
import { axiosInstance } from "../utils/api";
// import { formatUnits } from "@ethersproject/units";
import { useAuthStore, useStore } from "../utils/store";

export function Bulletin() {
  const token = useAuthStore((state) => state.token);
  // const userData = useStore((state) => state.userData);
  const changeScene = useStore((state) => state.changeScene);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [datas, setDatas] = useState<any>();

  // TODO: need to integrate with API, right now still using downline API

  const ShowData = (props: any) => {
    const { data } = props;
    // const [downline, setDownline] = useState<any>();

    // TODO: need to change this static date
    var date = new Date(1683692254 * 1000);

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
        {/* <td>$ {parseFloat(formatUnits(data.bought)).toFixed(2)}</td> */}
        <td><div><h1 className="text-[#FFC700]">{data?.title}</h1><div dangerouslySetInnerHTML={{ __html: data?.content }}></div></div></td>
      </tr>
    );
  };

  const Bulletin = () => {
    const loadBulletin = async () => {
      let options = {
        headers: {
          "my-auth-key": token,
        },
      };
      const response = await axiosInstance({
        url: "/news/latest",
        method: "GET",
        headers: options.headers,
      });

      console.log("news response", response);

      // comment this to check if there's no data
      // setDatas([]);
      setDatas(response.data.result);
    };

    useEffect(() => {
      if (!datas) loadBulletin();
    }, []);

    return (
      <>
        <table className="w-full text-base text-left text-white dark:text-gray-400">
          <thead className="text-xs text-white uppercase border-y ">
            <tr>
              <th className="w-[5rem] py-3">Date</th>
              {/* <th className="w-[7rem] py-3">Amt</th> */}
              <th className="w-[8rem] py-3">Description</th>
            </tr>
          </thead>
          <tbody>
            {datas?.length > 0
              ? datas?.map((elm: any, idx: number) => (
                <ShowData key={elm.idx} data={elm} />
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
    const loadBulletinWithPage = async (props: any) => {
      // let options = {
      //   headers: {
      //     "my-auth-key": token,
      //   },
      // };
      // const response = await axiosInstance({
      //   url: "/user/downline",
      //   params: {
      //     page: props,
      //   },
      //   method: "GET",
      //   headers: options.headers,
      // });
      // console.log("page response", response);
      // console.log("page props", props.current);
      // setDatas(response.data.result);
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
          onClick={() => loadBulletinWithPage(i)}
        >
          {i}
        </li>
      );
    }

    return <ul className="flex flex-row space-x-2">{pctn}</ul>;
  };

  const BulletinCallback = useCallback(Bulletin, [datas, token]);
  console.log('datas', datas)

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
            Bulletin
          </div>
          <div className="w-10 h-10"></div>
        </div>
        <div className="flex flex-col h-full w-full px-4 pt-6 pb-6 bg-gray-800/30 backdrop-blur-sm overflow-y-visible overflow-auto">
          <div className="bg-transparent">
            <BulletinCallback />
          </div>
          {!(datas?.length > 0) && (
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
            <Paginate total={datas?.totalpage} current={datas?.pagenow} />
          </div>
        </div>
      </div>
    </div>
  );
}
