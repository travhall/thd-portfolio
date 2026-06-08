"use client";

// ─────────────────────────────────────────────────────────────────────────────
// GooeyImage — Two-image WebGL card with reveal-wipe hover effect.
//
// Faithful port of the Tympanus / Aqro gooey-hover-codrops "reveal" shader
// (revealShader.glsl) adapted for OGL. Three layered effects:
//
//  1. Reveal wipe  — diagonal noise-edged transition from the base image
//     to the hover image as the cursor enters. The wipe advances from the
//     top-right corner and is edge-softened by 3D simplex noise.
//
//  2. Silhouette morph — the card boundary is a feathered rounded-rect
//     (sqr) minus a cursor-following metaball (c). At rest: perfect sharp
//     rectangle. On hover: corners feather inward; a soft dent follows the
//     cursor around the edge. Matches the Tympanus card silhouette exactly.
//
//  3. Flowmap trail — OGL Flowmap accumulates cursor velocity for a
//     lingering cursor-directed displacement + chromatic aberration that
//     fades when the cursor stops.
//
// Both images use object-cover / object-top UV mapping, aspect-corrected
// per-canvas via the uRatio / uHoverRatio uniforms (same getRatio() helper
// as the Tympanus Three.js implementation).
// ─────────────────────────────────────────────────────────────────────────────

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

// ── Vertex shader ─────────────────────────────────────────────────────────────

const VERT = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// ── 3-D simplex noise (Ashima / Stefan Gustavson) ─────────────────────────────

const SNOISE = /* glsl */ `
  vec3 _s289v3(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 _s289v4(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 _sperm(vec4 x){return _s289v4(((x*34.0)+1.0)*x);}
  vec4 _sisq(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=_s289v3(i);
    vec4 p=_sperm(_sperm(_sperm(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
      +i.y+vec4(0.0,i1.y,i2.y,1.0))
      +i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=_sisq(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`;

// ── Fragment shader ───────────────────────────────────────────────────────────

const FRAG = /* glsl */ `
  precision highp float;

  uniform sampler2D tMap;         /* base image                                */
  uniform sampler2D tHoverMap;    /* hover image                               */
  uniform sampler2D tFlow;        /* OGL Flowmap (rg=velocity, b=trail)        */
  uniform vec2  uRes;             /* canvas size in CSS pixels                 */
  uniform vec2  uRatio;           /* object-cover ratio for base image         */
  uniform vec2  uHoverRatio;      /* object-cover ratio for hover image        */
  uniform vec2  uMouseCard;       /* smoothed cursor in card UV [0,1]          */
  uniform float uStrength;        /* flowmap displacement scale                */
  uniform float uTime;            /* wall-clock seconds (reserved)             */
  uniform float uMotionTime;      /* advances only while cursor moves          */
  uniform float uProgressHover;   /* 0=rest, 1=hovered, lerped in RAF tick     */
  uniform float uIntensity;       /* silhouette morph scale (default 0.4)      */

  varying vec2 vUv;

  ${SNOISE}

  /* Soft radial falloff -- same helper used in Tympanus gooey shaders */
  float circle(vec2 st, float r, float blur) {
    return 1.0 - smoothstep(r - r * blur, r + r * blur, dot(st, st) * 4.0);
  }

  void main() {
    /* Flowmap ---------------------------------------------------------------- */
    vec3 flow = texture2D(tFlow, vUv).rgb;

    /* Base image UV: object-cover top-aligned, mouse parallax, flowmap ------ */
    vec2 uv = (vUv - 0.5) * (1.0 - uProgressHover * 0.2) * uRatio + 0.5;
    uv.y -= (1.0 - uRatio.y) * 0.5;                       /* object-top        */
    uv   += (uMouseCard - 0.5) * 0.05 * uProgressHover;   /* cursor parallax   */
    uv   += flow.rg * uStrength * flow.b;                  /* flowmap trail     */

    /* Hover image UV: object-cover top-aligned, flowmap --------------------- */
    vec2 uv_h = (vUv - 0.5) * (1.0 - uProgressHover * 0.1) * uHoverRatio + 0.5;
    uv_h.y -= (1.0 - uHoverRatio.y) * 0.5;
    uv_h   += flow.rg * uStrength * flow.b;

    /* Sample base with chromatic aberration on the cursor trail ------------- */
    float chroma = flow.b * 0.006;
    vec2  cdir   = normalize(flow.rg + vec2(0.0001));
    float r = texture2D(tMap, clamp(uv + cdir * chroma, 0.002, 0.998)).r;
    float g = texture2D(tMap, clamp(uv,                 0.002, 0.998)).g;
    float b = texture2D(tMap, clamp(uv - cdir * chroma, 0.002, 0.998)).b;
    vec4  base  = vec4(r, g, b, 1.0);
    vec4  hover = texture2D(tHoverMap, clamp(uv_h, 0.002, 0.998));

    /* Reveal wipe: diagonal noise-edged transition (revealShader.glsl) ------ */
    /* The wipe sweeps from top-right to bottom-left as uProgressHover rises.  */
    float t     = uMotionTime * 0.5;
    float noise = snoise(vec3(vUv.x + vUv.y, vUv.y - vUv.x, t) * 8.0) * 0.5;
    float sweep = (vUv.x + vUv.y - 2.0 + uProgressHover * 2.7) * 2.0;
    float pct   = smoothstep(0.99, 1.0, noise + sweep);
    vec4  color = mix(base, hover, pct);

    /* Silhouette morph: feathered rect minus cursor metaball dent ----------- */
    /* morph = ph * intensity (same scaling as Tympanus u_intensity).         */
    /* With intensity=0.4: grd=0.04 at full hover -- subtle corner softening. */
    float morph = uProgressHover * uIntensity;
    float grd   = max(0.0001, 0.1 * morph);
    float sqr   = 100.0 * (
      (smoothstep(0.0, grd, vUv.x) - smoothstep(1.0 - grd, 1.0, vUv.x)) *
      (smoothstep(0.0, grd, vUv.y) - smoothstep(1.0 - grd, 1.0, vUv.y))
    ) - 10.0;
    /* Cursor dent -- aspect-corrected distance from cursor to pixel.         */
    /* Dents the silhouette inward toward the cursor at the card edge.        */
    float ar   = uRes.y / uRes.x;
    vec2  cpos = (vUv - uMouseCard) * vec2(1.0, ar);
    float c    = circle(cpos, 0.04 * morph, 2.0) * 50.0;
    float mask = smoothstep(0.0, 0.1, sqr - c);

    gl_FragColor = vec4(color.rgb, mask);
  }
`;

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Same getRatio() used in the Tympanus Three.js implementation.
 *  Returns [rx, ry] such that (uv - 0.5) * ratio + 0.5 gives object-cover UVs. */
function getRatio(
  cw: number, ch: number,
  iw: number, ih: number,
): [number, number] {
  const cAR = cw / ch, iAR = iw / ih;
  return [Math.min(cAR / iAR, 1), Math.min(iAR / cAR, 1)];
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface GooeyImageHandle {
  /** Feed cursor position (card UV [0,1]) + pixel deltas from onMouseMove. */
  updateMouse(normX: number, normY: number, dx: number, dy: number): void;
  /** Signal hover enter/leave -- animates uProgressHover 0 to 1. */
  setHover(isHovered: boolean): void;
}

interface GooeyImageProps {
  /** Base image (shown at rest). */
  src: string;
  /** Hover image (revealed on hover via wipe transition). Falls back to src. */
  hoverSrc?: string;
  /** OGL Flowmap dissipation -- closer to 1 = slower trail. Default 0.96. */
  dissipation?: number;
  /** Flowmap displacement scale (UV units). Default 0.08. */
  strength?: number;
  /** OGL Flowmap stamp radius. Default 0.35. */
  falloff?: number;
  /** Silhouette morph scale (0-1+). Controls corner feathering and cursor
   *  dent size. Matches Tympanus u_intensity. Default 0.4. */
  intensity?: number;
  /** Called once when the WebGL canvas is ready (both images loaded). */
  onReady?: () => void;
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export const GooeyImage = forwardRef<GooeyImageHandle, GooeyImageProps>(
  function GooeyImage(
    {
      src,
      hoverSrc,
      dissipation = 0.96,
      strength    = 0.08,
      falloff     = 0.35,
      intensity   = 0.4,
      onReady,
      className   = "",
    },
    ref,
  ) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ready, setReady] = useState(false);

    const rafRef = useRef(0);
    const glRef  = useRef<{
      flowmap: any;
      program: any;
      renderer: any;
      Vec2: any;
      baseDims: { w: number; h: number };
      hoverDims: { w: number; h: number };
    } | null>(null);

    // Mouse / velocity state (card UV [0,1])
    const mouseRef = useRef({ x: -1, y: -1 });
    const velRef   = useRef({ x: 0, y: 0 });
    const hasMoved = useRef(false);

    // Hover progress -- lerped each RAF tick
    const hoverProgressRef = useRef(0);
    const targetHoverRef   = useRef(0);

    // Smoothed mouse for shape morph -- epsilon-snapped so the boundary
    // freezes completely when the cursor is still.
    const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });

    // Motion-gated watery clock -- advances only while cursor is moving,
    // coasts ~1.7s then freezes. Drives reveal-wipe noise edge.
    const motionDecayRef = useRef(0);
    const motionTimeRef  = useRef(0);

    // ── Imperative handle ─────────────────────────────────────────────────────
    useImperativeHandle(ref, () => ({
      updateMouse(normX, normY, dx, dy) {
        mouseRef.current = { x: normX, y: normY };
        velRef.current   = { x: dx * 0.001, y: dy * 0.001 };
        hasMoved.current = true;
      },
      setHover(isHovered) {
        targetHoverRef.current = isHovered ? 1 : 0;
        if (!isHovered) mouseRef.current = { x: -1, y: -1 };
      },
    }));

    // ── WebGL init ────────────────────────────────────────────────────────────
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      let dead = false;
      let roCleanup: (() => void) | undefined;
      let pendingW = 0, pendingH = 0, pendingResize = false;

      async function init() {
        const { Renderer, Program, Mesh, Triangle, Texture, Flowmap, Vec2 } =
          await import("ogl");
        if (dead) return;

        const el     = canvas!;
        const parent = el.parentElement!;
        const w = parent.offsetWidth  || 1;
        const h = parent.offsetHeight || 1;

        const renderer = new Renderer({
          canvas: el,
          dpr: Math.min(window.devicePixelRatio, 2),
          alpha: true,
          premultipliedAlpha: false,
        });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        renderer.setSize(w, h);

        // Two textures: base + hover
        const makeTexture = () => new Texture(gl, {
          minFilter: gl.LINEAR,
          magFilter: gl.LINEAR,
          generateMipmaps: false,
        });
        const texBase  = makeTexture();
        const texHover = makeTexture();

        const flowmap = new Flowmap(gl, { falloff, alpha: 1.0, dissipation });
        flowmap.aspect = w / h;

        const program = new Program(gl, {
          vertex:   VERT,
          fragment: FRAG,
          uniforms: {
            tMap:           { value: texBase },
            tHoverMap:      { value: texHover },
            tFlow:          { value: flowmap.uniform.value },
            uRes:           { value: new Vec2(w, h) },
            uRatio:         { value: new Vec2(1, 1) },
            uHoverRatio:    { value: new Vec2(1, 1) },
            uMouseCard:     { value: new Vec2(0.5, 0.5) },
            uStrength:      { value: strength },
            uIntensity:     { value: intensity },
            uTime:          { value: 0 },
            uMotionTime:    { value: 0 },
            uProgressHover: { value: 0 },
          },
        });

        const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
        glRef.current = {
          flowmap, program, renderer, Vec2,
          baseDims:  { w: 1, h: 1 },
          hoverDims: { w: 1, h: 1 },
        };

        // Load both images; fire onReady once both are loaded
        let loaded = 0;
        const checkReady = () => {
          if (++loaded >= 2 && !dead) {
            setReady(true);
            onReady?.();
          }
        };
        const loadImg = (
          url: string,
          tex: any,
          dimsKey: "baseDims" | "hoverDims",
          ratioKey: "uRatio" | "uHoverRatio",
        ) => {
          const img = new window.Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            if (dead) return;
            tex.image = img;
            const state = glRef.current!;
            state[dimsKey] = { w: img.naturalWidth, h: img.naturalHeight };
            const [rx, ry] = getRatio(w, h, img.naturalWidth, img.naturalHeight);
            program.uniforms[ratioKey].value.set(rx, ry);
            checkReady();
          };
          img.onerror = checkReady; // don't block on missing hover image
          img.src = url;
        };

        loadImg(src, texBase, "baseDims", "uRatio");
        loadImg(hoverSrc ?? src, texHover, "hoverDims", "uHoverRatio");

        // ResizeObserver -- queued; processed once per RAF tick
        const ro = new ResizeObserver((entries) => {
          const { width, height } = entries[0].contentRect;
          pendingW = width;
          pendingH = height;
          pendingResize = true;
        });
        ro.observe(parent);
        roCleanup = () => ro.disconnect();

        // ── RAF loop ────────────────────────────────────────────────────────
        function tick() {
          if (dead) return;
          rafRef.current = requestAnimationFrame(tick);

          // Process deferred resize once per frame
          if (pendingResize) {
            pendingResize = false;
            renderer.setSize(pendingW, pendingH);
            program.uniforms.uRes.value.set(pendingW, pendingH);
            flowmap.aspect = pendingW / pendingH;
            // Recompute cover ratios for new canvas size
            const state = glRef.current!;
            const [brx, bry] = getRatio(pendingW, pendingH, state.baseDims.w, state.baseDims.h);
            const [hrx, hry] = getRatio(pendingW, pendingH, state.hoverDims.w, state.hoverDims.h);
            program.uniforms.uRatio.value.set(brx, bry);
            program.uniforms.uHoverRatio.value.set(hrx, hry);
          }

          // Hover progress (exponential ease)
          const hp  = hoverProgressRef.current;
          const ht  = targetHoverRef.current;
          const spd = ht > hp ? 0.06 : 0.04;
          hoverProgressRef.current = hp + (ht - hp) * spd;
          program.uniforms.uProgressHover.value = hoverProgressRef.current;

          // Smooth mouse for silhouette morph -- epsilon snap to freeze when parked
          if (mouseRef.current.x >= 0) {
            const sdx = mouseRef.current.x - smoothMouseRef.current.x;
            const sdy = mouseRef.current.y - smoothMouseRef.current.y;
            if (Math.abs(sdx) > 0.0005 || Math.abs(sdy) > 0.0005) {
              smoothMouseRef.current.x += sdx * 0.14;
              smoothMouseRef.current.y += sdy * 0.14;
              program.uniforms.uMouseCard.value.set(
                smoothMouseRef.current.x,
                smoothMouseRef.current.y,
              );
            }
          }

          // Flowmap
          const mx = mouseRef.current.x;
          const my = mouseRef.current.y;
          flowmap.mouse.set(mx >= 0 ? mx : -1, my >= 0 ? my : -1);

          if (hasMoved.current) {
            flowmap.velocity.set(velRef.current.x, velRef.current.y);
            motionDecayRef.current = 1.0;
            hasMoved.current = false;
          } else {
            flowmap.velocity.set(0, 0);
          }

          // Motion clock -- drains ~1.7s after last cursor move
          if (motionDecayRef.current > 0) {
            motionDecayRef.current = Math.max(0, motionDecayRef.current - 0.025);
            motionTimeRef.current += (1 / 60) * motionDecayRef.current;
          }

          flowmap.update();
          program.uniforms.tFlow.value       = flowmap.uniform.value;
          program.uniforms.uTime.value       = performance.now() * 0.001;
          program.uniforms.uMotionTime.value = motionTimeRef.current;

          gl.clear(gl.COLOR_BUFFER_BIT);
          renderer.render({ scene: mesh });
        }

        rafRef.current = requestAnimationFrame(tick);
      }

      init().catch(console.error);

      return () => {
        dead = true;
        cancelAnimationFrame(rafRef.current);
        roCleanup?.();
      };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Hot-swap images (src / hoverSrc prop changes) ─────────────────────────
    useEffect(() => {
      const state = glRef.current;
      if (!state || !src) return;
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        state.program.uniforms.tMap.value.image = img;
        state.baseDims = { w: img.naturalWidth, h: img.naturalHeight };
        const res = state.program.uniforms.uRes.value;
        const [rx, ry] = getRatio(res.x, res.y, img.naturalWidth, img.naturalHeight);
        state.program.uniforms.uRatio.value.set(rx, ry);
      };
      img.src = src;
    }, [src]);

    useEffect(() => {
      const state = glRef.current;
      const url = hoverSrc ?? src;
      if (!state || !url) return;
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        state.program.uniforms.tHoverMap.value.image = img;
        state.hoverDims = { w: img.naturalWidth, h: img.naturalHeight };
        const res = state.program.uniforms.uRes.value;
        const [rx, ry] = getRatio(res.x, res.y, img.naturalWidth, img.naturalHeight);
        state.program.uniforms.uHoverRatio.value.set(rx, ry);
      };
      img.src = url;
    }, [hoverSrc, src]);

    // ── Render ────────────────────────────────────────────────────────────────
    return (
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={className}
        style={{
          position:      "absolute",
          inset:         0,
          width:         "100%",
          height:        "100%",
          opacity:       ready ? 1 : 0,
          transition:    "opacity 0.5s ease",
          pointerEvents: "none",
        }}
      />
    );
  },
);
