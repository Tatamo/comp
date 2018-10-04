let inline input f = System.Console.ReadLine() |> f
let inline inputs f = System.Console.ReadLine().Split() |> Array.map f

let [|n; a; b|] = inputs int

let rec digitsum x =
  if x>0 then
    x%10 + digitsum (x/10) else
    0

[1..n]
|> List.filter (fun x ->
  let sd = digitsum x
  sd>= a && sd<= b)
|> List.sum
|> printfn "%A"
