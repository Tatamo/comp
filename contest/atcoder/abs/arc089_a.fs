let inline input f = System.Console.ReadLine() |> f
let inline inputs f = System.Console.ReadLine().Split() |> Array.map f

let n = input int
let plan =
  (0,0,0)::(
    [1..n]
    |> List.map (fun _ -> inputs int |> (fun [|t;x;y|] -> (t,x,y)))
  )

let diff (x1, y1) (x2, y2) =
  abs (x1-x2) + abs (y1-y2)

let check (t1,x1,y1) (t2,x2,y2) =
  let t = t2 - t1
  let d = diff (x1,y1) (x2,y2)
  t >= d && (t-d)%2 = 0

let rec solve p =
  match p with
    | p1::p2::rests -> 
      if check p1 p2 then solve (p2::rests)
      else "No"
    | _ -> "Yes"

printfn "%s" (solve plan)
