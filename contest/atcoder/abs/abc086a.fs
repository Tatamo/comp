let input f = System.Console.ReadLine() |> f
let inputs f = System.Console.ReadLine().Split() |> Array.map f
 
let [|a;b|] = inputs int
printfn "%s\n" (if a*b%2=0 then "Even" else "Odd")

