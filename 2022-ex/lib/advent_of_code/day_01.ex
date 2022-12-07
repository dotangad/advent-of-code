defmodule AdventOfCode.Day01 do
  @doc ~S"""
  # Examples
    iex> AdventOfCode.Input.get!("01", "sample")
    ...>   |> AdventOfCode.Day01.part1()
    24000

    iex> AdventOfCode.Input.get!("01", "sample")
    ...>   |> AdventOfCode.Day01.part2()
    45000
  """

  def part1(input) do
    input
    |> clean()
    # Now we have what we want
    |> Enum.map(fn list -> Enum.sum(list) end)
    |> Enum.max()
  end

  def part2(input) do
    input
    |> clean()
    |> Enum.map(fn list -> Enum.sum(list) end)
    |> Enum.sort()
    |> Enum.reverse()
    |> Enum.take(3)
    |> Enum.sum()
  end

  defp clean(input) do
    input
    # Parsing
    |> String.split("\n\n")
    |> Enum.map(fn ln ->
      ln
      |> String.split("\n")
      |> Enum.map(fn x -> String.to_integer(x) end)
    end)
  end
end
