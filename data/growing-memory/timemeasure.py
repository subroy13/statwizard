#########################
# Program to measure time taken by some functionalities
#########################
import time
import numpy as np


def array_sq_1(arr):
    newarr = []
    for i in range(len(arr)):
        newarr.append(arr[i] ** 2)
    return newarr


def array_sq_2(arr):
    for i in range(len(arr)):
        arr[i] = arr[i] ** 2
    return arr


def array_sq_3(arr):
    return np.square(np.array(arr))


def array_sq_4(arr):
    return np.array(arr) ** 2


def measure_time(func, repeat_count=100):
    start = time.process_time_ns()
    for _ in range(repeat_count):
        func()
    ns = (time.process_time_ns() - start) / repeat_count  # average time in nanosec
    return f"{int(ns)} ns"


if __name__ == "__main__":
    SIZE = 100_000
    arr = list(range(SIZE))
    arr1 = list(range(SIZE))
    arr2 = list(range(SIZE))
    arr3 = list(range(SIZE))

    print(measure_time(lambda: array_sq_1(arr), repeat_count=10))
    print(measure_time(lambda: array_sq_2(arr1), repeat_count=10))
    print(measure_time(lambda: array_sq_3(arr2), repeat_count=10))
    print(measure_time(lambda: array_sq_4(arr3), repeat_count=10))
