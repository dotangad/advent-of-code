defmodule Mix.Tasks.RunDay do
  use Mix.Task

  @shortdoc "Run program"
  def run(args) do
    [day, type] = args
    input = AdventOfCode.Input.get!(day, type)
    # [day, type] = 
    p1 = apply(String.to_atom("Elixir.AdventOfCode.Day#{day}"), :part1, [input])
    p2 = apply(String.to_atom("Elixir.AdventOfCode.Day#{day}"), :part2, [input])

    IO.inspect(p1, label: "Part 1")
    IO.inspect(p2, label: "Part 2")
  end
end
