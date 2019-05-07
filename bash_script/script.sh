#!/bin/bash
echo "Welcome to the Project XY Build Script!"

firstline=$(head -n 1 source/changelog.md)
# head -n 1 greift nur die 1. Zeile der Datei ab. Default sind die 
# ersten 10 Zeilen.
echo $firstline

read -a splitfirstline <<< $firstline
# Macht aus der Zeile Array-Elemente auf Wortbasis (Trenner ist
# das Leerzeichen.)

version=${splitfirstline[1]}
echo "You are building version "$version

echo "Enter 1 to continue, or 0 to cancel"
read versioncontinue

if [ $versioncontinue -eq 1 ] 
	then
  	echo "OK"
    filenames=source/*
    for file in $filenames
    do
    	if [ $file == 'source/secretinfo.md' ]
      	then
        	echo $file": This file will be modified before it is being copied."
          sed 's/42/XX/g' source/secretinfo.md
          cp $file build/
        else
    			echo $file" will be copied."
          cp $file build/
        fi
    done
    cd build/
    echo " "
    echo "The following files are currently in the build directory:"
    ls
    cd ..
  else
  	echo "Please come back when you are ready"
fi