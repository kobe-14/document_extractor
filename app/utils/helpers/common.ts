export function generateRandomRgb() {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);
  return "rgb(" + x + "," + y + "," + z + ")";
}

export function flattenArray(arr: any) {
  let result: any = [];

  arr.forEach((item: any) => {
    if (Array.isArray(item)) {
      result = result.concat(flattenArray(item));
    } else {
      result.push(item);
    }
  });

  return result;
}

export function flatten(tree: any) {
  let result: any = [];

  function traverse(node: any) {
    result.push(node);
    if (node.children) {
      node.children.forEach(traverse);
    }
  }

  tree.forEach(traverse);

  return result;
}
