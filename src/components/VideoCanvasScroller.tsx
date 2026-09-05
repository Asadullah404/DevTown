import React, { useEffect, useRef, useState } from 'react'

interface VideoCanvasScrollerProps {
  progress: number // 0.0 to 1.0 representing scroll through the 3D transition area
  mode?: 'sequence1' | 'sequence2' | 'both'
  className?: string
}

export const VideoCanvasScroller: React.FC<VideoCanvasScrollerProps> = ({
  progress,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [loaded, setLoaded] = useState(false)
  const currentFrameRef = useRef<number>(0)

  // Total frames for sequence2 (which contains the portal fly-through into the HUD display frame)
  const totalFrames = 72

  useEffect(() => {
    let isMounted = true
    const loadedImages: HTMLImageElement[] = []
    let loadedCount = 0

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image()
      const frameNum = String(i).padStart(3, '0')
      img.src = `/frames/sequence2/frame_${frameNum}.webp`

      img.onload = () => {
        if (!isMounted) return
        loadedCount++
        if (loadedCount >= 10 && !loaded) {
          // As soon as first few frames are ready, enable rendering
          setLoaded(true)
        }
      }
      loadedImages.push(img)
    }

    setImages(loadedImages)

    return () => {
      isMounted = false
    }
  }, [])

  // Draw current frame on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || images.length === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Map progress (0 to 1) to frame index
    const clampedProgress = Math.max(0, Math.min(1, progress))
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.floor(clampedProgress * (totalFrames - 1))
    )

    currentFrameRef.current = frameIndex
    const img = images[frameIndex]

    if (img && img.complete && img.naturalWidth > 0) {
      // Cover fit logic
      const cw = canvas.width
      const ch = canvas.height
      const iw = img.naturalWidth
      const ih = img.naturalHeight

      const scale = Math.max(cw / iw, ch / ih)
      const sw = iw * scale
      const sh = ih * scale
      const sx = (cw - sw) / 2
      const sy = (ch - sh) / 2

      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, sx, sy, sw, sh)
    }
  }, [progress, images])

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight

      // Redraw current frame
      if (images.length > 0) {
        const ctx = canvas.getContext('2d')
        const img = images[currentFrameRef.current]
        if (ctx && img && img.complete) {
          const cw = canvas.width
          const ch = canvas.height
          const iw = img.naturalWidth
          const ih = img.naturalHeight
          const scale = Math.max(cw / iw, ch / ih)
          const sw = iw * scale
          const sh = ih * scale
          const sx = (cw - sw) / 2
          const sy = (ch - sh) / 2
          ctx.drawImage(img, sx, sy, sw, sh)
        }
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [images])

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: loaded ? 1 : 0.8 }}
      />
      {/* Subtle vignette and dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070a12]/70 via-transparent to-[#070a12] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070a12]/60 via-transparent to-[#070a12]/60 pointer-events-none" />
    </div>
  )
}
