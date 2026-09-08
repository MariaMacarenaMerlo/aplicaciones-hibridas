import { readFile, writeFile } from "fs/promises";

//traigo todas las razas:
export async function getBreeds() {
  return JSON.parse(await readFile("./data/breeds.json"));
}

export async function getBreedByName(name) {
  const breeds = await getBreeds();
  const breedByName = breeds.find((breed) => breed.name == name);
  return breedByName;
}

export async function getBreedById(id) {
  const breeds = await getBreeds();
  const breedById = breeds.find((breed) => breed.id == id);
  return breedById;
}

export async function saveBreed(breed) {
  const breeds = await getBreeds();

  const ids = breeds.map((breed) => breed.id);
  const maxId = Math.max(...ids);
  breed.id = maxId + 1;

  breeds.push(breed);

  await writeFile("./data/breeds.json", JSON.stringify(breeds), "utf-8");
  return breed;
}

export async function editBreed(id, breed) {
  const breeds = await getBreeds();

  let editedBreed;

  const newBreeds = breeds.map((oldBreed) => {
    if (oldBreed.id == id) {
      editedBreed = {
        ...oldBreed,
        ...breed,
      };

      return editedBreed;
    }

    return oldBreed;
  });

  await writeFile("./data/breeds.json", JSON.stringify(newBreeds), "utf-8");

  return editedBreed;
}

export async function deleteBreed(id) {
  const breeds = await getBreeds();
  const deletedBreed = breeds.find((breed) => breed.id == id);

  const newBreeds = breeds.filter((breed) => breed.id != id);

  await writeFile("./data/breeds.json", JSON.stringify(newBreeds), "utf-8");
  return deletedBreed;
}
