let input f = System.Console.ReadLine() |> f
let inputs f = System.Console.ReadLine().Split() |> Array.map f

let a = input int;
let [|b;c|] = inputs int;
let s = input string;
printf "%d %s\n" (a+b+c) s

