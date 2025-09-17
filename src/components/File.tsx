import {
  Img,
  initial,
  Layout,
  LayoutProps,
  Length,
  Rect,
  signal,
  Txt,
} from "@motion-canvas/2d";
import {
  PossibleColor,
  PossibleVector2,
  SignalValue,
  SimpleSignal,
} from "@motion-canvas/core";

interface FileProps extends LayoutProps {
  bgColor: SignalValue<PossibleColor>;
  fileImg: SignalValue<string>;
  fileName: SignalValue<string>;
  titleColor: SignalValue<PossibleColor>;
  fileImgSize: SignalValue<PossibleVector2<Length>>;
}

export class File extends Layout {
  @signal()
  public declare readonly bgColor: SimpleSignal<PossibleColor, this>;

  @signal()
  public declare readonly titleColor: SimpleSignal<PossibleColor, this>;

  @signal()
  public declare readonly fileImg: SimpleSignal<string, this>;

  @signal()
  public declare readonly fileName: SimpleSignal<string, this>;

  @signal()
  public declare readonly fileImgSize: SimpleSignal<
    PossibleVector2<Length>,
    this
  >;

  public constructor(props?: FileProps) {
    super(props);

    this.add(
      <Layout direction={"column"} gap={20} layout width={props.width}>
        <Rect fill={props.bgColor} radius={15} padding={10}>
          <Txt
            fill={props.titleColor}
            fontFamily={props.fontFamily}
            fontSize={40}
          >
            {String(props.fileName)}
          </Txt>
        </Rect>

        <Rect fill={props.bgColor} radius={15} padding={40}>
          <Img src={props.fileImg} size={props.fileImgSize} />
        </Rect>
      </Layout>
    );
  }
}
