package main

import (
	"encoding/json"
	"io/ioutil"
	"os"
)

func must(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {
	files, err := ioutil.ReadDir(".")
	must(err)

	list := make([]string, 0, len(files))

loop:
	for _, fi := range files {
		switch fi.Name() {
		case ".", "..", "list.json", "gen.go":
			continue loop
		}

		list = append(list, fi.Name())
	}

	f, err := os.OpenFile("list.json", os.O_WRONLY|os.O_TRUNC|os.O_SYNC, 0777)
	must(err)
	defer f.Close()

	must(json.NewEncoder(f).Encode(list))

	println("Done!")
}
