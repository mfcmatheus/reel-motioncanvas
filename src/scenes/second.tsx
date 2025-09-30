import { Img, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, createRef, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const heading = createRef<Txt>();
  const title = createRef<Txt>();
  const subtitle = createRef<Txt>();

  const block1 = createRef<Rect>();
  const block2 = createRef<Rect>();
  const block3 = createRef<Rect>();
  const block4 = createRef<Rect>();
  const block5 = createRef<Rect>();

  view.add(
    <Img
      src={"../../images/Background.png"}
      width={1080}
      height={1920}
      zIndex={-10}
    />
  )

  view.add(
    <Txt
      fontSize={50}
      fontWeight={100}
      fill={"#ddd"}
      y={-800}
      opacity={0}
      ref={heading}
    >
      What we did?
    </Txt>
  )

  view.add(
    <Txt
      fontSize={100}
      fontWeight={700}
      fill={"#fff"}
      y={-700}
      ref={title}
    >
    </Txt>
  )

  view.add(
    <Txt
      fontSize={60}
      fontWeight={100}
      fill={"#fff"}
      y={-450}
      ref={subtitle}
    ></Txt>
  )

  view.add(
    <Rect
      y={-300}
      x={-200}
      width={0}
      opacity={0}
      offset={[-1, 0]}
      height={30}
      radius={15}
      fill="#525252"
      ref={block1}
    />
  )

  view.add(
    <Rect
      y={-200}
      x={0}
      width={0}
      opacity={0}
      offset={[-1, 0]}
      height={30}
      radius={15}
      fill="#525252"
      ref={block2}
    />
  )

  view.add(
    <Rect
      y={-100}
      x={-100}
      width={0}
      opacity={0}
      offset={[-1, 0]}
      height={30}
      radius={15}
      fill="#525252"
      ref={block3}
    />
  )

  view.add(
    <Rect
      y={0}
      x={-50}
      width={0}
      opacity={0}
      offset={[-1, 0]}
      height={30}
      radius={15}
      fill="#525252"
      ref={block4}
    />
  )

  view.add(
    <Rect
      y={100}
      x={-150}
      width={0}
      opacity={0}
      offset={[-1, 0]}
      height={30}
      radius={15}
      fill="#525252"
      ref={block5}
    />
  )

  yield* heading().opacity(1, 0.5)
  yield* title().text('Return Early', 1.5)

  yield* waitUntil("startAnimation");

  yield* all(
    block1().width(300, 0.5),
    block1().opacity(1, 0.5),
  )

  yield* all(
    block2().width(300, 0.5),
    block2().opacity(1, 0.5),
  )

  yield* all(
    block3().width(300, 0.5),
    block3().opacity(1, 0.5),
  )

  yield* all(
    block4().width(300, 0.5),
    block4().opacity(1, 0.5),
  )

  yield* all(
    block5().width(300, 0.5),
    block5().opacity(1, 0.5),
  )

  yield* waitUntil("showSubtitle");

  yield* subtitle().text("Hard to read", 1)

  yield* waitUntil("changeColors");

  yield* all(
    block1().fill("#FF0000", 0.5).back(1),
    block2().fill("#FF0000", 0.5).back(1),
    block3().fill("#FF0000", 0.5).back(1),
    block4().fill("#FF0000", 0.5).back(1),
    block5().fill("#FF0000", 0.5).back(1)
  )

  yield* all(
    block1().fill("#FF0000", 1.5),
    block2().fill("#FF0000", 1.5),
    block3().fill("#FF0000", 1.5),
    block4().fill("#FF0000", 1.5),
    block5().fill("#FF0000", 1.5)
  )

  yield* all(
    block1().fill("#820000", 0.5),
    block2().fill("#820000", 0.5),
    block3().fill("#820000", 0.5),
    block4().fill("#820000", 0.5),
    block5().fill("#820000", 0.5)
  )

  yield* waitUntil("accomplish");

  yield* all(
    block1().fill("#525252", 0.5),
    block2().fill("#525252", 0.5),
    block3().fill("#525252", 0.5),
    block4().fill("#525252", 0.5),
    block5().fill("#525252", 0.5)
  )

  yield* all(
    block1().x(-200, 1),
    block2().x(-100, 1),
    block3().x(-200, 1),
    block4().x(-200, 1),
    block4().width(0, 1),
    block5().x(-200, 1),
    block5().width(150, 1),
  )

  yield* waitUntil("colorChange");

  yield* all(
    block1().fill("#00bd00", 0.5).back(1),
    block2().fill("#00bd00", 0.5).back(1),
    block3().fill("#00bd00", 0.5).back(1),
  )

  yield* all(
    block1().fill("#00bd00", 0.5).back(1),
    block2().fill("#00bd00", 0.5).back(1),
    block3().fill("#00bd00", 0.5).back(1),
  )

  yield* waitUntil("functionExecution");

  yield* block5().fill("#cfcfcf", 0.5).back(1)
  yield* block5().fill("#cfcfcf", 0.5).back(1)

  yield* all(
    heading().opacity(0, 0.75),
    subtitle().opacity(0, 0.75),
    block1().opacity(0, 0.75),
    block2().opacity(0, 0.75),
    block3().opacity(0, 0.75),
    block4().opacity(0, 0.75),
    block5().opacity(0, 0.75),
  )
})
