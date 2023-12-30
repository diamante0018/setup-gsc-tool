#!/bin/bash

mode="comp"
game="t6"
platform="pc"
target="_test.gsc"

cd scripts/

gsc-tool "$mode" "$game" "$platform" "$target"
