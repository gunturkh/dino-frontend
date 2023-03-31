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
        {
          name: 'BackBtn',
          srcs: 'image/backBtn.png'
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
        {
          name: 'LowerBtnSmallBg',
          srcs: 'image/imgLowerMenuBackground.png'
        },
        {
          name: 'LowerBtnBigBg',
          srcs: 'image/imgUpassBackground.png'
        },
        {
          name: 'ImgAlbum',
          srcs: 'image/imgAlbumIcon.png'
        },
        {
          name: 'ImgBulletin',
          srcs: 'image/imgBulletinIcon.png'
        },
        {
          name: 'ImgComrade',
          srcs: 'image/imgComradeIcon.png'
        },
        {
          name: 'ImgDinoCenter',
          srcs: 'image/imgDinoCenterIcon.png'
        },
        {
          name: 'ImgGameTask',
          srcs: 'image/imgGameTaskIcon.png'
        },
        {
          name: 'ImgHistory',
          srcs: 'image/imgHistoryIcon.png'
        },
        {
          name: 'ImgMiniGames',
          srcs: 'image/imgMiniGamesIcon.png'
        },
        {
          name: 'ImgProfile',
          srcs: 'image/imgProfileIcon.png'
        },
        {
          name: 'ImgUpass',
          srcs: 'image/imgUpassIcon.png'
        },
      ]
    },
    {
      name: 'ProfileScene',
      assets: [
        {
          name: 'LogoutBtn',
          srcs: 'image/logoutBtn.png'
        },
        {
          name: 'RenameIcon',
          srcs: 'image/renameIcon.png'
        },
        {
          name: 'SampleLogo',
          srcs: 'logo192.png'
        },
        {
          name: 'ChevronIcon',
          srcs: 'image/chevronRightIcon.png'
        },
        {
          name: 'CopyIcon',
          srcs: 'image/copyIcon.png'
        },
        {
          name: 'SwitchOnIcon',
          srcs: 'image/switchOn.png'
        },
        {
          name: 'SwitchOffIcon',
          srcs: 'image/switcffOn.png'
        },
      ]
    },
  ],
};
