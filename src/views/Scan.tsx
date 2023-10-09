import { Show, createSignal, For, onMount } from "solid-js"
import { css } from "@emotion/css"
import CameraStream from "../components/CameraStream"

function Scan() {
  const [formats, setFormats] = createSignal<string[]>([])

  onMount(async () => {
    // @ts-ignore
    setFormats(await BarcodeDetector.getSupportedFormats())
  })

  return (
    <div
      class={css`
        text-align: center;
      `}
    >
      <Show when={Array.isArray(formats())}>
        <label class={css`display: block; margin: 1rem;`}>
          Barcode formats:&nbsp;
          <select>
            <For each={formats()}>{format => <option>{format}</option>}</For>
          </select>
        </label>
      </Show>

      <CameraStream enabled={true} />
    </div>
  )
}

export default Scan
