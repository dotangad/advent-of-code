defmodule Mix.Tasks.Bench do
  use Mix.Task

  @shortdoc "Benchmark program"
  def run(args) do
    [day, type] = args
    input = AdventOfCode.Input.get!(day, type)
    Benchee.run(%{
      part1: fn ->
        apply(String.to_atom("Elixir.AdventOfCode.Day#{day}"), :part1, [input])
      end,
      part2: fn ->
        apply(String.to_atom("Elixir.AdventOfCode.Day#{day}"), :part2, [input])
      end
    })
  end
end
