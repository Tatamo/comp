let inline input f = System.Console.ReadLine() |> f
let inline inputs f = System.Console.ReadLine().Split() |> Array.map f

let n = input int
let a = inputs int |> Array.sort |> Array.toList |> List.rev

let rec solve (scoreA, scoreB) a =
  match a with
    | fst::snd::rests -> solve (scoreA+fst, scoreB+snd) rests
    | [fst] -> solve (scoreA+fst, scoreB) []
    | _ -> (scoreA, scoreB)

let (sa, sb) = solve (0,0) a
printfn "%d" <| sa-sb
