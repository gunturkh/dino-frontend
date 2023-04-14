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
          name: 'BNBDetails',
          srcs: 'image/bnbDetails.png'
        },
        {
          name: 'DinoEggDetails',
          srcs: 'image/PnlDinoEgg.png'
        },
        // {
        //   name: 'StarDetails',
        //   srcs: 'image/PnlBonus.png'
        // },
        // {
        //   name: 'DinoTicketDetails',
        //   srcs: 'image/PnlDinoTicket.png'
        // },
        // {
        //   name: 'EventFragmentDetails',
        //   srcs: 'image/PnlEventFragment.png'
        // },
        {
          name: 'BNBIcon',
          srcs: 'image/imgBnBIcon.png'
        },
        {
          name: 'DinoEggIcon',
          srcs: 'image/imgDinoEggIcon.png'
        },
        {
          name: 'BonusIcon',
          srcs: 'image/imgBonusIcon.png'
        },
        {
          name: 'DinoTicketIcon',
          srcs: 'image/imgDinoTicketIcon.png'
        },
        {
          name: 'EventFragmentIcon',
          srcs: 'image/imgEventFragmentIcon.png'
        },
        {
          name: 'USDTIcon',
          srcs: 'image/imgUSDTIcon.png'
        },
        {
          name: 'ImgDetailsBg',
          srcs: 'image/imgDetailsBg.png'
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
        {
          name: 'EggPlate',
          srcs: 'image/eggPlate.png'
        }
      ]
    },
    {
      name: 'ProfileScene',
      assets: [
        {
          name: 'ProfileBackground',
          srcs: 'image/profileBackground.png'
        },
        {
          name: 'UpperDivider',
          srcs: 'image/imgDivider.png'
        },
        {
          name: 'LogoutBtn',
          srcs: 'image/logoutBtn.png'
        },
        {
          name: 'RenameIcon',
          srcs: 'image/renameIcon.png'
        },
        {
          name: 'MenuLeftIcon',
          srcs: 'image/menuLeftIcon.png'
        },
        {
          name: 'ArrowRightIcon',
          srcs: 'image/arrowRightIcon.png'
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
          srcs: 'image/switchOff.png'
        },
        {
          name: 'TwitterIcon',
          srcs: 'image/twitterIcon.png'
        },
        {
          name: 'TiktokIcon',
          srcs: 'image/tiktokIcon.png'
        },
        {
          name: 'TelegramIcon',
          srcs: 'image/telegramIcon.png'
        },
      ]
    },
    {
      name: 'CollectionScene',
      assets: [
        // Herald Tier
        {
          name: 'AlangasaurusLocked',
          srcs: 'image/cards/locked/alangasaurus.png'
        },
        {
          name: 'AlanqaLocked',
          srcs: 'image/cards/locked/alanqa.png'
        },
        {
          name: 'ArgentinosaurusLocked',
          srcs: 'image/cards/locked/argentinosaurus.png'
        },
        {
          name: 'BonitasauraLocked',
          srcs: 'image/cards/locked/Bonitasaura.png'
        },
        {
          name: 'ColoborhynchusLocked',
          srcs: 'image/cards/locked/coloborhynchus.png'
        },
        {
          name: 'DiplocaulusLocked',
          srcs: 'image/cards/locked/diplocaulus.png'
        },
        {
          name: 'GuanlongLocked',
          srcs: 'image/cards/locked/guanlong.png'
        },
        {
          name: 'HatzegopteryxLocked',
          srcs: 'image/cards/locked/hatzegopteryx.png'
        },
        {
          name: 'LabyrinthodontiaLocked',
          srcs: 'image/cards/locked/labyrinthodontia.png'
        },
        {
          name: 'LabyrinthosaurusLocked',
          srcs: 'image/cards/locked/labyrinthosaurus.png'
        },
        {
          name: 'LimnoscelisLocked',
          srcs: 'image/cards/locked/limnoscelis.png'
        },
        {
          name: 'MajungasaurusLocked',
          srcs: 'image/cards/locked/majungasaurus.png'
        },
        {
          name: 'PelecanimimusLocked',
          srcs: 'image/cards/locked/pelecanimimus.png'
        },
        {
          name: 'TriceratopsLocked',
          srcs: 'image/cards/locked/triceratops.png'
        },
        {
          name: 'TropeognathusLocked',
          srcs: 'image/cards/locked/tropeognathus.png'
        },
        {
          name: 'TuojiangosaurusLocked',
          srcs: 'image/cards/locked/tuojiangosaurus.png'
        },
        {
          name: 'UtahraptorLocked',
          srcs: 'image/cards/locked/utahraptor.png'
        },

        // Elite Tier
        {
          name: 'AllosaurusLocked',
          srcs: 'image/cards/locked/allosaurus.png'
        },
        {
          name: 'CarnotaurusLocked',
          srcs: 'image/cards/locked/carnotaurus.png'
        },
        {
          name: 'CorythosaurusLocked',
          srcs: 'image/cards/locked/corythosaurus.png'
        },
        {
          name: 'DilophosaurusLocked',
          srcs: 'image/cards/locked/dilophosaurus.png'
        },
        {
          name: 'DimetrocarnusLocked',
          srcs: 'image/cards/locked/dimetrocarnus.png'
        },
        {
          name: 'DiplodocusLocked',
          srcs: 'image/cards/locked/diplodocus.png'
        },
        {
          name: 'DiplotatorLocked',
          srcs: 'image/cards/locked/diplotator.png'
        },
        {
          name: 'DsungaripterusLocked',
          srcs: 'image/cards/locked/dsungaripterus.png'
        },
        {
          name: 'GallimimusLocked',
          srcs: 'image/cards/locked/gallimimus.png'
        },
        {
          name: 'GiganotosaurusLocked',
          srcs: 'image/cards/locked/giganotosaurus.png'
        },
        {
          name: 'IrritatorLocked',
          srcs: 'image/cards/locked/irritator.png'
        },
        {
          name: 'MonolophosaurusLocked',
          srcs: 'image/cards/locked/monolophosaurus.png'
        },
        {
          name: 'NasutoceratopsLocked',
          srcs: 'image/cards/locked/nasutoceratops.png'
        },
        {
          name: 'NundagosaurusLocked',
          srcs: 'image/cards/locked/nundagosaurus.png'
        },
        {
          name: 'NundasuchusLocked',
          srcs: 'image/cards/locked/nundasuchus.png'
        },

        // Ancient Tier
        {
          name: 'AndrewtheriumLocked',
          srcs: 'image/cards/locked/andrewtherium.png'
        },
        {
          name: 'DimetrodonLocked',
          srcs: 'image/cards/locked/dimetrodon.png'
        },
        {
          name: 'DimorphodonLocked',
          srcs: 'image/cards/locked/dimorphodon.png'
        },
        {
          name: 'EdaphosaurusLocked',
          srcs: 'image/cards/locked/edaphosaurus.png'
        },
        {
          name: 'HauffiosaurusLocked',
          srcs: 'image/cards/locked/hauffiosaurus.png'
        },
        {
          name: 'KronosaurusLocked',
          srcs: 'image/cards/locked/kronosaurus.png'
        },
        {
          name: 'LeedsichthysLocked',
          srcs: 'image/cards/locked/leedsichthys.png'
        },
        {
          name: 'LiopleurodonLocked',
          srcs: 'image/cards/locked/liopleurodon.png'
        },
        {
          name: 'marsupial LionLocked',
          srcs: 'image/cards/locked/marsupial lion.png'
        },
        {
          name: 'MicroposaurusLocked',
          srcs: 'image/cards/locked/microposaurus.png'
        },
        {
          name: 'OstafrikasaurusLocked',
          srcs: 'image/cards/locked/ostafrikasaurus.png'
        },
        {
          name: 'PliosaurusLocked',
          srcs: 'image/cards/locked/pliosaurus.png'
        },

        // Mytical Tier
        {
          name: 'AllonogmiusLocked',
          srcs: 'image/cards/locked/allonogmius.png'
        },
        {
          name: 'ArmormataLocked',
          srcs: 'image/cards/locked/armormata.png'
        },
        {
          name: 'BagehesaurusLocked',
          srcs: 'image/cards/locked/bagehesaurus.png'
        },
        {
          name: 'ChromaspinusLocked',
          srcs: 'image/cards/locked/chromaspinus.png'
        },
        {
          name: 'DracoceratopsLocked',
          srcs: 'image/cards/locked/dracoceratops.png'
        },
        {
          name: 'ErliphosaurusLocked',
          srcs: 'image/cards/locked/erliphosaurus.png'
        },
        {
          name: 'GorgosuchusLocked',
          srcs: 'image/cards/locked/gorgosuchus.png'
        },
        {
          name: 'IguanosuchusLocked',
          srcs: 'image/cards/locked/iguanosuchus.png'
        },
        {
          name: 'SmilodonLocked',
          srcs: 'image/cards/locked/smilodon.png'
        },
        {
          name: 'TroodonLocked',
          srcs: 'image/cards/locked/troodon.png'
        },

        // Immortal Tier
        {
          name: 'GiantOrthoconeLocked',
          srcs: 'image/cards/locked/giantorthocone.png'
        },
        {
          name: 'HyaenodonLocked',
          srcs: 'image/cards/locked/hyaenodon.png'
        },
        {
          name: 'OviraptorLocked',
          srcs: 'image/cards/locked/oviraptor.png'
        },
        {
          name: 'PlotosaurusLocked',
          srcs: 'image/cards/locked/plotosaurus.png'
        },
        {
          name: 'ProceratosaurusLocked',
          srcs: 'image/cards/locked/proceratosaurus.png'
        },
        {
          name: 'ProcoptodonLocked',
          srcs: 'image/cards/locked/procoptodon.png'
        },
        {
          name: 'StygimolochLocked',
          srcs: 'image/cards/locked/stygimoloch.png'
        },
        {
          name: 'TusoteuthisLocked',
          srcs: 'image/cards/locked/tusoteuthis.png'
        },


        // Unlocked
        // Herald Tier
        {
          name: 'AlangasaurusUnlocked',
          srcs: 'image/cards/unlocked/alangasaurus.png'
        },
        {
          name: 'AlanqaUnlocked',
          srcs: 'image/cards/unlocked/alanqa.png'
        },
        {
          name: 'ArgentinosaurusUnlocked',
          srcs: 'image/cards/unlocked/argentinosaurus.png'
        },
        {
          name: 'BonitasauraUnlocked',
          srcs: 'image/cards/unlocked/Bonitasaura.png'
        },
        {
          name: 'ColoborhynchusUnlocked',
          srcs: 'image/cards/unlocked/coloborhynchus.png'
        },
        {
          name: 'DiplocaulusUnlocked',
          srcs: 'image/cards/unlocked/diplocaulus.png'
        },
        {
          name: 'GuanlongUnlocked',
          srcs: 'image/cards/unlocked/guanlong.png'
        },
        {
          name: 'HatzegopteryxUnlocked',
          srcs: 'image/cards/unlocked/hatzegopteryx.png'
        },
        {
          name: 'LabyrinthodontiaUnlocked',
          srcs: 'image/cards/unlocked/labyrinthodontia.png'
        },
        {
          name: 'LabyrinthosaurusUnlocked',
          srcs: 'image/cards/unlocked/labyrinthosaurus.png'
        },
        {
          name: 'LimnoscelisUnlocked',
          srcs: 'image/cards/unlocked/limnoscelis.png'
        },
        {
          name: 'MajungasaurusUnlocked',
          srcs: 'image/cards/unlocked/majungasaurus.png'
        },
        {
          name: 'PelecanimimusUnlocked',
          srcs: 'image/cards/unlocked/pelecanimimus.png'
        },
        {
          name: 'TriceratopsUnlocked',
          srcs: 'image/cards/unlocked/triceratops.png'
        },
        {
          name: 'TropeognathusUnlocked',
          srcs: 'image/cards/unlocked/tropeognathus.png'
        },
        {
          name: 'TuojiangosaurusUnlocked',
          srcs: 'image/cards/unlocked/tuojiangosaurus.png'
        },
        {
          name: 'UtahraptorUnlocked',
          srcs: 'image/cards/unlocked/utahraptor.png'
        },

        // Elite Tier
        {
          name: 'AllosaurusUnlocked',
          srcs: 'image/cards/unlocked/allosaurus.png'
        },
        {
          name: 'CarnotaurusUnlocked',
          srcs: 'image/cards/unlocked/carnotaurus.png'
        },
        {
          name: 'CorythosaurusUnlocked',
          srcs: 'image/cards/unlocked/corythosaurus.png'
        },
        {
          name: 'DilophosaurusUnlocked',
          srcs: 'image/cards/unlocked/dilophosaurus.png'
        },
        {
          name: 'DimetrocarnusUnlocked',
          srcs: 'image/cards/unlocked/dimetrocarnus.png'
        },
        {
          name: 'DiplodocusUnlocked',
          srcs: 'image/cards/unlocked/diplodocus.png'
        },
        {
          name: 'DiplotatorUnlocked',
          srcs: 'image/cards/unlocked/diplotator.png'
        },
        {
          name: 'DsungaripterusUnlocked',
          srcs: 'image/cards/unlocked/dsungaripterus.png'
        },
        {
          name: 'GallimimusUnlocked',
          srcs: 'image/cards/unlocked/gallimimus.png'
        },
        {
          name: 'GiganotosaurusUnlocked',
          srcs: 'image/cards/unlocked/giganotosaurus.png'
        },
        {
          name: 'IrritatorUnlocked',
          srcs: 'image/cards/unlocked/irritator.png'
        },
        {
          name: 'MonolophosaurusUnlocked',
          srcs: 'image/cards/unlocked/monolophosaurus.png'
        },
        {
          name: 'NasutoceratopsUnlocked',
          srcs: 'image/cards/unlocked/nasutoceratops.png'
        },
        {
          name: 'NundagosaurusUnlocked',
          srcs: 'image/cards/unlocked/nundagosaurus.png'
        },
        {
          name: 'NundasuchusUnlocked',
          srcs: 'image/cards/unlocked/nundasuchus.png'
        },

        // Ancient Tier
        {
          name: 'AndrewtheriumUnlocked',
          srcs: 'image/cards/unlocked/andrewtherium.png'
        },
        {
          name: 'DimetrodonUnlocked',
          srcs: 'image/cards/unlocked/dimetrodon.png'
        },
        {
          name: 'DimorphodonUnlocked',
          srcs: 'image/cards/unlocked/dimorphodon.png'
        },
        {
          name: 'EdaphosaurusUnlocked',
          srcs: 'image/cards/unlocked/edaphosaurus.png'
        },
        {
          name: 'HauffiosaurusUnlocked',
          srcs: 'image/cards/unlocked/hauffiosaurus.png'
        },
        {
          name: 'KronosaurusUnlocked',
          srcs: 'image/cards/unlocked/kronosaurus.png'
        },
        {
          name: 'LeedsichthysUnlocked',
          srcs: 'image/cards/unlocked/leedsichthys.png'
        },
        {
          name: 'LiopleurodonUnlocked',
          srcs: 'image/cards/unlocked/liopleurodon.png'
        },
        {
          name: 'marsupial LionUnlocked',
          srcs: 'image/cards/unlocked/marsupial lion.png'
        },
        {
          name: 'MicroposaurusUnlocked',
          srcs: 'image/cards/unlocked/microposaurus.png'
        },
        {
          name: 'OstafrikasaurusUnlocked',
          srcs: 'image/cards/unlocked/ostafrikasaurus.png'
        },
        {
          name: 'PliosaurusUnlocked',
          srcs: 'image/cards/unlocked/pliosaurus.png'
        },

        // Mytical Tier
        {
          name: 'AllonogmiusUnlocked',
          srcs: 'image/cards/unlocked/allonogmius.png'
        },
        {
          name: 'ArmormataUnlocked',
          srcs: 'image/cards/unlocked/armormata.png'
        },
        {
          name: 'BagehesaurusUnlocked',
          srcs: 'image/cards/unlocked/bagehesaurus.png'
        },
        {
          name: 'ChromaspinusUnlocked',
          srcs: 'image/cards/unlocked/chromaspinus.png'
        },
        {
          name: 'DracoceratopsUnlocked',
          srcs: 'image/cards/unlocked/dracoceratops.png'
        },
        {
          name: 'ErliphosaurusUnlocked',
          srcs: 'image/cards/unlocked/erliphosaurus.png'
        },
        {
          name: 'GorgosuchusUnlocked',
          srcs: 'image/cards/unlocked/gorgosuchus.png'
        },
        {
          name: 'IguanosuchusUnlocked',
          srcs: 'image/cards/unlocked/iguanosuchus.png'
        },
        {
          name: 'SmilodonUnlocked',
          srcs: 'image/cards/unlocked/smilodon.png'
        },
        {
          name: 'TroodonUnlocked',
          srcs: 'image/cards/unlocked/troodon.png'
        },

        // Immortal Tier
        {
          name: 'GiantOrthoconeUnlocked',
          srcs: 'image/cards/unlocked/giantorthocone.png'
        },
        {
          name: 'HyaenodonUnlocked',
          srcs: 'image/cards/unlocked/hyaenodon.png'
        },
        {
          name: 'OviraptorUnlocked',
          srcs: 'image/cards/unlocked/oviraptor.png'
        },
        {
          name: 'PlotosaurusUnlocked',
          srcs: 'image/cards/unlocked/plotosaurus.png'
        },
        {
          name: 'ProceratosaurusUnlocked',
          srcs: 'image/cards/unlocked/proceratosaurus.png'
        },
        {
          name: 'ProcoptodonUnlocked',
          srcs: 'image/cards/unlocked/procoptodon.png'
        },
        {
          name: 'StygimolochUnlocked',
          srcs: 'image/cards/unlocked/stygimoloch.png'
        },
        {
          name: 'TusoteuthisUnlocked',
          srcs: 'image/cards/unlocked/tusoteuthis.png'
        },

      ]
    },
    {
      name: 'AlbumScene',
      assets: [
        {
          name: 'AlbumBackground',
          srcs: 'image/albumBackground.png',
        },
        {
          name: 'AlbumNextPageBtn',
          srcs: 'image/BtnAlbumNextPage.png',
        },
        {
          name: 'AlbumNextPageBtnDisabled',
          srcs: 'image/BtnAlbumNextPageDisabled.png',
        },
        {
          name: 'AlbumPrevPageBtn',
          srcs: 'image/BtnAlbumPrevPage.png',
        },
        {
          name: 'AlbumPrevPageBtnDisabled',
          srcs: 'image/BtnAlbumPrevPageDisabled.png',
        },
        {
          name: 'AlbumClaimBtn',
          srcs: 'image/btnClaimBackgroundEnable.png',
        },
        {
          name: 'AlbumClaimBtnDisabled',
          srcs: 'image/btnClaimBackgroundDisable.png',
        },
        {
          name: 'RarityPanelBg',
          srcs: 'image/rarityPanelBg.png',
        },
        {
          name: 'RarityBtnAllFilter',
          srcs: 'image/rarityBtnAllBg.png',
        },
        {
          name: 'RarityBtnFilter',
          srcs: 'image/rarityBtnFilterBg.png',
        },
      ]
    },
    {
      name: "ListingScene",
      assets: [
        {
          name: "BtnHelp",
          srcs: "image/BtnHelp.png",
        },
        {
          name: "BtnPagePaginationActive",
          srcs: "image/BtnPagePaginationActive.png",
        },
        {
          name: 'BtnPagePaginationNumberInactive',
          srcs: 'image/BtnPagePaginationNumberInactive.png'
        },
        {
          name: "BtnPagePaginationRest",
          srcs: "image/BtnPagePaginationRest.png",
        },
        {
          name: 'BtnPurchaseCountdown',
          srcs: 'image/BtnPurchaseCountdown.png'
        },
        {
          name: 'BtnPurchaseActive',
          srcs: 'image/BtnPurchaseActive.png'
        },
        {
          name: 'BtnRefreshListing',
          srcs: 'image/BtnRefreshListing.png'
        },
        {
          name: 'ListingItemBg',
          srcs: 'image/jurassicEggBg.png'
        },
        {
          name: 'EggIcon1',
          srcs: 'image/imgJurassicEggIcon.png'
        },
        {
          name: 'EggIcon2',
          srcs: 'image/imgJurassicEggIcon1.png'
        },
        {
          name: 'EggIcon3',
          srcs: 'image/imgJurassicEggIcon2.png'
        },
        {
          name: 'ListingBackground',
          srcs: 'image/ListingBackground.png'
        },
        {
          name: 'ListingButtonHighlight',
          srcs: 'image/ListingButtonHighlight.png'
        },
        {
          name: 'PnlJurassicMarketBackground',
          srcs: 'image/pnlJurassicMarketBackground.png'
        },
        {
          name: 'RankExpBarBg',
          srcs: 'image/rankExpBarBg.png'
        },
        {
          name: 'RankExpBarFill',
          srcs: 'image/imgRankExpBarFill.png'
        },
        // {
        //   name: 'BigEggIcon1',
        //   srcs: 'image/imgJurassicEggBigIcon1.png'
        // },
        // {
        //   name: 'BigEggIcon2',
        //   srcs: 'image/imgJurassicEggBigIcon2.png'
        // },
        {
          name: 'BigEggIcon3',
          srcs: 'image/imgJurassicEggBigIcon3.png'
        },
      ]
    },
  ],
};
