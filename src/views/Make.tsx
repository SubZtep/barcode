import JsBarcode from "jsbarcode"
import { onMount } from "solid-js"
import { css } from "@emotion/css"

function Make() {
  let barcode: HTMLImageElement | undefined

  onMount(() => {
    if (barcode) {
      JsBarcode(barcode, "Hello World!")
    }
  })

  return (
    <div>
      <h1>Make</h1>
      <img
        ref={barcode}
        class={css`
          width: 100%;
        `}
      />
      <p>
        <a href="https://lindell.me/JsBarcode/generator/" rel="noopener noreferrer" class={css`color: var(--color);`}>
          Go to the Barcode generator example webapp &gt;
        </a>
      </p>
    </div>
  )
}

export default Make
