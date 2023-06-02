import { useEffect, useState, useCallback } from "react";
import { axiosInstance } from "../utils/api";
import { formatUnits } from "@ethersproject/units";
import { useAuthStore, useStore } from "../utils/store";
import ReactPaginate from "react-paginate";

export function Buddies() {
  const token = useAuthStore((state) => state.token);
  const userData = useStore((state) => state.userData);
  const changeScene = useStore((state) => state.changeScene);

  const [datas, setDatas] = useState<any>();

  const ShowUsers = (props: any) => {
    const { data } = props;
    // const [downline, setDownline] = useState<any>();

    return (
      <tr className="table-row">
        <td>{data.username}</td>
        <td>{data.sponsor}</td>
        <td className="text-center">{data.level}</td>
        <td>$ {parseFloat(formatUnits(data.bought)).toFixed(0)}</td>
      </tr>
    );
  };

  const Downline = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [searchParams] = useSearchParams();

    const loadDownline = async () => {
      let options = {
        headers: {
          "my-auth-key": token,
        },
      };
      const response = await axiosInstance({
        url: "/user/downline",
        method: "GET",
        headers: options.headers,
      });
      setDatas(response.data.result);
    };

    useEffect(() => {
      if (!datas) loadDownline();
      // if (buddiesHistories.length === 0) loadDownline();
    }, []);

    return (
      <>
        <h1 className="font-Magra text-yellow-700 text-center text-xl">
          {`${userData.username} Buddy`}
          {/* {buddiesHistories.length > 0 ? buddiesHistories[buddiesHistories.length - 1]?.username : `${userData.username}'s buddy`} */}
        </h1>
        {datas ? (
          <>
            <table className="w-full text-base text-left text-white dark:text-gray-400">
              <thead className="text-xs text-white uppercase border-y ">
                <tr>
                  <th scope="col" className="py-3">
                    Username
                  </th>
                  <th scope="col" className="py-3">
                    Referral
                  </th>
                  <th scope="col" className="py-3">
                    Level
                  </th>
                  <th scope="col" className="py-3">
                    Sales
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas?.data?.length > 0
                  ? datas?.data?.map((elm: any) => (
                    <ShowUsers key={elm.username} data={elm} />
                  ))
                  : null}
              </tbody>
            </table>
            <div className="flex flex-col justify-end h-auto pt-3">
              {/* <Paginate total={datas?.totalpage} current={datas?.pagenow} /> */}

            </div>
          </>
        ) : (
          ""
        )}
      </>
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const paginate = ({ selected }: { selected: number }) => {
    const loadDownlineWithPage = async (props: any) => {
      let options = {
        headers: {
          "my-auth-key": token,
        },
      };
      const response = await axiosInstance({
        url: "/user/downline",
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
    loadDownlineWithPage(selected + 1)
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const Paginate = (props: any) => {
  //   var pctn = [];
  //   const loadDownlineWithPage = async (props: any) => {
  //     let options = {
  //       headers: {
  //         "my-auth-key": token,
  //       },
  //     };
  //     const response = await axiosInstance({
  //       url: "/user/downline",
  //       params: {
  //         page: props,
  //       },
  //       method: "GET",
  //       headers: options.headers,
  //     });

  //     console.log("page response", response);
  //     console.log("page props", props.current);
  //     setDatas(response.data.result);
  //   };

  //   for (let i = 1; i <= props.total; i++) {
  //     let classs = "";
  //     if (parseInt(props.current) === i) classs = "active";
  //     pctn.push(
  //       <li
  //         key={i}
  //         className={`font-Magra font-bold px-2 border border-gray-400 rounded-md cursor-pointer ${classs === "active"
  //           ? "bg-yellow-700 text-white"
  //           : "bg-white text-black"
  //           }`}
  //         onClick={() => loadDownlineWithPage(i)}
  //       >
  //         {i}
  //       </li>
  //     );
  //   }

  //   return <ul className="flex flex-row space-x-2">{pctn}</ul>;
  // };

  const DownlineCallback = useCallback(Downline, [datas, token, userData.username]);

  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      <img
        src="image/profileBackground.png"
        className="absolute w-full h-full object-cover "
        alt="background"
      />
      <div className="flex z-20 h-[100vh] w-[450px] max-[450px]:w-[calc(100vw)] max-w-[450px] justify-center items-center flex-col sm:px-4 shadow-sm rounded-sm ">
        <div className="flex flex-row w-full justify-between mt-4 mb-1">
          <img
            src="image/backBtn.png"
            width={40}
            height={40}
            alt="Back"
            onClick={() => changeScene("HOME")}
          />
          <div className="flex flex-col items-center justify-center text-[1.5rem] text-white font-bold font-magra ">
            Buddies
          </div>
          <div className="w-10 h-10"></div>
          {/* <img
            src="image/logoutBtn.png"
            width={40}
            height={40}
            className="w-10"
            alt="Back"
            // onClick={() => changeScene("HOME")}
          /> */}
        </div>
        <div className="flex flex-col h-full w-full px-4 pt-6 pb-6 bg-gray-800/30 backdrop-blur-sm overflow-y-visible overflow-auto">
          <div className="bg-transparent h-full">
            <DownlineCallback />
          </div>
          <ReactPaginate
            onPageChange={paginate}
            pageCount={datas?.totalpage > 0 ? datas?.totalpage : 1}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            previousLabel={"<<"}
            nextLabel={">>"}
            containerClassName={
              "flex flex-row text-black items-center text-2xl justify-center"
            }
            breakClassName={"font-Magra font-bold px-2 border border-gray-400 rounded-md cursor-pointer bg-white"}
            pageLinkClassName={"font-Magra font-bold px-2 border border-gray-400 rounded-md cursor-pointer bg-white"}
            previousLinkClassName={`font-Magra font-bold px-2 border border-gray-400 rounded-md cursor-pointer bg-white`}
            nextLinkClassName={`font-Magra font-bold px-2 border border-gray-400 rounded-md cursor-pointer bg-white`}
            activeLinkClassName={"font-Magra font-bold px-2 border border-gray-400 rounded-md cursor-pointer bg-white text-[#FFC700]"}
          />
        </div>
      </div>
    </div>
  );
}
