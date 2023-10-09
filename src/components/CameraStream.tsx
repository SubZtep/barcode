import { css } from "@emotion/css"
import { createEffect, type ParentComponent, onMount, onCleanup, createSignal } from "solid-js"

const CameraStream: ParentComponent<{
  enabled: boolean
  onStart?: (video: HTMLVideoElement) => void
  onStop?: () => void
}> = props => {
  let video: HTMLVideoElement | undefined
  let mediaStream: MediaStream | null = null
  let barcodeDetector: Record<any, any>
  let interval: number
  const [result, setResult] = createSignal("Hello")

  const videoLoaded = () => {
    document.body.style.setProperty("--input-aspect-ratio", String(video!.videoWidth / video!.videoHeight))
    // setState({ input: { width: video!.clientWidth, height: video!.clientHeight } })
  }

  onMount(async () => {
    video!.addEventListener("loadedmetadata", videoLoaded)

    if ("BarcodeDetector" in window) {
      // @ts-ignore
      barcodeDetector = new BarcodeDetector({
        // @ts-ignore
        // formats: ["code_39", "code_128", "codabar", "ean_13", "qr_code"],
        formats: await BarcodeDetector.getSupportedFormats(),
      });
    }
  })

  onCleanup(() => {
    video!.removeEventListener("loadedmetadata", videoLoaded)
  })

  createEffect(async () => {
    if (props.enabled) {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      })
      video!.srcObject = mediaStream

      props.onStart?.(video!)

      interval = setInterval(async () => {
        const barcodes = await barcodeDetector?.detect(video);
        if (barcodes.length <= 0) return;
        setResult(barcodes.map(barcode => barcode.rawValue));
      }, 1000)

    } else {
      clearInterval(interval)
      props.onStop?.()
      video!.srcObject = null
      mediaStream?.getTracks().forEach(track => {
        if (track.readyState === "live") {
          track.stop()
        }
      })
      mediaStream = null
    }
  })

  onCleanup(() => {
    if (props.enabled) {
      props.onStop?.()
    }
  })

  return (
    <>
    <video
      ref={video}
      playsinline
      autoplay
      muted
      // @ts-ignore
      disablePictureInPicture={true}
      class={css`
        height: 480px;
        max-width: 100%;
        background: red;
      `}
    ></video>
    <br />
    {result()}
    </>
  )
}

export default CameraStream
