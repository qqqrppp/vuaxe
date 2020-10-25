# vueaxe

Syntactic sugar for h function in Vue@3 and JSX alternative

```sh
   npm i vuaxe
```

```js
import x from "vuaxe";

const { div, a } = x;

export default {
  render() {
    return div([
      a(
        {
          src: "https://v3.vuejs.org/",
        },
        "vue@3"
      ),
      x("div.hello-class#hello-id")("hello text"),
      x.span("hello world"),
      x.ul([1, 2, 3].map((x) => h.li(x))),
    ]);
  },
};
```

### Api

```js
x(tagAndClassAndIdSelector)([propsOrChildren], [...children]);
```

```js
x("div")("Hello");
x("div")(2048);

const name = "Sue";
x("div")(["Hello ", name, "!"]);
x("div")({ style: { backgroundColor: "tomato" } });
x("div")({ className: "foo" }, "Hello");
x("div.foo#moo")(256);
x("div")({ className: "foo" }, ["Hello ", name]);

x.div({ className: "foo" }, "Hello");
```

original idea [reaxe](https://github.com/jxnblk/reaxe)
