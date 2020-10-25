import tags from "html-tags/html-tags.json";

const parseQuery = (query) => {
  const chunks = query.split(/([\[\]=#.])/);
  let tagName = "";
  let id = "";
  const classNames = [];
  const args = {};

  for (var i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    if (chunk === "#") {
      id = chunks[++i];
    } else if (chunk === ".") {
      classNames.push(chunks[++i]);
    } else if (chunk.length) {
      tagName = chunk;
    }
  }

  if (id) {
    args["id"] = id;
  }

  if (classNames) {
    args["class"] = classNames.join(" ");
  }

  return {
    tag: tagName || "div",
    args,
  };
};

const createX = (fn) => {
  const x = (tag1) => (arg1, ...children) => {
    const { tag, args } = parseQuery(tag1);

    return obj(arg1)
      ? fn(
          tag,
          {
            ...args,
            ...arg1,
          },
          ...chx(children)
        )
      : arr(arg1)
      ? fn(tag, args, ...arg1)
      : fn(tag, args, arg1);
  };

  tags.forEach((tag) => {
    x[tag] = x(tag);
  });

  return x;
};

const obj = (o) => typeof o === "object" && !Array.isArray(o);
const arr = (a) => Array.isArray(a);
const chx = (arr) => (Array.isArray(arr[0]) ? arr[0] : arr);

export default createX;
