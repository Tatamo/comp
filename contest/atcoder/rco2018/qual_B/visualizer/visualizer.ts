module visualizer {
    /**
     * lineno は ユーザにエラーメッセージを表示するとき用。1-indexed で渡すこと
     */
    const getInt = (s: string, lineno: number) => {
        if (s == null) {
            throw new Error(`数値のパースに失敗しました at line: ${lineno}`);
        }
        if (s.match(/^\d+$/)) {
            return parseInt(s);
        }
        throw new Error(`数値のパースに失敗しました at line: ${lineno}`);
    };

    const deepcopy = (source: Map<number, number>) => {
        const ret: Map<number, number> = new Map();
        source.forEach((v, k) => {
            ret.set(k, v);
        });
        return ret
    };

    class Board {
        public h: number;
        public w: number;
        public d: number;
        public k: number;

        /**
         * A[y * w + x] := 初期状態で (y, x) に書かれている fragment の番号。負の場合は空
         */
        public A: number[];

        /**
         * C[y * w + x] := 初期状態の (y, x) の fragment が持つ、前後の fragment へのコスト。0の場合は空
         */
        public C: number[];

        constructor(problem_input: string) {
            const lines = problem_input.trim().split("\n");
            const firstLine = lines.shift();
            if (firstLine == undefined) throw new Error(`WA: 入力ファイルが空です`);
            const hwdk = firstLine.trim().split(" ");
            if (hwdk.length != 4) throw new Error(`WA: 入力ファイルの1行目の出力値は4つである必要があります`);
            [this.h, this.w, this.d, this.k] = hwdk.map(v => getInt(v, 1));

            this.A = new Array(this.h * this.w);
            this.C = new Array(this.h * this.w);

            for (let i = 0; i < this.h * this.w; i++) {
                this.A[i] = -1;
                this.C[i] = 0;
            }

            lines.forEach((line, i) => {
                const vars = line.trim().split(" ");
                if (vars.length != 2) throw new Error(`WA: 入力ファイルの${i+2}行目の出力値は2つである必要があります`);
                const [y, x] = vars.map(v => getInt(v, i+2));
                if (x < 0 || x >= this.w) throw new Error(`WA: 入力ファイルの${i+2}行目の座標の値が異常です`);
                if (y < 0 || y >= this.h) throw new Error(`WA: 入力ファイルの${i+2}行目の座標の値が異常です`);
                this.A[y * this.w + x] = i;
            });
        }

        private initialFrame(Y: number[], X: number[]) : Frame {
            const keyFrame: KeyFrame = new KeyFrame(this, new Map(), new Map());
            const frame: Frame = new Frame();
            frame.keyFrame = keyFrame;
            frame.turn = 0;
            frame.turnFromKey = 0;
            frame.x1 = frame.y1 = frame.x2 = frame.y2 = -1;
            frame.cost = 0;
            {
                let hy = -1, hx = -1;
                const abs = Math.abs;
                for (let i = 0; i < this.d; i++) {
                    const y = Y[i];
                    const x = X[i];
                    if (hy >= 0) {
                        const cost = abs(hy - y) + abs(hx - x);
                        this.C[y * this.w + x] += cost;
                        this.C[hy * this.w + hx] += cost;
                        frame.cost += cost;
                    }
                    [hy, hx] = [y, x];
                }
            }
            return frame;
        }

        public calcFrames(contestant_output: string): Frame[] {
            const frames: Frame[] = [];

            const DA: Map<number, number> = new Map();
            const DC: Map<number, number> = new Map();
            const Y: number[] = new Array(this.d);
            const X: number[] = new Array(this.d);

            for (let y = 0; y < this.h; y++) {
                for (let x = 0; x < this.w; x++) {
                    const f = this.A[y * this.w + x];
                    Y[f] = y;
                    X[f] = x;
                }
            }

            let cur = this.initialFrame(Y, X);
            frames.push(cur);

            const moveLines = contestant_output.trim().split("\n");
            if (moveLines.length > this.k) throw new Error(`WA: swap回数は${this.k}回以下である必要があります`);

            moveLines.forEach((line, i) => {
                if (line.length == 0) return;
                const vars = line.trim().split(" ");
                if (vars.length != 4) throw new Error(`WA: 出力ファイルの${i}行目の出力値は4つである必要があります`);
                const [y1, x1, y2, x2] = vars.map(v => getInt(v, i+1));
                if (y1 < 0 || y1 >= this.h) throw new Error(`WA: 出力ファイルの${i}行目の座標の値が異常です`);
                if (x1 < 0 || x1 >= this.w) throw new Error(`WA: 出力ファイルの${i}行目の座標の値が異常です`);
                if (y2 < 0 || y2 >= this.h) throw new Error(`WA: 出力ファイルの${i}行目の座標の値が異常です`);
                if (x2 < 0 || x2 >= this.w) throw new Error(`WA: 出力ファイルの${i}行目の座標の値が異常です`);
                cur = cur.calcNextFrame(DA, DC, Y, X, y1, x1, y2, x2);
                frames.push(cur);
            });
            return frames;
        }
    }

    const FRAMES_PER_KEYFRAME = 10;

    class KeyFrame {
        constructor(public board: Board, public A: Map<number, number>, public C: Map<number, number>) {}
        public next: Frame;
    }

    class Frame {
        public cost: number;
        public turn: number;
        public turnFromKey: number;
        public keyFrame: KeyFrame;
        public nextFrame: Frame;
        public x1: number;
        public y1: number;
        public x2: number;
        public y2: number;
        public ps: [number, number][][] = [[], []];

        /**
         * A[y*w+x] := (y, x) に書かれている fragment の番号。負の場合は空。
         * 値が存在しないときは keyFrame の状態を参照
         */
        private A: Map<number, number> = new Map();

        /**
         * C[y*w+x] := (y, x) に書かれている fragment のコスト。
         * 値が存在しないときは keyFrame の状態を参照
         */
        private C: Map<number, number> = new Map();

        /**
         * (y, x) に書かれている fragment番号。空なら負値
         */
        public fragmentAt(yx: number) : number {
            let v : number|undefined;
            v = this.A.get(yx);
            if (v !== undefined) return v;
            v = this.keyFrame.A.get(yx);
            if (v !== undefined) return v;
            return this.keyFrame.board.A[yx];
        }

        /**
         * (y, x) に書かれている fragment のコスト。空なら負値
         */
        public costAt(yx: number) : number {
            let v : number|undefined;
            v = this.C.get(yx);
            if (v !== undefined) return v;
            v = this.keyFrame.C.get(yx);
            if (v !== undefined) return v;
            return this.keyFrame.board.C[yx];
        }

        public calcNextFrame(DA: Map<number, number>, DC: Map<number, number>, Y: number[], X: number[],
                             y1: number, x1: number, y2: number, x2: number) : Frame {
            const next: Frame = this.nextFrame = new Frame();
            next.turn = this.turn + 1;
            [next.y1, next.x1, next.y2, next.x2] = [y1, x1, y2, x2];

            let keyFrame = this.keyFrame;
            const board = this.keyFrame.board;

            next.turnFromKey = this.turnFromKey + 1;
            if (next.turnFromKey == FRAMES_PER_KEYFRAME) {
                // keyframe を作り直す
                keyFrame = new KeyFrame(board, deepcopy(DA), deepcopy(DC));
                next.turnFromKey = 0;
                next.A = new Map();
                next.C = new Map();
            }
            else {
                next.A = deepcopy(this.A);
                next.C = deepcopy(this.C);
            }

            next.keyFrame = keyFrame;

            const w = board.w;
            const yx1 = y1 * w + x1;
            const yx2 = y2 * w + x2;

            // swap 前にかかれていた fragment の番号
            const f1 = this.fragmentAt(yx1);
            const f2 = this.fragmentAt(yx2);

            const calcD = (a: number, b: number, c: number) : number => {
                if (b < 0 || b >= board.d) return 0;
                const by = Y[b];
                const bx = X[b];

                let cost = 0;
                if (a >= 0) {
                    const y = Y[a];
                    const x = X[a];
                    cost += Math.abs(y - by) + Math.abs(x - bx);
                }
                if (c < board.d) {
                    const y = Y[c];
                    const x = X[c];
                    cost += Math.abs(y - by) + Math.abs(x - bx);
                }
                return cost;
            };

            const curCost1 = calcD(f1-1, f1, f1+1);
            const curCost2 = calcD(f2-1, f2, f2+1);

            // swap 処理
            next.A.set(yx1, f2);
            next.A.set(yx2, f1);
            DA.set(yx1, f2);
            DA.set(yx2, f1);

            if (f1 >= 0) Y[f1] = y2;
            if (f1 >= 0) X[f1] = x2;
            if (f2 >= 0) Y[f2] = y1;
            if (f2 >= 0) X[f2] = x1;

            const newCost1 = calcD(f1-1, f1, f1+1);
            const newCost2 = calcD(f2-1, f2, f2+1);

            const uu = (f: number): [number, number] => {
                if (0 <= f && f < board.d) {
                    const c = calcD(f-1, f, f+1);
                    const yx = Y[f] * board.w + X[f];
                    next.C.set(yx, c);
                    DC.set(yx, c);
                    return [Y[f], X[f]];
                }
                return [-1, -1];
            };
            next.ps[0].push(uu(f1-1));
            next.ps[0].push(uu(f1));
            next.ps[0].push(uu(f1+1));
            next.ps[1].push(uu(f2-1));
            next.ps[1].push(uu(f2));
            next.ps[1].push(uu(f2+1));

            next.cost = this.cost + (newCost1 + newCost2) - (curCost1 + curCost2);
            return next;
        }
    }

    export const init = () => {
        const file1 = <HTMLInputElement> document.getElementById("file1");
        const file2 = <HTMLInputElement> document.getElementById("file2");
        const costInput = <HTMLInputElement> document.getElementById("cost");
        const scoreInput = <HTMLInputElement> document.getElementById("score");

        // controls
        const seek = <HTMLInputElement> document.getElementById("seek");
        const pos = <HTMLInputElement> document.getElementById("pos");
        const firstButton = <HTMLInputElement> document.getElementById("firstButton");
        const prevButton = <HTMLInputElement> document.getElementById("prevButton");
        const playButton = <HTMLInputElement> document.getElementById("playButton");
        const nextButton = <HTMLInputElement> document.getElementById("nextButton");
        const lastButton = <HTMLInputElement> document.getElementById("lastButton");
        const maxfps = <HTMLInputElement> document.getElementById("maxfps");
        const colormode = <HTMLInputElement> document.getElementById("colormode");
        const linemode = <HTMLInputElement> document.getElementById("linemode");
        const swapX1 = <HTMLButtonElement> document.getElementById("swapx1");
        const swapY1 = <HTMLButtonElement> document.getElementById("swapy1");
        const swapX2 = <HTMLButtonElement> document.getElementById("swapx2");
        const swapY2 = <HTMLButtonElement> document.getElementById("swapy2");
        const exportButton = <HTMLInputElement> document.getElementById("exportButton");

        const canvas = <HTMLCanvasElement> document.getElementById("canvas");
        const ctx = canvas.getContext('2d');

        if (ctx == null) {
            return () => {
                alert('未対応ブラウザです');
            };
        }
        const load_to = (file:File, callback: (value: string)=>void) => {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onloadend = function () {
                callback(reader.result);
            }
        };

        let prevFrame: Frame|null = null;
        let id: number|null = null;

        const run = (value1: string, value2: string) => {
            scoreInput.value = costInput.value = '0';
            seek.min = seek.max = pos.value = seek.value = '0';
            pos.step = seek.step = '1';

            let board: Board;
            try {
                board = new Board(value1);
            }
            catch (e) {
                alert(e);
                console.warn(e);
                scoreInput.value = costInput.value = 'ERROR at input';
                return;
            }

            let frames: Frame[];
            try {
                frames = board.calcFrames(value2);
            }
            catch (e) {
                alert(e);
                console.warn(e);
                scoreInput.value = costInput.value = 'WA';
                return;
            }

            // 以下、表示のための変数と関数
            canvas.width = 800;
            canvas.height = 800;
            const width = canvas.width;
            const height = canvas.height;

            const cell_width = Math.floor(width / board.w);
            const cell_height = Math.floor(height / board.h);

            const ctop = (y: number) => {
                return y * cell_height;
            };

            const clef = (x: number) => {
                return x * cell_width;
            };

            // 位置による色
            const posColors: string[] = new Array(board.d);
            for (let f = 0; f < board.d; f++) {
                let h = 300 * f / board.d + 60;
                posColors[f] = `hsl(${Math.round(h)}, 100%, 50%)`;
            }

            // コストによる色
            const maxCost = (board.h+board.w)*2;
            const redThreashold = maxCost * 0.5;
            const cosColors: string[] = new Array(maxCost + 1);
            for (let c = 0; c <= maxCost; c++) {
                const cost = c;
                let h = 0;
                let l = 50;
                if (cost < redThreashold) {
                    h = 240 - 240 * (cost / redThreashold);
                }
                else {
                    l = Math.round(50 + 50 * (0.5 - cost / redThreashold));
                }
                cosColors[c] = `hsl(${Math.round(h)}, 100%, ${l}%)`;
            }

            let costColorMode = colormode.checked;
            let lineMode = linemode.checked;

            const drawSwapLines = (frame: Frame) => {
                const drawLine = (y1: number, x1: number, y2: number, x2: number) => {
                    if (y1 == -1 || y2 == -1) return;
                    ctx.strokeStyle = '#000';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(clef(x1) + cell_width / 2, ctop(y1) + cell_height / 2);
                    ctx.lineTo(clef(x2) + cell_width / 2, ctop(y2) + cell_height / 2);
                    ctx.stroke();
                };
                const drawLines = (ps: [number, number][]) => {
                    let y = -1, x = -1;
                    for (let [ny, nx] of ps) {
                        drawLine(y, x, ny, nx);
                        y = ny;
                        x = nx;
                    }
                };
                drawLines(frame.ps[0]);
                drawLines(frame.ps[1]);
            };

            const draw = (frame: Frame) => {
                const drawPos = () => {
                    const drawFragment = (f: number, y: number, x: number, needClear: boolean) => {
                        if (f < 0) {
                            if (!needClear) return;
                            ctx.strokeStyle = ctx.fillStyle = '#fff';
                        }
                        else {
                            ctx.strokeStyle = ctx.fillStyle = posColors[f];
                        }
                        y = ctop(y);
                        x = clef(x);
                        ctx.fillRect(x, y, cell_width, cell_height);
                    }

                    if (prevFrame != null && prevFrame.turn == frame.turn - 1) {
                        // 差分描画1
                        const f1 = frame.fragmentAt(frame.y1 * board.w + frame.x1);
                        const f2 = frame.fragmentAt(frame.y2 * board.w + frame.x2);
                        drawFragment(f1, frame.y1, frame.x1, true);
                        drawFragment(f2, frame.y2, frame.x2, true);
                    }
                    else if (prevFrame != null && prevFrame.turn == frame.turn + 1) {
                        // 差分描画2
                        const f1 = frame.fragmentAt(prevFrame.y1 * board.w + prevFrame.x1);
                        const f2 = frame.fragmentAt(prevFrame.y2 * board.w + prevFrame.x2);
                        drawFragment(f1, prevFrame.y1, prevFrame.x1, true);
                        drawFragment(f2, prevFrame.y2, prevFrame.x2, true);
                    }
                    else {
                        // 全描画
                        ctx.strokeStyle = ctx.fillStyle = '#fff';
                        ctx.fillRect(0, 0, width, height);
                        let yx = 0;
                        for (let y = 0; y < board.h; y++) {
                            for (let x = 0; x < board.w; x++) {
                                const f = frame.fragmentAt(yx++);
                                drawFragment(f, y, x, false);
                            }
                        }
                    }
                };

                const drawCos = () => {
                    const drawFragment = (y: number, x: number, needClear: boolean) => {
                        const cost = frame.costAt(y * board.w + x);
                        if (cost == 0) {
                            if (!needClear) return;
                            ctx.strokeStyle = ctx.fillStyle = '#fff';
                        }
                        else {
                            ctx.strokeStyle = ctx.fillStyle = cosColors[cost];
                        }
                        y = ctop(y);
                        x = clef(x);
                        ctx.fillRect(x, y, cell_width, cell_height);
                    }
                    if (prevFrame != null && prevFrame.turn == frame.turn - 1) {
                        // 差分描画1
                        for (let [y, x] of frame.ps[0]) {
                            drawFragment(y, x, true);
                        }
                        for (let [y, x] of frame.ps[1]) {
                            drawFragment(y, x, true);
                        }
                    }
                    else if (prevFrame != null && prevFrame.turn == frame.turn + 1) {
                        // 差分描画2
                        for (let [y, x] of prevFrame.ps[0]) {
                            drawFragment(y, x, true);
                        }
                        for (let [y, x] of prevFrame.ps[1]) {
                            drawFragment(y, x, true);
                        }
                    }
                    else {
                        // 全描画
                        ctx.strokeStyle = ctx.fillStyle = '#fff';
                        ctx.fillRect(0, 0, width, height);
                        for (let y = 0; y < board.h; y++) {
                            for (let x = 0; x < board.w; x++) {
                                drawFragment(y, x, false);
                            }
                        }
                    }
                };

                if (lineMode) prevFrame = null;
                const drawFunc = costColorMode ? drawCos : drawPos;
                drawFunc();
                if (lineMode) drawSwapLines(frame);
                prevFrame = frame;
            };

            // 以下、ボタン類のコールバックとか

            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 表示するやつ
            const d = () => {
                let frame = frames[parseInt(seek.value)];
                draw(frame);
                costInput.value = frame.cost.toString();
                const score = Math.floor((Math.max(0, frames[0].cost - frame.cost) + 99) / 100);
                scoreInput.value = score.toString();
                if (frame.turn != 0) {
                    swapX1.value = frame.x1.toString();
                    swapY1.value = frame.y1.toString();
                    swapX2.value = frame.x2.toString();
                    swapY2.value = frame.y2.toString();
                }
                else {
                    swapX1.value = swapY1.value = swapX2.value = swapY2.value = '';
                }
            };

            let fps = parseInt(maxfps.value);
            let updateInterval = 1000 / fps;

            // 最終フレームを表示
            pos.value = pos.max = seek.value = seek.max = (frames.length - 1).toString();
            d();

            seek.onchange = seek.oninput = () => {
                pos.value = seek.value;
                d();
            };
            pos.onchange = () => {
                seek.value = pos.value;
                d();
            };
            firstButton.onclick = () => {
                seek.value = pos.value = seek.min;
                d();
            };
            const gotoPrevFrame = prevButton.onclick = () => {
                let f = parseInt(seek.value);
                if (f > 0) {
                    f--;
                    pos.value = seek.value = f.toString();
                    d();
                }
            };
            const gotoNextFrame = nextButton.onclick = () => {
                let f = parseInt(seek.value);
                if (f < frames.length - 1) {
                    f++;
                    pos.value = seek.value = f.toString();
                    d();
                }
            };
            lastButton.onclick = () => {
                pos.value = seek.value = seek.max;
                d();
            };

            // 矢印キー左右で移動
            window.onkeydown = (e: KeyboardEvent) => {
                if (e.target == seek) return;
                switch (e.keyCode) {
                    case 37:
                        gotoPrevFrame();
                        break;
                    case 39:
                        gotoNextFrame();
                        break;
                }
            };

            colormode.onchange = () => {
                costColorMode = colormode.checked;
                d();
            };

            linemode.onchange = () => {
                lineMode = linemode.checked;
                d();
            };

            const play = () => {
                if (seek.value == seek.max) {
                    seek.value = '0';
                }
                const stop = () => {
                    if (id != null) {
                        clearInterval(id);
                        playButton.onclick = play;
                        id = null;
                    }
                };
                id = setInterval(() => {
                    let f = parseInt(seek.value);
                    if (f < frames.length - 1) {
                        f++;
                        pos.value = seek.value = f.toString();
                        d();
                    }
                    else {
                        stop();
                    }
                }, updateInterval);
                playButton.onclick = stop;
            };

            maxfps.onchange = () => {
                let v = parseInt(maxfps.value);
                updateInterval = 1000 / v;
                if (id != null) {
                    clearInterval(id);
                    play();
                }
            };

            exportButton.onclick = () => {
                const dataURL = canvas.toDataURL('image/png');
                const anchor = document.createElement('a');
                anchor.href = dataURL;
                anchor.download = 'visualizer.png';
                const e = document.createEvent('MouseEvent');
                e.initEvent("click", true, true);
                anchor.dispatchEvent(e);

                // anchor.dispatchEvent(new CustomEvent('click'));
            };

            playButton.onclick = play;
            playButton.focus();
        };

        return () => {
            if (id != null) clearInterval(id);
            prevFrame = null;
            id = null;
            file1.files && load_to(file1.files[0], (value1: string) => {
                file2.files && load_to(file2.files[0], (value2: string) => {
                    run(value1.trim(), value2.trim());
                });
            });
        };
    };
}

window.onload = () => {
    (<HTMLButtonElement> document.getElementById("run")).onclick = visualizer.init();
};
