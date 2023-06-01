import type { ResolverManifest } from "pixi.js";

// const BASE_URL = "https://ik.imagekit.io/cq9mywjfr";
const BASE_URL = "https://cdn.jurassicegg.co";

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
          name: "BackBtn",
          srcs: "image/backBtn.png",
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
          name: "FormBg",
          srcs: "image/formBackground.png",
        },
        {
          name: "InputBg",
          srcs: "image/InputBox.png",
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
          name: "ProfileAvatarDefault",
          srcs: "image/iconProfile.png",
        },
        {
          name: "DinoFundBg",
          srcs: "image/dinoFund.png",
        },
        {
          name: "BtnLngHome",
          srcs: "image/BtnLanguageHome.png",
        },
        {
          name: "BtnShareHome",
          srcs: "image/BtnShare.png",
        },
        {
          name: "BtnAudioHomeOn",
          srcs: "image/BtnAudioHomeOn.png",
        },
        {
          name: "BtnAudioHomeMute",
          srcs: "image/BtnAudioHomeMute.png",
        },
        {
          name: "BNBDetails",
          srcs: "image/bnbDetails.png",
        },
        {
          name: "DinoEggDetails",
          srcs: "image/PnlDinoEgg.png",
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
          name: "PlusIcon",
          srcs: "image/imgPlusSignIcon.png",
        },
        {
          name: "BNBIcon",
          srcs: "image/imgBnbIcon.png",
        },
        {
          name: "DinoEggIcon",
          srcs: "image/imgDinoEggIcon.png",
        },
        {
          name: "BonusIcon",
          srcs: "image/imgBonusIcon.png",
        },
        {
          name: "DinoTicketIcon",
          srcs: "image/imgDinoTicketIcon.png",
        },
        {
          name: "EventFragmentIcon",
          srcs: "image/imgEventFragmentIcon.png",
        },
        {
          name: "USDTIcon",
          srcs: "image/imgUSDTIcon.png",
        },
        {
          name: "ImgDetailsBg",
          srcs: "image/imgDetailsBg.png",
        },
        {
          name: "LowerBtnSmallBg",
          srcs: "image/imgLowerMenuBackground.png",
        },
        {
          name: "LowerBtnBigBg",
          srcs: "image/imgUpassBackground.png",
        },
        {
          name: "ImgAlbum",
          srcs: "image/imgAlbumIcon.png",
        },
        {
          name: "ImgBulletin",
          srcs: "image/imgBulletinIcon.png",
        },
        {
          name: "ImgComrade",
          srcs: "image/imgComradeIcon.png",
        },
        {
          name: "ImgDinoCenter",
          srcs: "image/imgDinoCenterIcon.png",
        },
        {
          name: "ImgGameTask",
          srcs: "image/imgGameTaskIcon.png",
        },
        {
          name: "ImgHistory",
          srcs: "image/imgHistoryIcon.png",
        },
        {
          name: "ImgMiniGames",
          srcs: "image/imgMiniGamesIcon.png",
        },
        {
          name: "ImgProfile",
          srcs: "image/imgProfileIcon.png",
        },
        {
          name: "ImgUpass",
          srcs: "image/imgUpassIcon.png",
        },
        {
          name: "EggPlate",
          srcs: "image/eggPlate.png",
        },
      ],
    },
    {
      name: "ProfileScene",
      assets: [
        {
          name: "ProfileBackground",
          srcs: "image/profileBackground.png",
        },
        {
          name: "UpperDivider",
          srcs: "image/imgDivider.png",
        },
        {
          name: "LogoutBtn",
          srcs: "image/logoutBtn.png",
        },
        {
          name: "RenameIcon",
          srcs: "image/renameIcon.png",
        },
        {
          name: "MenuLeftIcon",
          srcs: "image/menuLeftIcon.png",
        },
        {
          name: "ArrowRightIcon",
          srcs: "image/arrowRightIcon.png",
        },
        {
          name: "CopyIcon",
          srcs: "image/copyIcon.png",
        },
        {
          name: "SwitchOnIcon",
          srcs: "image/switchOn.png",
        },
        {
          name: "SwitchOffIcon",
          srcs: "image/switchOff.png",
        },
        {
          name: "TwitterIcon",
          srcs: "image/twitterIcon.png",
        },
        {
          name: "TiktokIcon",
          srcs: "image/tiktokIcon.png",
        },
        {
          name: "TelegramIcon",
          srcs: "image/telegramIcon.png",
        },
      ],
    },
    {
      name: "CollectionScene",
      assets: [
        // Herald Tier
        {
          name: "AlangasaurusLocked",
          srcs: BASE_URL + "/cards/locked/alangasaurus.png",
        },
        {
          name: "AlanqaLocked",
          srcs: BASE_URL + "/cards/locked/alanqa.png",
        },
        {
          name: "ArgentinosaurusLocked",
          srcs: BASE_URL + "/cards/locked/argentinosaurus.png",
        },
        {
          name: "BonitasauraLocked",
          srcs: BASE_URL + "/cards/locked/Bonitasaura.png",
        },
        {
          name: "ColoborhynchusLocked",
          srcs: BASE_URL + "/cards/locked/coloborhynchus.png",
        },
        {
          name: "DiplocaulusLocked",
          srcs: BASE_URL + "/cards/locked/diplocaulus.png",
        },
        {
          name: "GuanlongLocked",
          srcs: BASE_URL + "/cards/locked/guanlong.png",
        },
        {
          name: "HatzegopteryxLocked",
          srcs: BASE_URL + "/cards/locked/hatzegopteryx.png",
        },
        {
          name: "LabyrinthodontiaLocked",
          srcs: BASE_URL + "/cards/locked/labyrinthodontia.png",
        },
        {
          name: "LabyrinthosaurusLocked",
          srcs: BASE_URL + "/cards/locked/labyrinthosaurus.png",
        },
        {
          name: "LimnoscelisLocked",
          srcs: BASE_URL + "/cards/locked/limnoscelis.png",
        },
        {
          name: "MajungasaurusLocked",
          srcs: BASE_URL + "/cards/locked/majungasaurus.png",
        },
        {
          name: "PelecanimimusLocked",
          srcs: BASE_URL + "/cards/locked/pelecanimimus.png",
        },
        {
          name: "TriceratopsLocked",
          srcs: BASE_URL + "/cards/locked/triceratops.png",
        },
        {
          name: "TropeognathusLocked",
          srcs: BASE_URL + "/cards/locked/tropeognathus.png",
        },
        {
          name: "TuojiangosaurusLocked",
          srcs: BASE_URL + "/cards/locked/tuojiangosaurus.png",
        },
        {
          name: "UtahraptorLocked",
          srcs: BASE_URL + "/cards/locked/utahraptor.png",
        },

        // Elite Tier
        {
          name: "AllosaurusLocked",
          srcs: BASE_URL + "/cards/locked/allosaurus.png",
        },
        {
          name: "CarnotaurusLocked",
          srcs: BASE_URL + "/cards/locked/carnotaurus.png",
        },
        {
          name: "CorythosaurusLocked",
          srcs: BASE_URL + "/cards/locked/corythosaurus.png",
        },
        {
          name: "DilophosaurusLocked",
          srcs: BASE_URL + "/cards/locked/dilophosaurus.png",
        },
        {
          name: "DimetrocarnusLocked",
          srcs: BASE_URL + "/cards/locked/dimetrocarnus.png",
        },
        {
          name: "DiplodocusLocked",
          srcs: BASE_URL + "/cards/locked/diplodocus.png",
        },
        {
          name: "DiplotatorLocked",
          srcs: BASE_URL + "/cards/locked/diplotator.png",
        },
        {
          name: "DsungaripterusLocked",
          srcs: BASE_URL + "/cards/locked/dsungaripterus.png",
        },
        {
          name: "GallimimusLocked",
          srcs: BASE_URL + "/cards/locked/gallimimus.png",
        },
        {
          name: "GiganotosaurusLocked",
          srcs: BASE_URL + "/cards/locked/giganotosaurus.png",
        },
        {
          name: "IrritatorLocked",
          srcs: BASE_URL + "/cards/locked/irritator.png",
        },
        {
          name: "MonolophosaurusLocked",
          srcs: BASE_URL + "/cards/locked/monolophosaurus.png",
        },
        {
          name: "NasutoceratopsLocked",
          srcs: BASE_URL + "/cards/locked/nasutoceratops.png",
        },
        {
          name: "NundagosaurusLocked",
          srcs: BASE_URL + "/cards/locked/nundagosaurus.png",
        },
        {
          name: "NundasuchusLocked",
          srcs: BASE_URL + "/cards/locked/nundasuchus.png",
        },

        // Ancient Tier
        {
          name: "AndrewtheriumLocked",
          srcs: BASE_URL + "/cards/locked/andrewtherium.png",
        },
        {
          name: "DimetrodonLocked",
          srcs: BASE_URL + "/cards/locked/dimetrodon.png",
        },
        {
          name: "DimorphodonLocked",
          srcs: BASE_URL + "/cards/locked/dimorphodon.png",
        },
        {
          name: "EdaphosaurusLocked",
          srcs: BASE_URL + "/cards/locked/edaphosaurus.png",
        },
        {
          name: "HauffiosaurusLocked",
          srcs: BASE_URL + "/cards/locked/hauffiosaurus.png",
        },
        {
          name: "KronosaurusLocked",
          srcs: BASE_URL + "/cards/locked/kronosaurus.png",
        },
        {
          name: "LeedsichthysLocked",
          srcs: BASE_URL + "/cards/locked/leedsichthys.png",
        },
        {
          name: "LiopleurodonLocked",
          srcs: BASE_URL + "/cards/locked/liopleurodon.png",
        },
        {
          name: "marsupial LionLocked",
          srcs: BASE_URL + "/cards/locked/marsupial_lion.png",
        },
        {
          name: "MicroposaurusLocked",
          srcs: BASE_URL + "/cards/locked/microposaurus.png",
        },
        {
          name: "OstafrikasaurusLocked",
          srcs: BASE_URL + "/cards/locked/ostafrikasaurus.png",
        },
        {
          name: "PliosaurusLocked",
          srcs: BASE_URL + "/cards/locked/pliosaurus.png",
        },

        // Mytical Tier
        {
          name: "AllonogmiusLocked",
          srcs: BASE_URL + "/cards/locked/allonogmius.png",
        },
        {
          name: "ArmormataLocked",
          srcs: BASE_URL + "/cards/locked/armormata.png",
        },
        {
          name: "BagehesaurusLocked",
          srcs: BASE_URL + "/cards/locked/bagehesaurus.png",
        },
        {
          name: "ChromaspinusLocked",
          srcs: BASE_URL + "/cards/locked/chromaspinus.png",
        },
        {
          name: "DracoceratopsLocked",
          srcs: BASE_URL + "/cards/locked/dracoceratops.png",
        },
        {
          name: "ErliphosaurusLocked",
          srcs: BASE_URL + "/cards/locked/erliphosaurus.png",
        },
        {
          name: "GorgosuchusLocked",
          srcs: BASE_URL + "/cards/locked/gorgosuchus.png",
        },
        {
          name: "IguanosuchusLocked",
          srcs: BASE_URL + "/cards/locked/iguanosuchus.png",
        },
        {
          name: "SmilodonLocked",
          srcs: BASE_URL + "/cards/locked/smilodon.png",
        },
        {
          name: "TroodonLocked",
          srcs: BASE_URL + "/cards/locked/troodon.png",
        },

        // Immortal Tier
        {
          name: "GiantOrthoconeLocked",
          srcs: BASE_URL + "/cards/locked/giantorthocone.png",
        },
        {
          name: "HyaenodonLocked",
          srcs: BASE_URL + "/cards/locked/hyaenodon.png",
        },
        {
          name: "OviraptorLocked",
          srcs: BASE_URL + "/cards/locked/oviraptor.png",
        },
        {
          name: "PlotosaurusLocked",
          srcs: BASE_URL + "/cards/locked/plotosaurus.png",
        },
        {
          name: "ProceratosaurusLocked",
          srcs: BASE_URL + "/cards/locked/proceratosaurus.png",
        },
        {
          name: "ProcoptodonLocked",
          srcs: BASE_URL + "/cards/locked/procoptodon.png",
        },
        {
          name: "StygimolochLocked",
          srcs: BASE_URL + "/cards/locked/stygimoloch.png",
        },
        {
          name: "TusoteuthisLocked",
          srcs: BASE_URL + "/cards/locked/tusoteuthis.png",
        },

        // Unlocked
        // Herald Tier
        {
          name: "AlangasaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/alangasaurus.png",
        },
        {
          name: "AlanqaUnlocked",
          srcs: BASE_URL + "/cards/unlocked/alanqa.png",
        },
        {
          name: "ArgentinosaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/argentinosaurus.png",
        },
        {
          name: "BonitasauraUnlocked",
          srcs: BASE_URL + "/cards/unlocked/Bonitasaura.png",
        },
        {
          name: "ColoborhynchusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/coloborhynchus.png",
        },
        {
          name: "DiplocaulusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/diplocaulus.png",
        },
        {
          name: "GuanlongUnlocked",
          srcs: BASE_URL + "/cards/unlocked/guanlong.png",
        },
        {
          name: "HatzegopteryxUnlocked",
          srcs: BASE_URL + "/cards/unlocked/hatzegopteryx.png",
        },
        {
          name: "LabyrinthodontiaUnlocked",
          srcs: BASE_URL + "/cards/unlocked/labyrinthodontia.png",
        },
        {
          name: "LabyrinthosaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/labyrinthosaurus.png",
        },
        {
          name: "LimnoscelisUnlocked",
          srcs: BASE_URL + "/cards/unlocked/limnoscelis.png",
        },
        {
          name: "MajungasaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/majungasaurus.png",
        },
        {
          name: "PelecanimimusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/pelecanimimus.png",
        },
        {
          name: "TriceratopsUnlocked",
          srcs: BASE_URL + "/cards/unlocked/triceratops.png",
        },
        {
          name: "TropeognathusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/tropeognathus.png",
        },
        {
          name: "TuojiangosaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/tuojiangosaurus.png",
        },
        {
          name: "UtahraptorUnlocked",
          srcs: BASE_URL + "/cards/unlocked/utahraptor.png",
        },

        // Elite Tier
        {
          name: "AllosaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/allosaurus.png",
        },
        {
          name: "CarnotaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/carnotaurus.png",
        },
        {
          name: "CorythosaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/corythosaurus.png",
        },
        {
          name: "DilophosaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/dilophosaurus.png",
        },
        {
          name: "DimetrocarnusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/dimetrocarnus.png",
        },
        {
          name: "DiplodocusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/diplodocus.png",
        },
        {
          name: "DiplotatorUnlocked",
          srcs: BASE_URL + "/cards/unlocked/diplotator.png",
        },
        {
          name: "DsungaripterusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/dsungaripterus.png",
        },
        {
          name: "GallimimusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/gallimimus.png",
        },
        {
          name: "GiganotosaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/giganotosaurus.png",
        },
        {
          name: "IrritatorUnlocked",
          srcs: BASE_URL + "/cards/unlocked/irritator.png",
        },
        {
          name: "MonolophosaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/monolophosaurus.png",
        },
        {
          name: "NasutoceratopsUnlocked",
          srcs: BASE_URL + "/cards/unlocked/nasutoceratops.png",
        },
        {
          name: "NundagosaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/nundagosaurus.png",
        },
        {
          name: "NundasuchusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/nundasuchus.png",
        },

        // Ancient Tier
        {
          name: "AndrewtheriumUnlocked",
          srcs: BASE_URL + "/cards/unlocked/andrewtherium.png",
        },
        {
          name: "DimetrodonUnlocked",
          srcs: BASE_URL + "/cards/unlocked/dimetrodon.png",
        },
        {
          name: "DimorphodonUnlocked",
          srcs: BASE_URL + "/cards/unlocked/dimorphodon.png",
        },
        {
          name: "EdaphosaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/edaphosaurus.png",
        },
        {
          name: "HauffiosaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/hauffiosaurus.png",
        },
        {
          name: "KronosaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/kronosaurus.png",
        },
        {
          name: "LeedsichthysUnlocked",
          srcs: BASE_URL + "/cards/unlocked/leedsichthys.png",
        },
        {
          name: "LiopleurodonUnlocked",
          srcs: BASE_URL + "/cards/unlocked/liopleurodon.png",
        },
        {
          name: "marsupial LionUnlocked",
          srcs: BASE_URL + "/cards/unlocked/marsupial_lion.png",
        },
        {
          name: "MicroposaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/microposaurus.png",
        },
        {
          name: "OstafrikasaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/ostafrikasaurus.png",
        },
        {
          name: "PliosaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/pliosaurus.png",
        },

        // Mytical Tier
        {
          name: "AllonogmiusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/allonogmius.png",
        },
        {
          name: "ArmormataUnlocked",
          srcs: BASE_URL + "/cards/unlocked/armormata.png",
        },
        {
          name: "BagehesaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/bagehesaurus.png",
        },
        {
          name: "ChromaspinusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/chromaspinus.png",
        },
        {
          name: "DracoceratopsUnlocked",
          srcs: BASE_URL + "/cards/unlocked/dracoceratops.png",
        },
        {
          name: "ErliphosaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/erliphosaurus.png",
        },
        {
          name: "GorgosuchusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/gorgosuchus.png",
        },
        {
          name: "IguanosuchusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/iguanosuchus.png",
        },
        {
          name: "SmilodonUnlocked",
          srcs: BASE_URL + "/cards/unlocked/smilodon.png",
        },
        {
          name: "TroodonUnlocked",
          srcs: BASE_URL + "/cards/unlocked/troodon.png",
        },

        // Immortal Tier
        {
          name: "GiantOrthoconeUnlocked",
          srcs: BASE_URL + "/cards/unlocked/giantorthocone.png",
        },
        {
          name: "HyaenodonUnlocked",
          srcs: BASE_URL + "/cards/unlocked/hyaenodon.png",
        },
        {
          name: "OviraptorUnlocked",
          srcs: BASE_URL + "/cards/unlocked/oviraptor.png",
        },
        {
          name: "PlotosaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/plotosaurus.png",
        },
        {
          name: "ProceratosaurusUnlocked",
          srcs: BASE_URL + "/cards/unlocked/proceratosaurus.png",
        },
        {
          name: "ProcoptodonUnlocked",
          srcs: BASE_URL + "/cards/unlocked/procoptodon.png",
        },
        {
          name: "StygimolochUnlocked",
          srcs: BASE_URL + "/cards/unlocked/stygimoloch.png",
        },
        {
          name: "TusoteuthisUnlocked",
          srcs: BASE_URL + "/cards/unlocked/tusoteuthis.png",
        },
      ],
    },
    {
      name: "AlbumScene",
      assets: [
        {
          name: "AlbumBackground",
          srcs: "image/albumBackground.png",
        },
        {
          name: "AlbumNextPageBtn",
          srcs: "image/BtnAlbumNextPage.png",
        },
        {
          name: "AlbumNextPageBtnDisabled",
          srcs: "image/BtnAlbumNextPageDisabled.png",
        },
        {
          name: "AlbumPrevPageBtn",
          srcs: "image/BtnAlbumPrevPage.png",
        },
        {
          name: "AlbumPrevPageBtnDisabled",
          srcs: "image/BtnAlbumPrevPageDisabled.png",
        },
        {
          name: "AlbumClaimBtn",
          srcs: "image/btnClaimBackgroundEnable.png",
        },
        {
          name: "AlbumClaimBtnDisabled",
          srcs: "image/btnClaimBackgroundDisable.png",
        },
        {
          name: "RarityPanelBg",
          srcs: "image/rarityPanelBg.png",
        },
        {
          name: "RarityBtnAllFilter",
          srcs: "image/rarityBtnAllBg.png",
        },
        {
          name: "RarityBtnFilter",
          srcs: "image/rarityBtnFilterBg.png",
        },
        // {
        //   name: "FlyingDino",
        //   srcs: BASE_URL + "/animations/flying-dino/skeleton.json",
        // },
        // {
        //   name: "FlyingDino2",
        //   srcs: BASE_URL + "/animations/flying-dino-2/skeleton.json",
        // },
        // {
        //   name: "FlyingDino3",
        //   srcs: BASE_URL + "/animations/flying-dino-3/skeleton.json",
        // },
      ],
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
          name: "BtnPagePaginationNumberInactive",
          srcs: "image/BtnPagePaginationNumberInactive.png",
        },
        {
          name: "BtnPagePaginationRest",
          srcs: "image/BtnPagePaginationRest.png",
        },
        {
          name: "BtnPurchaseCountdown",
          srcs: "image/BtnPurchaseCountdown.png",
        },
        {
          name: "BtnPurchaseActive",
          srcs: "image/BtnPurchaseActive.png",
        },
        {
          name: "BtnRefreshListing",
          srcs: "image/BtnRefreshListing.png",
        },
        {
          name: "ListingItemBg",
          srcs: "image/jurassicEggBg.png",
        },
        {
          name: "EggIcon1",
          srcs: "image/imgJurassicEggIcon.png",
        },
        {
          name: "EggIcon2",
          srcs: "image/imgJurassicEggIcon2.png",
        },
        {
          name: "EggIcon3",
          srcs: "image/imgJurassicEggIcon1.png",
        },
        {
          name: "ListingBackground",
          srcs: "image/ListingBackground.png",
        },
        {
          name: "ListingButtonHighlight",
          srcs: "image/ListingButtonHighlight.png",
        },
        {
          name: "PnlJurassicMarketBackground",
          srcs: "image/pnlJurassicMarketBackground.png",
        },
        {
          name: "RankExpBarBg",
          srcs: "image/rankExpBarBg.png",
        },
        {
          name: "RankExpBarFill",
          srcs: "image/imgRankExpBarFill.png",
        },
        {
          name: "BigEggIcon1",
          srcs: "image/imgJurassicEggBigIcon.png",
        },
        {
          name: "BigEggIcon2",
          srcs: "image/imgJurassicEggBigIcon2.png",
        },
        {
          name: "BigEggIcon3",
          srcs: "image/imgJurassicEggBigIcon1.png",
        },
      ],
    },
    {
      name: "JPassScene",
      assets: [
        // {
        //   name: "JPassBackground",
        //   srcs: "image/JPassBackground.png",
        // },
        {
          name: "JPassCardBg",
          srcs: "image/ImgJPassCardBg.png",
        },
        {
          name: "JPassItemBg",
          srcs: "image/imgJpassItemBg.png",
        },
        {
          name: "JPassBtnPurchase",
          srcs: "image/BtnJpassPurchaseBg.png",
        },
        {
          name: "JPassCardItem1",
          srcs: "image/imgJpassCardItem1.png",
        },
        {
          name: "JPassCardItem2",
          srcs: "image/imgJpassCardItem2.png",
        },
        {
          name: "JPassCardItem3",
          srcs: "image/imgJpassCardItem3.png",
        },
        {
          name: "JpassPageBg",
          srcs: "image/BtnJpassPageBg.png",
        },
        {
          name: "JpassPageBgHighlight",
          srcs: "image/BtnJpassPageHighlightBg.png",
        },
        {
          name: "JPassItemAutoListing",
          srcs: "image/iconJpassAutoListing.png",
        },
        {
          name: "JPassItemDailyPurchase",
          srcs: "image/iconJpassDailyPurchase.png",
        },
        {
          name: "JPassItemUpgradeHuntingValue",
          srcs: "image/iconJpassUpgradeHuntingValue.png",
        },
        {
          name: "JPassItemShortenHunting1",
          srcs: "image/iconJpassShortenHunting1.png",
        },
        {
          name: "JPassItemShortenHunting2",
          srcs: "image/iconJpassShortenHunting2.png",
        },
        {
          name: "JPassItemShortenHunting3",
          srcs: "image/iconJpassShortenHunting3.png",
        },
      ],
    },
    {
      name: "Animations",
      assets: [
        {
          name: "GatchaAnimation1",
          srcs: BASE_URL + "/animations/cards/egg1/skeleton.json",
        },
        {
          name: "GatchaAnimation2",
          srcs: BASE_URL + "/animations/cards/coinegg2/skeleton.json",
        },
        {
          name: "GatchaAnimation3",
          srcs: BASE_URL + "/animations/cards/coinegg3/skeleton3.json",
        },
        {
          name: "GatchaWithDino",
          srcs: BASE_URL + "/animations/cards/dino_egg_1/skeleton.json",
        },
        {
          name: "GatchaWithCoin1",
          srcs: BASE_URL + "/animations/cards/coinegg1/coin.json",
        },
        {
          name: "GatchaEggWithCoin1",
          srcs: BASE_URL + "/animations/cards/coinegg1/egg1.json",
        },
        {
          name: "GatchaWithCoin2",
          srcs: BASE_URL + "/animations/cards/coinegg2/coin.json",
        },
        {
          name: "GatchaEggWithCoin2",
          srcs: BASE_URL + "/animations/cards/coinegg2/skeleton.json",
        },
        {
          name: "GatchaWithCoin3",
          srcs: BASE_URL + "/animations/cards/coinegg3/coin.json",
        },
        {
          name: "GatchaEggWithCoin3",
          srcs: BASE_URL + "/animations/cards/coinegg3/skeleton3.json",
        },
        {
          name: "GatchaTicket1",
          srcs: BASE_URL + "/animations/cards/item/ticket/tiket.json",
        },
        {
          name: "GatchaEggTicket1",
          srcs: BASE_URL + "/animations/cards/egg/1/skeleton2.json",
        },
        {
          name: "GatchaTicket2",
          srcs: BASE_URL + "/animations/cards/item/ticket/tiket.json",
        },
        {
          name: "GatchaEggTicket2",
          srcs: BASE_URL + "/animations/cards/egg/2/skeleton.json",
        },
        {
          name: "GatchaTicket3",
          srcs: BASE_URL + "/animations/cards/item/ticket/tiket.json",
        },
        {
          name: "GatchaEggTicket3",
          srcs: BASE_URL + "/animations/cards/egg/3/skeleton3.json",
        },
        {
          name: "GatchaBonusEgg",
          srcs: BASE_URL + "/animations/cards/item/eggx2/2x.json",
        },
        {
          name: "GatchaEggBonusEgg",
          srcs: BASE_URL + "/animations/cards/egg/1/skeleton2.json",
        },
        {
          name: "GatchaBonusEgg2",
          srcs: BASE_URL + "/animations/cards/item/eggx2/2x.json",
        },
        {
          name: "GatchaEggBonusEgg2",
          srcs: BASE_URL + "/animations/cards/egg/2/skeleton.json",
        },
        {
          name: "GatchaBonusEgg3",
          srcs: BASE_URL + "/animations/cards/item/eggx2/2x.json",
        },
        {
          name: "GatchaEggBonusEgg3",
          srcs: BASE_URL + "/animations/cards/egg/3/skeleton3.json",
        },
        {
          name: "Rainforest",
          srcs: BASE_URL + "/animations/rainforest/skeleton.json",
        },
        // {
        //   name: "GatchaShineWithCoin2",
        //   srcs: BASE_URL + "/animations/cards/coinegg1/shine.json",
        // },
        // {
        //   name: "GatchaWithCoin2",
        //   srcs: BASE_URL + "/animations/cards/coinegg2/coin.json",
        // },
        // {
        //   name: "GatchaWithCoin3",
        //   srcs: BASE_URL + "/animations/cards/coinegg3/coin.json",
        // },

      ],
    },
  ],
};
