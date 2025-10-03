import {
  CODE,
  Code,
  lines,
  makeScene2D,
  Txt,
  Img,
} from "@motion-canvas/2d";
import {
  all,
  createRef,
  waitUntil,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const code = createRef<Code>();
  const title = createRef<Txt>();
  const subtitle = createRef<Txt>();
  const emoji = createRef<Txt>();

  const CFirst = CODE`\
    async function checkout(data: Checkout) {
      if (data.total) {
        if (data.total <= 0) {
          console.error("Invalid total")
        } else {
          // Check card validity
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
  `;

  view.add(
    <>
      <Img
        src={"../../images/Background.png"}
        width={1080}
        height={1920}
        zIndex={-10}
      />
      <Txt
        fontSize={76}
        fontWeight={800}
        fill={"#ddd"}
        y={-550}
        opacity={0}
        ref={title}
      >
      </Txt>
      <Code
        fontSize={28}
        fill={"#ddd"}
        fontFamily={"Fira Code"}
        opacity={0}
        middle={[-30, 0]}
        ref={code}
        code={CFirst}
      />
      <Txt
        fontSize={76}
        fontWeight={800}
        fill={"#ddd"}
        y={500}
        opacity={0}
        ref={subtitle}
      >
        Easy to read?
      </Txt>
      <Txt
        fontSize={80}
        y={-425}
        x={100}
        rotation={-45}
        opacity={0}
        ref={emoji}
      >
        👈🏻
      </Txt>
    </>
  );

  yield* all(
    code().opacity(1, 1),
    subtitle().opacity(1, 1)
  )

  yield* waitUntil("changeCode");

  yield* all(
    subtitle().y(550, .5),
    code().code(CSecond, .75).wait(1),
  )
 
  yield* subtitle().text("Same function", 0.5)

  yield* waitUntil("readable");
  
  yield* all(
    title().opacity(1, 0.5),
    title().text("Readable", 0.5),
  )
  
  yield* waitUntil("selectFirstLine");

  yield* all(
    code().selection(lines(0), 0.5),
    emoji().opacity(1, 0.5),
  )
  yield* waitUntil("selectFrom0");

  yield* all(
    code().selection(lines(1,4), 0.5),
    emoji().y(-370, 0.5),
    emoji().x(85, 0.5),
  )
  yield* waitUntil("selectFrom1To4");

  yield* all(
    code().selection(lines(6,9), 0.5),
    emoji().y(-200, 0.5),
    emoji().x(150, 0.5),
  )
  yield* waitUntil("selectFrom6To9");

  yield* all(
    code().selection(lines(11,14), 0.5),
    emoji().y(-25, 0.5),
    emoji().x(65, 0.5),
  )

  yield* waitUntil("end");

  /*const gradient = new Gradient({
    type: "linear",
    from: new Vector2(-200, 0), // gradient start (vector)
    to: new Vector2(200, 0), // gradient end (vector)
    stops: [
      { offset: 0, color: "#ff7e5f" },
      { offset: 0.5, color: "#feb47b" },
      { offset: 1, color: "#86a8e7" },
    ],
  });
  const title = createRef<Txt>();
  view.add(
    <Txt
      ref={title}
      x={0}
      y={-650}
      fill={gradient}
      fontSize={100}
      fontFamily={"Jetbrains Mono"}
      fontWeight={1000}
      opacity={0}
    >
      Polimorfismo
    </Txt>
  );

  yield* title().opacity(1, 1);

  yield* waitUntil("showDescription");

  const description = createRef<Txt>();
  view.add(
    <Txt
      fontFamily={"Jetbrains Mono"}
      fontSize={40}
      fill={"#ddd"}
      top={title().bottom().addY(100)}
      ref={description}
    />
  );

  yield* description().text(`"Um método com várias formas diferentes."`, 2);

  yield* waitUntil("practical");

  const practical = createRef<Txt>();
  view.add(
    <Txt
      fontFamily={"Jetbrains Mono"}
      fill={"#eee"}
      fontSize={80}
      opacity={0}
      ref={practical}
      top={description().bottom().addY(150)}
    >
      Na prática:
    </Txt>
  );

  yield* practical().opacity(1, 1);

  yield* waitUntil("showPdf");
  const pdfFile = createRef<File>();
  view.add(
    <File
      fileImg={Pdf}
      fileImgSize={[200, 230]}
      bgColor={"#2a2a30ff"}
      fileName={"arquivo.pdf"}
      titleColor={"#c2c2c2ff"}
      fontFamily={"Jetbrains Mono"}
      opacity={0}
      y={150}
      x={-250}
      ref={pdfFile}
    />
  );

  yield* all(pdfFile().opacity(1, 1), pdfFile().y(100, 1));

  const txtFile = createRef<File>();
  view.add(
    <File
      fileImg={TxtImg}
      fileImgSize={[200, 230]}
      bgColor={"#2a2a30ff"}
      fileName={"arquivo.txt"}
      titleColor={"#c2c2c2ff"}
      fontFamily={"Jetbrains Mono"}
      opacity={0}
      y={150}
      x={250}
      ref={txtFile}
    />
  );

  yield* all(txtFile().opacity(1, 1), txtFile().y(100, 1));

  yield* waitUntil("readpdfCode");
  const readPdfCode = createRef<Code>();
  view.add(
    <Code
      code={`\
      lerPdf() {...}`}
      ref={readPdfCode}
      fontSize={35}
      x={-310}
      y={370}
      opacity={0}
    />
  );

  yield* readPdfCode().opacity(1, 1);

  const readTxtCode = createRef<Code>();
  view.add(
    <Code
      code={`\
      lerTxt() {...}`}
      ref={readTxtCode}
      fontSize={35}
      x={200}
      y={370}
      opacity={0}
    />
  );

  yield* readTxtCode().opacity(1, 1);

  yield* waitUntil("highlightOOP");
  const allNodes = [
    ...view.findAll(is(Txt)),
    ...view.findAll(is(Code)),
    ...view.findAll(is(File)),
  ];

  yield* all(...allNodes.map((node, i) => i !== 0 && node.opacity(0.4, 1)));

  yield* waitUntil("back");
  yield* all(...allNodes.map((node) => node.opacity(1, 1)));

  yield* waitUntil("hidePractical");

  yield* all(
    readPdfCode().opacity(0, 1),
    readTxtCode().opacity(0, 1),
    txtFile().opacity(0, 1),
    pdfFile().opacity(0, 1),
    practical().opacity(0, 1)
  );

  yield* waitUntil("showArquivo");

  const arquivoClass = createRef<Code>();
  view.add(
    <Code
      ref={arquivoClass}
      code={`\
// Arquivo.js
export class Arquivo {
  constructor(nome) {
    this.nome = nome;
  }

  ler() {
    throw new Error("Delegado para subclasse");
  }
}
`}
      fontSize={35}
      opacity={0}
    />
  );

  yield* arquivoClass().opacity(1, 1);

  yield* waitUntil("focusLer");

  yield* arquivoClass().selection(lines(5, 7), 1);

  yield* waitUntil("tipoDeArquivo");
  const tipoTxt = createRef<Txt>();
  view.add(
    <Txt
      fontFamily={"Jetbrains Mono"}
      ref={tipoTxt}
      fill={"#8b949e"}
      fontSize={35}
      opacity={0}
    >
      // Tipo de arquivo: ?
    </Txt>
  );
  yield* tipoTxt().opacity(1, 1);

  yield* waitUntil("hideArquivo");
  yield* all(arquivoClass().opacity(0, 1), tipoTxt().opacity(0, 1));

  const arquivoPdfClass = createRef<Code>();
  view.add(
    <Code
      ref={arquivoPdfClass}
      code={`\
// ArquivoPDF.js
import { Arquivo } from "./Arquivo.js";

export class ArquivoPDF extends Arquivo {
  constructor(nome) {
    super(nome);
  }

  ler() {
    console.log(\`Lendo arquivo PDF: \${this.nome}\`);
  }
}`}
      fontSize={32}
      opacity={0}
      position={[0, -200]}
    />
  );

  yield* arquivoPdfClass().opacity(1, 1);

  const arquivoTxtClass = createRef<Code>();
  view.add(
    <Code
      ref={arquivoTxtClass}
      code={`\
// ArquivoTXT.js
import { Arquivo } from "./Arquivo.js";

export class ArquivoTXT extends Arquivo {
  constructor(nome) {
    super(nome);
  }

  ler() {
    console.log(\`Lendo arquivo TXT: \${this.nome}\`);
  }
}`}
      fontSize={32}
      position={[0, 300]}
      opacity={0}
    />
  );

  yield* arquivoTxtClass().opacity(1, 1);

  yield* waitUntil("highlightConstructor");

  yield* all(
    arquivoPdfClass().selection(lines(4, 6), 0.5),
    arquivoTxtClass().selection(lines(4, 6), 0.5)
  );

  yield* waitUntil("lerImpl");

  yield* all(
    arquivoPdfClass().selection(lines(8, 10), 1),
    arquivoTxtClass().selection(lines(8, 10), 1)
  );

  yield* waitUntil("lerImplPdf");

  yield* all(
    arquivoPdfClass().selection(lines(8, 10), 1),
    arquivoTxtClass().selection(lines(-1), 1)
  );

  yield* waitUntil("lerImplTxt");

  yield* all(
    arquivoPdfClass().selection(lines(-1), 1),
    arquivoTxtClass().selection(lines(8, 10), 1)
  );

  yield* waitUntil("normal");

  yield* all(
    arquivoPdfClass().selection(lines(0, 100), 1),
    arquivoTxtClass().selection(lines(0, 100), 1)
  );

  yield* waitUntil("hideAll");

  const randomPdf = createRef<File>();
  view.add(
    <File
      fileImg={Pdf}
      fileImgSize={[200, 230]}
      bgColor={"#2a2a30ff"}
      fileName={"arquivo.pdf"}
      titleColor={"#c2c2c2ff"}
      fontFamily={"Jetbrains Mono"}
      opacity={0}
      y={-150}
      ref={randomPdf}
    />
  );

  yield* all(
    randomPdf().opacity(1, 1),
    randomPdf().position([0, -200], 1),
    arquivoPdfClass().opacity(0, 1),
    arquivoTxtClass().position([0, 200], 1),
    arquivoTxtClass().code(
      `\
// main.js
import { ArquivoPDF } from "./ArquivoPDF.js";

const pdf = new ArquivoPDF("meu_pdf.pdf");

pdf.ler(); // -> Lendo arquivo PDF: meu_pdf.pdf
`,
      1
    )
  );

  yield* waitUntil("instantiate");
  const isntantiationBbox = arquivoTxtClass().getSelectionBBox(
    arquivoTxtClass().findFirstRange("new ArquivoPDF")
  )[0];
  const bbox = createRef<Rect>();

  arquivoTxtClass().add(
    <Rect
      ref={bbox}
      offset={-1}
      radius={10}
      padding={25}
      position={isntantiationBbox.position.addY(-5)}
      size={isntantiationBbox.size}
      lineWidth={4}
      opacity={0}
      stroke={"white"}
    />
  );

  yield* bbox().opacity(1, 1);

  yield* waitUntil("lerBbox");

  const lerBbox = arquivoTxtClass()
    .getSelectionBBox(arquivoTxtClass().findFirstRange("pdf.ler()"))[0]
    .expand([4, 30]);

  yield* all(bbox().opacity(0, 1));

  bbox().position(lerBbox.position.addX(20));
  bbox().size(lerBbox.size);

  yield* bbox().opacity(1, 1);

  yield* all(
    arquivoTxtClass().code(
      `\
    pdf.ler();`,
      1
    ),
    bbox().opacity(0, 1),
    arquivoTxtClass().fontSize(60, 1),
    arquivoTxtClass().position([-70, 100], 1)
  );

  const polMethod = createRef<Txt>();
  view.add(
    <Txt
      ref={polMethod}
      fill={"white"}
      fontFamily={"Jetbrains Mono"}
      fontSize={40}
      y={200}
      opacity={0}
    >
      Método polimórfico
    </Txt>
  );

  yield* polMethod().opacity(1, 1);

  yield* waitFor(2);

  yield* polMethod().text("Possui várias formas diferentes", 1);

  yield* waitUntil("hideAllNodes");
  yield* all(
    randomPdf().opacity(0, 1),
    polMethod().opacity(0, 1),
    arquivoTxtClass().opacity(0, 1)
  );

  const advantages = createRef<Txt>();
  view.add(
    <Txt
      fill={"white"}
      ref={advantages}
      fontFamily={"Jetbrains Mono"}
      fontSize={80}
      opacity={0}
      position={[0, -300]}
    >
      Vantagens:
    </Txt>
  );

  yield* advantages().opacity(1, 1);

  const strAdvantagesList = [
    "Código organizado",
    "Lógicas separadas",
    "Fácil manutenção futura",
    "Mesmo método já conhecido",
  ];

  const advRefs: Txt[] = [];

  const advantagesList = createRef<Txt>();
  view.add(
    <Layout
      justifyContent={"center"}
      alignContent={"center"}
      alignItems={"center"}
      layout
      direction={"column"}
      gap={20}
      ref={advantagesList}
      top={advantages().bottom().addY(160)}
    />
  );

  yield* waitUntil("adv1");
  advantagesList().add(
    <>
      {strAdvantagesList.map((adv, i) => (
        <Txt
          fill={"#ccc"}
          fontSize={40}
          fontFamily={"Jetbrains Mono"}
          opacity={0}
          ref={makeRef(advRefs, i)}
        >
          {adv}
        </Txt>
      ))}
    </>
  );

  yield* advRefs[0].opacity(1, 1);

  yield* waitUntil("adv2");

  yield* advRefs[1].opacity(1, 1);

  yield* waitUntil("adv3");

  yield* advRefs[2].opacity(1, 1);

  yield* waitUntil("adv4");

  yield* advRefs[3].opacity(1, 1);

  yield* waitFor(13);*/
});
