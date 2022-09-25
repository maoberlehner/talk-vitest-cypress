const STORAGE_KEY = `shopping-list`;

export type Item = {
  id: string,
  name: string,
  state: `active`|`inactive`,
};

export async function getList(): Promise<Item[]> {
  let dataRaw = localStorage.getItem(STORAGE_KEY);
  if (!dataRaw) return [];

  return JSON.parse(dataRaw);
}

export async function update(id, data): Promise<void> {
  let list = await getList();
  let itemCurrent = list.find(item => item.id === id);
  let itemNew = {
    ...itemCurrent,
    ...data,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(list.map((item) => {
    if (item.id === id) return itemNew;

    return item;
  })));
}

export async function create(data): Promise<void> {
  let list = await getList();
  list.push({
    id: data.name,
    ...data,
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
