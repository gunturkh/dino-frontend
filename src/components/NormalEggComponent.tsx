// import { ethers } from 'ethers';
import * as PIXI from "pixi.js";
import {
    Container,
    Sprite,
    Text,
} from "@pixi/react";
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { axiosInstance } from '../utils/api';
import { useAuthStore, useStore } from '../utils/store';
import { ethers } from "ethers";
// import { formatUnits } from "ethers/lib/utils";

// interface Draggable extends PIXI.DisplayObject {
//     data: any;
//     dragging: boolean;
// }
const rewardCards = ['herald', 'elite', 'ancient', 'mythical', 'immortal']
const NormalEggComponent = ({
    key,
    data,
    currentTime,
    eggTexture,
    ref,
    posX,
    posY,
    onPress,
    scaleEgg,
    scaleBtn,
    posBtn,
    text,
    visible,
    onDragStart,
    onDragMove,
    onDragEnd,
    setTicketCnt,
    setGatchaAnimationStatus,
    setGatchaReward
}: any) => {

    // console.log('eggRef', eggRef)
    const token = useAuthStore((state) => state.token);
    // const setGatchaAnimationStatus = useStore((state) => state.setGatchaAnimationStatus);
    const userData = useStore((state) => state.userData);
    console.log('userData', userData)
    const setMyListingEggData = useStore((state) => state.setMyListingEggData);
    // const eggPendingListData = useStore(
    //     (state) => state.eggPendingListData
    // );
    const setEggPendingListData = useStore(
        (state) => state.setEggPendingListData
    );
    const [expiryTime, setExpiryTime] = useState(data?.openat > 0 ? data?.openat : data?.listedat);
    // const [eggText, setEggText] = useState('')
    // useEffect(() => {
    //     setExpiryTime(data?.openat)
    // }, [data?.openat])

    console.log("expiryTime NormalEgg", currentTime, expiryTime, data.id, 'openat ', data?.openat, 'listedat ', data?.listedat);
    // console.log('currentTime', currentTime, 'index: ', index)
    const [countdownTime, setCountdownTime] = useState({
        countdownHours: 0,
        countdownMinutes: 0,
        countdownSeconds: 0,
    });
    useEffect(() => {
        if (data?.openat > 0 && data?.openat > Math.floor(currentTime / 1000)) setExpiryTime(data?.openat)
        if (data?.openat === 0 && expiryTime === 0) {
            getPendingListingEgg()
        }
        // if (data?.openat !== 0 && expiryTime === 0) setExpiryTime(data?.openat)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.openat, currentTime])


    const formatText = ({ expired, posted }: { expired: number, posted: number }) => {
        const haveJPass = Math.floor(currentTime / 1000) <= userData?.ability_end
        console.log('haveJPass', haveJPass)
        console.log('currentTime', currentTime)
        if (haveJPass) {
            if (expired === 0 && data?.openat === 0) {
                return 'Waiting'
            }
            if (expired === 0 && data?.openat !== 0 && Math.floor(currentTime / 1000) >= data?.openat) {
                return "Gatcha"
            }
            else
                return (
                    `${countdownTime.countdownHours.toString().length === 1
                        ? `0${countdownTime.countdownHours}`
                        : countdownTime.countdownHours
                    }:${countdownTime.countdownMinutes.toString().length === 1
                        ? `0${countdownTime.countdownMinutes}`
                        : countdownTime.countdownMinutes
                    }:${countdownTime.countdownSeconds.toString().length === 1
                        ? `0${countdownTime.countdownSeconds}`
                        : countdownTime.countdownSeconds
                    }` || ""
                );
        }
        else {
            if (expired === 0 && posted === 0) return "Pre-List";
            else if (expired === 0 && posted === 1) return "Gatcha";
            else
                return (
                    `${countdownTime.countdownHours.toString().length === 1
                        ? `0${countdownTime.countdownHours}`
                        : countdownTime.countdownHours
                    }:${countdownTime.countdownMinutes.toString().length === 1
                        ? `0${countdownTime.countdownMinutes}`
                        : countdownTime.countdownMinutes
                    }:${countdownTime.countdownSeconds.toString().length === 1
                        ? `0${countdownTime.countdownSeconds}`
                        : countdownTime.countdownSeconds
                    }` || ""
                );
        }
    };
    // console.log('formatText', formatText(), data.id)

    useEffect(() => {
        let timeInterval: any;
        // const countdown = () => {
        if (expiryTime > 0 && currentTime) {
            // timeInterval = setInterval(() => {
            const countdownDateTime = expiryTime * 1000;
            // const currentTime = new Date().getTime();
            const remainingDayTime = countdownDateTime - currentTime;
            // console.log(`countdownDateTime ${index}`, countdownDateTime);
            // console.log(`currentTime ${index}`, currentTime);
            // console.log(`remainingDayTime ${index}`, remainingDayTime);
            const totalHours = Math.floor(
                (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const totalMinutes = Math.floor(
                (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
            );
            const totalSeconds = Math.floor(
                (remainingDayTime % (1000 * 60)) / 1000
            );

            const runningCountdownTime = {
                countdownHours: totalHours,
                countdownMinutes: totalMinutes,
                countdownSeconds: totalSeconds,
            };

            if (remainingDayTime < 0) {
                clearInterval(timeInterval);
                setExpiryTime(0)
                getPendingListingEgg()
                // if (currentTime < data?.openat) {
                //     setExpiryTime(data?.openat)
                // }
                // else setExpiryTime(0);
            } else {
                setCountdownTime(runningCountdownTime);
            }
            // }, 1000);
        }
        // };
        // countdown();
        // return () => {
        //     clearInterval(timeInterval);
        // };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTime]);
    // const onDragStart = (event: any) => {
    //     const sprite = event.currentTarget as Draggable;
    //     sprite.alpha = 0.5;
    //     sprite.data = event.data;
    //     sprite.dragging = true;
    // };

    // const onDragEnd = (event: any) => {
    //     const sprite = event.currentTarget as Draggable;
    //     sprite.alpha = 1;
    //     sprite.dragging = false;
    //     sprite.data = null;
    // };

    // const onDragMove = (event: any) => {
    //     const sprite = event.currentTarget as Draggable;
    //     if (sprite.dragging) {
    //         const newPosition = sprite.data!.getLocalPosition(sprite.parent);
    //         sprite.x = newPosition.x;
    //         sprite.y = newPosition.y;
    //     }
    // };

    const getMyListingEgg = async () => {
        let options = {
            headers: {
                "my-auth-key": token,
            },
        };
        const { data }: any = await axiosInstance({
            url: "/egg/myListing",
            method: "GET",
            headers: options.headers,
        });
        console.log("get MyListing egg Result:", data);
        if (data?.success) {
            // processTransaction(id, ticket);
            // setUnfinishedTransaction(data?.result)
            setMyListingEggData(data?.result);
        } else {
            toast(data.message);
        }
    };

    const getPendingListingEgg = async () => {
        let options = {
            headers: {
                "my-auth-key": token,
            },
        };
        const { data }: any = await axiosInstance({
            url: "/egg/pendingListing",
            method: "GET",
            headers: options.headers,
        });
        console.log("get pendingListing NormalEgg egg Result:", data);
        if (data?.success) {
            setEggPendingListData(data?.result);
        } else {
            toast(data.message);
        }
    };
    return (
        <Container
            key={key}
            ref={ref || null}
            x={posX || 0}
            y={posY || 0}
            visible={visible}
            interactive
            // buttonMode
            pointerdown={onDragStart}
            pointerup={onDragEnd}
            pointerupoutside={onDragEnd}
            pointermove={onDragMove}
        >
            <Sprite
                texture={eggTexture || PIXI.Texture.EMPTY}
                anchor={[0.5, 0.5]}
                scale={scaleEgg ? scaleEgg : [0.9, 0.9]}
            />
            {/* action button */}
            <Container
                position={posBtn ? posBtn : [0, 25]}
                scale={scaleBtn ? scaleBtn : [0.6, 0.7]}
                eventMode="static"
                onpointertap={async () => {
                    if (formatText({ expired: expiryTime, posted: data?.posted }) === "Pre-List") {
                        let options = {
                            headers: {
                                "my-auth-key": token,
                            },
                        };
                        const result = await axiosInstance({
                            url: "/egg/postEgg",
                            method: "POST",
                            headers: options.headers,
                            data: { id: data?.id },
                        });
                        // console.log(result.data);
                        if (result.data.success) {
                            toast("Pre-List Egg Success");
                            // dirty way to force start / show the
                            // countdown after press prelist is to set it to empty array
                            setEggPendingListData([])
                            await getPendingListingEgg();
                            await getMyListingEgg();
                            console.log("prelist egg", data)
                            // setExpiryTime(data?.openat)
                            // window.location.reload()
                            // changeScene('HOME')
                        } else {
                            toast("Error when trying to pre-list egg");
                        }
                    }
                    if (formatText({ expired: expiryTime, posted: data?.posted }) === "Gatcha") {
                        // setGatchaAnimationStatus({ show: true, ticket: data?.ticket })
                        console.log('gatcha', { show: true, ticket: data?.ticket })
                        let options = {
                            headers: {
                                "my-auth-key": token,
                            },
                        };
                        const result = await axiosInstance({
                            url: "/egg/gatcha",
                            method: "POST",
                            headers: options.headers,
                            data: { id: data?.id },
                        });
                        // console.log(result.data);
                        if (result.data.success) {
                            const p = result.data.result;
                            if (p.reward_type === "none") {
                                setGatchaReward('ZONK')
                                setTicketCnt(Number(data?.ticket))
                                setGatchaAnimationStatus(true)
                                toast("Oh no! The Dinosaur broke free!");
                            }
                            else if (rewardCards.includes(p.reward_type)) {
                                setGatchaReward('CARD')
                                setTicketCnt(Number(data?.ticket))
                                setGatchaAnimationStatus(true)
                                toast(
                                    `Horray, you get ${p.reward_name} valued $ ` +
                                    ethers.utils.formatEther(p.reward_value)
                                    // ethers.utils.formatEther(p.reward_value) || 0
                                );
                            }
                            else if (p.reward_type === "money") {
                                setGatchaReward('NORMAL')
                                setTicketCnt(Number(data?.ticket))
                                setGatchaAnimationStatus(true)
                                toast(
                                    `Horray, you get ${p.reward_name} valued $ ` +
                                    ethers.utils.formatEther(p.reward_value)
                                    // ethers.utils.formatEther(p.reward_value) || 0
                                );
                            }
                            else if (p.reward_type === "egg" ) {
                                setGatchaReward('EGG')
                                setTicketCnt(Number(data?.ticket))
                                setGatchaAnimationStatus(true)
                                toast(
                                    `Horray, you get ${p.reward_name} valued ${p.reward_value}`
                                );
                            }
                            else if (p.reward_type === "ticket") {
                                setGatchaReward('TICKET')
                                setTicketCnt(Number(data?.ticket))
                                setGatchaAnimationStatus(true)
                                toast(
                                    `Horray, you get ${p.reward_name} valued ${p.reward_value}`
                                );
                            }
                            else {
                                setGatchaReward('NORMAL')
                                setTicketCnt(Number(data?.ticket))
                                setGatchaAnimationStatus(true)
                                toast(
                                    `Horray, you get ${p.reward_name} valued $ ` +
                                    ethers.utils.formatEther(p.reward_value)
                                    // ethers.utils.formatEther(p.reward_value) || 0
                                );
                            }
                            await getPendingListingEgg();
                            // window.location.reload()
                        } else {
                            toast("Error when trying to open egg");
                        }
                    }
                }}
            >
                <Sprite
                    position={[0, 0]}
                    texture={
                        PIXI.Assets.get(
                            true ? "BtnPurchaseActive" : "BtnPurchaseCountdown"
                        ) || PIXI.Texture.EMPTY
                    }
                    anchor={[0.5, 0.5]}

                />
                <Text
                    text={formatText({ expired: expiryTime, posted: data?.posted })}
                    position={[0, 0]}
                    anchor={[0.5, 0.5]}
                    style={
                        new PIXI.TextStyle({
                            fontFamily: "Magra Bold",
                            fontSize: 13,
                            fontWeight: "600",
                            strokeThickness: 1,
                            fill: ["white"],
                        })
                    }
                />
            </Container>
        </Container>
    );
};

export default (NormalEggComponent)