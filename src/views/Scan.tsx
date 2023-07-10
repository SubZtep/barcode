import { Show, createSignal, For } from "solid-js"

function Scan() {
  const [error, setError] = createSignal<string>("")
  const [formats, setFormats] = createSignal<string[]>([])

  if ("BarcodeDetector" in window) {
    // @ts-ignore
    BarcodeDetector.getSupportedFormats().then(formats => {
      setFormats(formats)
    })
  } else {
    setError("Barcode Detector is not supported by this browser.")
  }

  return (
    <div>
      <h1>Scan</h1>

      <Show when={error()}>
        <p>{error()}</p>
      </Show>

      <Show when={Array.isArray(formats())}>
        <ul>
          <For each={formats()}>{format => <li>{format}</li>}</For>
        </ul>
      </Show>
    </div>
  )
}

export default Scan
