import type { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
  bundles: [
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
      ]
    },
  ],
};
