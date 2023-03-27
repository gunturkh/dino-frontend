import type { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
  bundles: [
    {
      name: "Misc",
      assets: [
        {
          name: "MagraBold",
          srcs: "misc/Magra-Bold.ttf",
        },
        {
          name: "MagraRegular",
          srcs: "misc/Magra-Regular.ttf",
        },
      ],
    },
    {
      name: "LoaderScene",
      assets: [
        {
          name: "LoaderBarBg",
          srcs: "image/LoadingBar.png",
        },
      ],
    },
    {
      name: "RegisterScene",
      assets: [
        {
          name: "RegisterBg",
          srcs: "image/Background.png",
        },
        {
          name: 'FormBg',
          srcs: 'image/formBackground.png'
        },
        {
          name: 'InputBg',
          srcs: 'image/InputBox.png'
        },
        {
          name: "BtnAudio",
          srcs: "image/BtnAudio.png",
        },
        {
          name: "BtnLanguage",
          srcs: "image/BtnLanguage.png",
        },
        {
          name: "BtnLogin",
          srcs: "image/BtnLogin.png",
        },
        {
          name: "BtnRegister",
          srcs: "image/BtnRegister.png",
        },
        {
          name: "BtnSupport",
          srcs: "image/BtnSupport.png",
        },

      ],
    },
    {
      name: "MainScene",
      assets: [
        {
          name: "MainBg",
          srcs: "image/mainPageBg.png",
        },
        {
          name: "ProfileBg",
          srcs: "image/profileBg.png",
        },
        {
          name: 'ProfileAvatarDefault',
          srcs: 'image/iconProfile.png'
        },
        {
          name: "DinoFundBg",
          srcs: "image/dinoFund.png",
        },
        {
          name: 'BtnLngHome',
          srcs: 'image/BtnLanguageHome.png'
        },
        {
          name: 'BtnShareHome',
          srcs: 'image/BtnShare.png'
        },
        {
          name: 'BtnAudioHomeOn',
          srcs: 'image/BtnAudioHomeOn.png'
        },
        {
          name: 'BtnAudioHomeMute',
          srcs: 'image/BtnAudioHomeMute.png'
        },
        {
          name: 'DiamondDetails',
          srcs: 'image/diamondDetails.png'
        },
        {
          name: 'StarDetails',
          srcs: 'image/starDetails.png'
        },
        {
          name: 'BNBDetails',
          srcs: 'image/bnbDetails.png'
        },
        {
          name: 'InGameTokenDetails',
          srcs: 'image/ingametokenDetails.png'
        },
        {
          name: 'HuntingBonusDetails',
          srcs: 'image/huntingBonusdetails.png'
        },
      ]
    },
  ],
};
