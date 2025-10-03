import { Img, makeScene2D, Txt } from "@motion-canvas/2d";
import { all, createRef, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const title = createRef<Txt>();
  const subtitle = createRef<Txt>();
  const brain = createRef<Txt>();

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
      fontSize={76}
      fontWeight={700}
      fill={"#fff"}
      y={-550}
      ref={title}
    >
      Return Early
    </Txt>
  )

  view.add(
    <Txt
      fontSize={48}
      fontWeight={100}
      fill={"#fff"}
      y={-200}
      ref={subtitle}
    ></Txt>
  )

  view.add(
    <Txt
      fontSize={200}
      fontWeight={100}
      fill={"#fff"}
      y={50}
      opacity={0}
      ref={brain}
    >
      🧠
    </Txt>
  )

  yield* title().text("How to do it?", 1)

  yield* waitUntil("showBrain");

  yield* all(
    subtitle().text("Reverse our way of thinking", 1),
    brain().opacity(1, 0.5),
    brain().y(0, 0.5).wait(1),
  )

  yield* brain().scale.x(-1, 0.5)

  yield* waitUntil("end");

  yield* all(
    subtitle().y(-150, 1),
    brain().y(100, 1),
    subtitle().opacity(0, 1),
    brain().opacity(0, 1),
  )
})
