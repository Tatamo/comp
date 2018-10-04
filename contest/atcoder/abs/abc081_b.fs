let inline input f = System.Console.ReadLine() |> f
let inline inputs f = System.Console.ReadLine().Split() |> Array.map f

let n = input int
let a = inputs int

let rec cnt x = if x%2=0 then 1 + cnt (x / 2) else 0

let result = [for x in a -> x] 
             |> List.reduce (fun a b -> a|||b)
             |> cnt

printfn "%d" result
