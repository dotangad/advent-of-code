from typing import List


def p1(lines: List[str]) -> int:
    numbers = []

    for line in lines:
        n = "".join([c if c.isdigit() else "" for c in [*line]])
        numbers.append(int(n[0] + n[-1]))

    return reduce


with open("in/01.sample.txt", "r") as file:
    data = [line.strip() for line in file.read().splitlines()]
    print("P1:", p1(data))
