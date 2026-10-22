# 3D Graphics From Scratch

A small 3D rendering engine written from scratch in **vanilla JavaScript and WebGL2** — no Three.js, no Babylon, no math libraries, no build step.

I built it to understand what actually happens between "I have some vertices" and "there is a model on my screen". Inspired by the linear algebra I studied at university and a YouTube video on 3D rendering, I decided to stop treating the graphics pipeline as a black box and implement every piece myself: the matrix math, the camera, the model transformations, the OBJ loader, and the render loop.

<!-- TODO: add a screenshot or GIF here, e.g. ![demo](docs/demo.gif) -->

## Project goals

- **Learn how 3D rendering really works** — understand the pipeline instead of calling a library that hides it.
- **Implement the math myself** — matrix multiplication, rotation / scale / translation matrices, view and perspective projection, all written by hand.
- **Use WebGL2 at a low level** — shaders, buffers, VAOs, uniforms and the depth test, with no abstraction layer in between.
- **Make it reusable** — not a hard-coded demo, but a small engine: import a model, create an `Engine`, and manipulate the scene through a simple API.

## Features

- **Hand-written math library** — 3×3 and 4×4 matrix operations, X/Y/Z rotation matrices, scale and translation matrices.
- **Full MVP pipeline** — Model → View → Projection matrices combined per object and passed to the vertex shader as a single `u_mvp` uniform.
- **Perspective camera** — configurable position, rotation, field of view, near/far planes; view and projection matrices are cached and recalculated only when something changes.
- **`.obj` model loading** — a custom parser reads vertices and faces from Wavefront `.obj` files and triangulates polygons (triangle fan), so quads and n-gons work too.
- **Model pivots** — choose where an object rotates and scales around: `origin`, `center`, `bottom` or `up`, computed automatically from the mesh bounding box.
- **Asset registry** — meshes and models are loaded once and shared between any number of scene objects (a map of 2500 cubes reuses a single GPU buffer).
- **Scene API** — `Object3d` instances with position, rotation, scale and colour, which you can add, remove or move around at runtime.
- **Ready-made maps** — a `MapManager` that stores named scenes (maps), switches between them at runtime and lets you register your own. A flat 50×50 cubic floor is included.
- **Input handling** — keyboard and mouse controls with rebindable keys, a free-fly camera mode and an object-manipulation mode.
- **Depth-tested rendering** — WebGL2 with GLSL ES 3.00 shaders and flat per-object colours.

## Getting started

The project uses ES modules and `fetch` to load `.obj` files, so it has to be served over HTTP (opening `index.html` directly from disk will not work).

```bash
git clone https://github.com/jozipa/3d_graphics_from_scratch.git
cd 3d_graphics_from_scratch

# any static server works, for example:
python -m http.server 8000
# or
npx serve
```

Then open `http://localhost:8000` in a browser with WebGL2 support (any recent Chrome, Firefox, Edge or Safari). VS Code's *Live Server* extension works too.

## Controls

**Free camera mode** (default)

| Input | Action |
| --- | --- |
| `W` `A` `S` `D` / arrow keys | Rotate the camera |
| `Shift` + `W` `A` `S` `D` / arrows | Move the camera forward / back / sideways |
| `Shift` + `Space` / `Shift` + `Tab` | Move the camera up / down |
| Mouse wheel | Zoom (moves the camera along Z) |

**Object mode** (camera stays still, keyboard controls the selected object)

| Input | Action |
| --- | --- |
| `W` `A` `S` `D` / arrow keys | Rotate the selected object |
| `Shift` + `W` `A` `S` `D` / arrows | Move the selected object |
| `Shift` + `Space` / `Shift` + `Tab` | Move the object up / down |

**Mouse** (on the selected object): hold the **left button** and drag to rotate, hold the **right button** and drag to move.

Key bindings are not hard-coded — they can be changed at runtime through `KeyboardActionsManager` (`setActionKey`, `addActionKey`, `deleteActionKey`).

## Using the engine

```js
import { Engine } from "./src/Engine.js";

const engine = new Engine({
    canvasId: "game",   // id of the <canvas> element
    width: 860,
    height: 480
});

engine.init();          // starts the render loop with the default cube and the flat map
```

### Loading your own `.obj` model

```js
// load_newOBJ_object(meshName, modelName, url, pivotType)
const tree = await engine.assets.load_newOBJ_object(
    "tree", "tree", "./models/ObjFiles/model.obj", "bottom"
);

engine.scene.add_object(tree);                 // put it in the scene
engine.input.mouse.setTargetElement(tree);     // control it with the mouse
```

### Manipulating objects

```js
tree.move(1, 0, 0);          // translate by (dx, dy, dz)
tree.rotate(0, Math.PI, 0);  // rotate by (dx, dy, dz) radians
tree.setPosition(0, 2, -5);  // absolute position

engine.scene.delete_object(tree);
```

### Creating your own object from a loaded model

```js
import { Object3d } from "./src/objectsHandler/Object3d.js";

//                         model                 colour    x  y  z   rx ry rz  sx sy sz
const box = new Object3d(engine.assets.models.cube, "#ff8800", 0, 1, -3, 0, 0, 0, 2, 1, 1);
engine.scene.add_object(box);
```

### Maps (scenes)

```js
// register a map: just an array of Object3d
engine.mapManager.newMap("myMap", [box, tree]);

// switch to it at runtime
engine.mapManager.changeMap("myMap");
```

### Camera

```js
engine.camera.setPosition(0, 5, 10);
engine.camera.rotate(-0.3, 0, 0);
engine.camera.changeMode();   // toggle free camera <-> object control
```

## How it works

Every frame, for every object in the scene, the engine builds three matrices and combines them into one:

```
MVP = Projection × View × Model
```

- **Model** — `Translation × Rotation × Scale × Pivot`. Places the object in the world; the pivot offset decides which point of the mesh is its "origin".
- **View** — the inverse of the camera's transform: the camera's rotation transposed, with the position rotated and negated. Moves the world so the camera sits at the origin.
- **Projection** — a perspective matrix built from the field of view, aspect ratio and near/far planes.

The result is uploaded as a `u_mvp` uniform and the vertex shader transforms each vertex with it. Matrices are stored row-major, so the shader multiplies as `a_position * u_mvp`. Object and camera matrices are cached with "dirty" flags and recomputed only when something moves.

On the GPU side, each mesh lives in its own **VBO** wrapped in a **VAO**, uploaded once with `STATIC_DRAW` and drawn with `drawArrays(TRIANGLES)`.

## Project structure

```
├── index.html, main.js, style.css   # page and entry point
├── models/
│   ├── objParser.js                 # .obj → vertex array (with triangulation)
│   └── ObjFiles/                    # sample models
├── objectsData/                     # hard-coded primitives (cube, pyramid, house)
└── src/
    ├── Engine.js                    # ties everything together, runs the main loop
    ├── Camera.js                    # camera state + cached view/projection matrices
    ├── GameConfig.js                # canvas and resolution settings
    ├── math/                        # matrices: 3x3, 4x4, MVP, helpers
    ├── renderer/                    # WebGL2 setup, shaders, Mesh (VAO/VBO), render loop
    ├── objectsHandler/              # Assets registry, Model (pivots), Object3d
    ├── sceneHandler/                # Scene, Map, MapManager, map generators
    └── inputMenager/                # keyboard (rebindable actions) and mouse
```

## What I learned

- How the model, view and projection transforms fit together, and why matrix multiplication order matters.
- How WebGL2 actually works under the hood: shader compilation and linking, buffers, VAOs, uniforms, clip space and depth testing.
- Parsing a real file format (Wavefront OBJ) and triangulating arbitrary polygons.
- Structuring a project as a reusable engine with clear responsibilities instead of one big script.

## Ideas for the future

- Lighting and normals (Phong / Blinn-Phong shading)
- Texture and UV support, `.mtl` materials
- Indexed drawing to cut down on duplicated vertices
- Per-object update hooks for animation

## Tech stack

JavaScript (ES modules) · WebGL2 · GLSL ES 3.00 · HTML / CSS
