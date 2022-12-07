defmodule AdventOfCode.Day03 do
  def part1(input) do
    input
    |> clean()
    |> Enum.map(fn sack ->
      sack
      |> String.split_at(round(String.length(sack) / 2))
      |> Tuple.to_list()
    end)
    |> Enum.map(fn sack ->
      sack
      |> Enum.map(fn cmp ->
        cmp
        |> String.split("")
        |> Enum.filter(fn c -> c != "" end)
        |> MapSet.new()
      end)
    end)
    |> Enum.map(fn [c1, c2] ->
      MapSet.intersection(c1, c2)
      |> MapSet.to_list()
    end)
    |> Enum.flat_map(fn x -> x end)
    |> Enum.map(fn x -> priority(x) end)
    |> Enum.sum()
  end

  def part2(input) do
    input
    |> clean()
    |> Enum.chunk_every(3)
    |> Enum.map(fn group ->
      group
      |> Enum.map(fn sack ->
        sack
        |> String.split("")
        |> Enum.filter(fn c -> c != "" end)
        |> MapSet.new()
      end)
    end)
    |> Enum.map(fn [s1, s2, s3] ->
      MapSet.intersection(
        MapSet.intersection(s1, s2),
        s3
      )
      |> MapSet.to_list()
    end)
    |> Enum.flat_map(fn x -> x end)
    |> Enum.map(fn x -> priority(x) end)
    |> Enum.sum()
  end

  def priority(chr) do
    cond do
      chr == String.upcase(chr) -> :binary.first(chr) - 65 + 27
      chr == String.downcase(chr) -> :binary.first(chr) - 97 + 1
    end
  end

  defp clean(input) do
    input
    |> String.split("\n")
  end
end
