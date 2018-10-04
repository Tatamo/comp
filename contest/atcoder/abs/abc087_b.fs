let inline input f = System.Console.ReadLine() |> f
let inline inputs f = System.Console.ReadLine().Split() |> Array.map f

let a = input int;
let b = input int;
let c = input int;
let x = input int / 50;

let wallet = [10,a;2,b;1,c]

let rec check x w =
  match w with
    | [weight,num] -> 
      if x >= 0 && x <= weight * num && x % weight = 0 then
        1 else 0
    | (weight,num)::rest ->
      let lim = min num (x/weight)
      [0..lim] |>
      List.sumBy (fun v -> check (x - weight*v) rest)
    | [] -> failwith "x"
 
printfn "%d" <| check x wallet
