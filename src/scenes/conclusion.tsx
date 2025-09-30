import { Img, makeScene2D, Path, Rect, Txt } from "@motion-canvas/2d";
import { all, createRef, tween, Vector2, waitFor, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const button = createRef<Rect>();
  const label = createRef<Txt>();
  const tag = createRef<Txt>();
  const hand = createRef<Txt>();
  const share = createRef<Path>();
  const logo = createRef<Img>();

  view.add(
    <>
      <Img
        ref={logo}
        src={"../../images/wrkspace-logo-simplified.png"}
        width={800}
        opacity={0}
        y={-400}
      />

      <Txt
        ref={tag}
        fontSize={48}
        fontWeight={500}
        fill={"#fff"}
        y={-290}
        opacity={0}
      />

      <Rect
        ref={button}
        width={460}
        height={125}
        radius={15}
        fill={"#515ef5"}
        lineWidth={0}
        opacity={0}
        y={0}
        zIndex={0}
      />

      <Path
        ref={share}
        data={"M96.14,12.47l-76.71-1.1,28.3,27.85L96.14,12.47ZM53.27,49l9.88,39.17L102.1,22,53.27,49ZM117,1.6a5.59,5.59,0,0,1,4.9,8.75L66.06,105.21a5.6,5.6,0,0,1-10.44-1.15L41.74,49,1.67,9.57A5.59,5.59,0,0,1,5.65,0L117,1.6Z"}
        scale={0.55}
        fill={"#ffffff"}
        lineWidth={1}
        lineJoin={"round"}
        x={325}
        y={-25}
        opacity={0}
        offset={[1, 0]}
        zIndex={1}
      />

      <Txt
        ref={label}
        fontSize={50}
        fontWeight={500}
        fill={"#fff"}
        y={0}
        opacity={0}
        zIndex={2}
      >
        Follow
      </Txt>

      <Txt
        ref={hand}
        fontSize={140}
        y={-320}
        x={-120}
        fill={"#fff"}
        opacity={0}
        zIndex={3}
      >
        👇🏻
      </Txt>
    </>
  );

  yield* all(
    logo().opacity(1, 0.6),
    button().opacity(1, 0.6),
    label().opacity(1, 0.6),
    share().opacity(1, 0.6),
    tag().opacity(1, 0.6),
    tag().text("@wrkspace.co", 1.5)
  );

  yield* waitUntil("handEnter");

  yield* all(
    hand().opacity(1, 0.4),
    hand().y(-120, 0.4),
    hand().x(-20, 0.4),
  );

  yield* waitUntil("press");

  yield* all(hand().y(-50, 0.15), button().scale(0.95, 0.15));

  yield* all(
    button().scale(1, 0.2),
    hand().y(-120, 0.2),
    hand().x(-20, 0.2),
    button().fill("#fff", 0.6),
    button().lineWidth(6, 0.6),
    label().text("Following", 0.6),
    label().fill("#595959", 0.6),
    hand().opacity(0, 0.3),
  );

  yield* waitUntil("shareTap");

  yield* all(
    hand().opacity(1, 0.3),
    hand().x(310, 0.4),
    hand().y(-120, 0.4),
  );

  yield* all(
    hand().y(-60, 0.15),
    share().scale(0.5, 0.15),
    share().fill("#afafaf", 0.15),
  );

  yield* all(
    hand().y(-140, 0.2),
    hand().opacity(0, 0.2),
    share().scale(0.55, 0.2),
  );

  yield* waitUntil("flyAway");

  const shareX = 325;
  const shareY = -25;
  const circleRadius = 180;
  const circleCenter = new Vector2(shareX, shareY + circleRadius);
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + Math.PI * 2;
  const radiansToDegrees = 180 / Math.PI;
  let currentAngle = startAngle;

  yield* tween(0.5, value => {
    currentAngle = startAngle + (endAngle - startAngle) * value;
    const orbitPosition = new Vector2(
      circleCenter.x + circleRadius * Math.cos(currentAngle),
      circleCenter.y + circleRadius * Math.sin(currentAngle),
    );

    share().position(orbitPosition);
    const tangentAngle = currentAngle + Math.PI / 2;
    share().rotation(tangentAngle * radiansToDegrees);
  });

  const exitDirectionAngle = currentAngle + Math.PI / 4;
  const exitDistance = 700;
  const currentPosition = share().position();
  const exitTarget = new Vector2(
    currentPosition.x + exitDistance * Math.cos(exitDirectionAngle),
    currentPosition.y + exitDistance * Math.sin(exitDirectionAngle),
  );

  yield* all(
    share().position(exitTarget, 0.6),
    share().rotation(exitDirectionAngle * radiansToDegrees, 0.6),
    share().scale(1.3, 0.6),
    share().opacity(0, 0.6),
  );

  yield* waitUntil("end");
});
