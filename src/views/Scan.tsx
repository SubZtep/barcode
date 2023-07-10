import { Show, createSignal, For, onMount } from "solid-js"

function Scan() {
  const [formats, setFormats] = createSignal<string[]>([])

  onMount(async () => {
    // @ts-ignore
    setFormats(await BarcodeDetector.getSupportedFormats())
  })

  return (
    <div>
      <h1>Scan</h1>

      <Show when={Array.isArray(formats())}>
        <ul>
          <For each={formats()}>{format => <li>{format}</li>}</For>
        </ul>
      </Show>
    </div>
  )
}

export default Scan
