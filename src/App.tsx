import { createSignal } from "solid-js"
import { Dynamic } from "solid-js/web"
import { css } from "@emotion/css"
import Make from "./views/Make"
import Scan from "./views/Scan"

const active = css`
  div {
    scale: 1.4;
    translate: 0 -2px;
    color: limegreen;
  }
`

function App() {
  const [view, setView] = createSignal<"Make" | "Scan">("Make")
  const views = { Make, Scan }

  return (
    <>
      <Dynamic component={views[view()]} />

      <button classList={{ [active]: view() === "Make" }} onClick={() => setView("Make")} disabled={view() === "Make"}>
        <div>Make</div>
      </button>
      <button classList={{ [active]: view() === "Scan" }} onClick={() => setView("Scan")} disabled={view() === "Scan"}>
        <div>Scan</div>
      </button>
    </>
  )
}

export default App
