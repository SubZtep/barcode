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
    <div
      class={css`
        text-align: center;
      `}
    >
      <img
        ref={barcode}
        class={css`
          width: 60%;
          opacity: 0.8;
        `}
      />
      <p>
        <a
          href="https://lindell.me/JsBarcode/generator/"
          rel="noopener noreferrer"
          target="_blank"
          class={css`
            color: var(--color);
            font-size: 2rem;
            padding: 1rem;
            text-align: center;
            display: block;
          `}
        >
          Click here to open the Barcode generator example webapp &gt;
        </a>
      </p>
    </div>
  )
}

export default Make
