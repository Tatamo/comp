let inline input f = System.Console.ReadLine() |> f
let inline inputs f = System.Console.ReadLine().Split() |> Array.map f

let s = input string;

let (|Postfix|_|) post (str:string) =
  if str = post then Some("")
  elif str.EndsWith post then Some(str.[..str.Length - 1 - post.Length])
  else None

let rec solve str =
  match str with
    | Postfix "dream" rest -> solve rest
    | Postfix "dreamer" rest -> solve rest
    | Postfix "erase" rest -> solve rest
    | Postfix "eraser" rest -> solve rest
    | "" -> "YES"
    | _ -> "NO"

printfn "%s" (solve s)