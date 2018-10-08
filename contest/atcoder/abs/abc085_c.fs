let inline input f = System.Console.ReadLine() |> f
let inline inputs f = System.Console.ReadLine().Split() |> Array.map f

let [|n;_y|] = inputs int
let y = _y/1000

// a,b,cを決定
let check (a,b) num payment  =
  if payment = num then Some(a,b,num) else None

// aを固定した状態で再帰
let rec check1 (a,b) num payment =
  match check (a,b) num payment with
    | Some(a,b,c) -> Some(a,b,c)
    | None -> if b > 0 then check1 (a,b-1) (num+1) (payment+5) else None

let rec check2 a num payment =
  // bとして使用できる最大枚数
  let bMax = min num (payment/5)
  match check1 (a, bMax) (num-bMax) (payment-bMax*5) with
    | Some(a,b,c) -> Some(a,b,c)
    | None -> if a > 0 then check2 (a-1) (num+1) (payment+10) else None
   
let a = min n (y/10)
let result = check2 a (n-a) (y-a*10)

match result with
  | Some(a,b,c) -> printfn "%d %d %d" a b c
  | None -> printfn "-1 -1 -1"
