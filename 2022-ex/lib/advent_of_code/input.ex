defmodule AdventOfCode.Input do
  @moduledoc """
  This module can help with automatically managing your Advent of Code input
  files. It will save input from your clipboard to a file, and read that file back.
  """

  @doc """
  Reads the input file for a given day and type (sample, final)
  """
  def get!(day, type)

  def get!(day, type) do
    case(File.read(filename(day, type))) do
      {:ok, contents} -> contents
      {:error, :enoent} -> raise "Input file does not exist"
      {:error, reason} -> raise reason
    end
  end

  @doc """
  Saves clipboard content to a file
  """
  def save!(day, type)

  def save!(day, type) do
    File.write(
      filename(day, type),
      Clipboard.paste()
    )
  end

  defp filename(day, type), do: Path.expand("../in/2022/#{day}.#{type}.txt")
end
