defmodule Mix.Tasks.Input do
  use Mix.Task

  @shortdoc "Save input"
  def run(args) do
    [day, type] = args
    AdventOfCode.Input.save!(day, type)
  end
end
