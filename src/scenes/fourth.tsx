import { Code, CODE, Img, lines, makeScene2D, Txt, word } from "@motion-canvas/2d";
import { all, createRef, DEFAULT, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const CFirst = CODE`\
    async function checkout(data: Checkout) {
      if (data.total) {
        if (data.total <= 0) {
          console.error("Invalid total")
        } else {
          /* Check card validity */
          if (data.card) {
            await pay({
              total: data.total,
              card: data.card
            });
          } else {
            console.error("No card provided")
          }
        }
      } else {
        console.error("No total provided")
      }
    }
  `

  const CSecond = CODE`\
    async function checkout(data: Checkout) {
      if (!data.total) {
        console.error("No total provided")
        return
      }

      if (data.total <= 0) {
        console.error("Invalid total")
      } else {
        /* Check card validity */
        if (data.card) {
          await pay({
            total: data.total,
            card: data.card
          });
        } else {
          console.error("No card provided")
        }
      }
    }
  `

  const CThird = CODE`\
    async function checkout(data: Checkout) {
      if (!data.total) {
        console.error("No total provided")
        return
      }

      if (data.total <= 0) {
        console.error("Invalid total")
        return
      }

      /* Check card validity */
      if (data.card) {
        await pay({
          total: data.total,
          card: data.card
        });
      } else {
        console.error("No card provided")
      }
    }
  `

  const CFourth = CODE`\
    async function checkout(data: Checkout) {
      if (!data.total) {
        console.error("No total provided")
        return
      }

      if (data.total <= 0) {
        console.error("Invalid total")
        return
      }

      if (!data.card) {
        console.error("No card provided")
        return 
      }
      
      /* Proceed to payment */
      await pay({
        total: data.total,
        card: data.card
      });
    }
  `

  const code = createRef<Code>();
  const title = createRef<Txt>();

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
      How to do it?
    </Txt>
  )

  view.add(
    <Code
      fontSize={28}
      fill={"#ddd"}
      fontFamily={"Fira Code"}
      opacity={0}
      middle={[-30, 0]}
      ref={code}
      code={CFirst}
    />
  );

  yield* code().opacity(1, 0.5);

  yield* waitUntil("selectFirstBlock");

  yield* code().selection(lines(1,17), 0.5);

  yield* waitUntil("changeFirstBlock");

  yield* all(
    code().code(CSecond, 1),
    code().selection(lines(1,4), 0.5)
  )

  yield* waitUntil("deselectFirstBlock");

  yield* code().selection(DEFAULT, 0.5);

  yield* waitUntil("selectSecondBlock");

  yield* code().selection(
    code().findAllRanges(/if\s*\(data\.total\s*<=\s*0\)\s*\{[\s\S]*?\}/g),
    0.5,
  ).wait(1);

  yield* code().selection(DEFAULT, 0.5)

  yield* waitUntil("changeSecondBlock");

  yield* all(
    code().code(CThird, 1),
  )

  yield* waitUntil("selectThirdBlock");

  yield* code().selection(lines(11,19), 0.5);

  yield* waitUntil("changeThirdBlock");

  yield* all(
    code().code(CFourth, 1),
    code().selection(lines(11, 14), 0.5)
  )

  yield* waitUntil("deselectThirdBlock");

  yield* code().selection(DEFAULT, 0.5);

  yield* waitUntil("selectLastBlock");

  yield* code().selection(lines(16,20), 0.5).wait(1.5);

  yield* code().selection(DEFAULT, 0.5);

  yield* waitUntil("startSelections");

  yield* code().selection(lines(1,4), 0.5).wait(1);
  yield* code().selection(lines(6,9), 0.5).wait(1);
  yield* code().selection(lines(11,14), 0.5).wait(0.5);
  yield* code().selection(DEFAULT, 0.5);

  yield* waitUntil("end");

  yield* all(
    code().opacity(0, 0.5),
    title().opacity(0, 0.5),
  )
});
