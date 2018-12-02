let inline input f = System.Console.ReadLine() |> f

[0..input int-1] |> List.map (fun _->input int) |> List.distinct |> List.length |> printfn "%d"
