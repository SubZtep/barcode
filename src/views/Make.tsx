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
      <img ref={barcode} class={css`width: 100%;`} />
    </div>
  )
}

export default Make
