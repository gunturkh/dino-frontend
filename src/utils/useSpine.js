import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { SpineParser, TextureAtlas } from 'pixi-spine'
import * as PIXI from 'pixi.js-legacy'

export const useSpine = (config) => {
  const [spine, setSpine] = useState(null)
  const [isSpineLoaded, setSpineLoaded] = useState(false)

  const getSpine = useCallback(() => {
    const spineParser = new SpineParser()

    const jsonParser = spineParser.createJsonParser()

    const atlas = new TextureAtlas(
      PIXI.Loader.shared.resources[config.atlas].data,
      (_, loader) => {
        loader(PIXI.Loader.shared.resources[config.spine].texture)
      },
    )

    spineParser.parseData(
      PIXI.Loader.shared.resources[config.spine],
      jsonParser,
      atlas,
      config.json.url,
    )

    setSpine(PIXI.Loader.shared.resources[config.spine].spineData)

    setSpineLoaded(true)
  }, [config])

  useEffect(() => {
    if (!isSpineLoaded) {
      getSpine()
    }
  }, [getSpine, isSpineLoaded])

  const memoizedSpine = useMemo(() => {
    if (isSpineLoaded) {
      return spine
    }

    return null
  }, [isSpineLoaded, spine])

  return memoizedSpine
}