import { Show, createSignal, For, onMount } from "solid-js"
import { css } from "@emotion/css"

function Scan() {
  const [formats, setFormats] = createSignal<string[]>([])

  onMount(async () => {
    // @ts-ignore
    setFormats(await BarcodeDetector.getSupportedFormats())

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "environment" },
      },
      audio: false,
    })

    const videoEl = document.querySelector("#stream") as HTMLVideoElement
    videoEl.srcObject = stream

    await videoEl.play()
  })

  return (
    <div
      class={css`
        text-align: center;
      `}
    >
      <Show when={Array.isArray(formats())}>
        <select>
          <For each={formats()}>{format => <option>{format}</option>}</For>
        </select>
      </Show>

      <video id="stream" style="width: 100vw; height: 100vh;" />
    </div>
  )
}

export default Scan
