let inline input f = System.Console.ReadLine() |> f
let inline inputs f = System.Console.ReadLine().Split() |> Array.map f

let str = input string
let result = [for x in str -> x]
          |> List.filter (fun x -> x = '1')
          |> List.length

printfn "%d" result