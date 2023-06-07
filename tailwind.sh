#!/bin/bash

# utility script allows running tailwindcss without descending in the tree

for file in $(find -type f -name "tailwind.config.js")
do
    echo $file
    (
    cd $(dirname $file)
    . tailwind.sh $@
    )
done