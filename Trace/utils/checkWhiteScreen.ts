export default function checkWhiteScreen() {
  // 最顶层的空白元素（判断是白屏的依据）
  const wrapperElements = ["html", "body", "#root"];
  let emptyPoints = 0; // 记录空白的点的个数

  function getSelector(element: Element) {
    let selector;
    if (element.id) {
      selector = `#${element.id}`;
    } else if (element.className && typeof element.className === "string") {
      // prettier-ignore
      selector = "." + element.className.split(" ").filter(item => !!item).join(".");
    } else {
      selector = element.nodeName.toLowerCase();
    }
    return selector;
  }

  function isWrapper(element: Element) {
    const selector = getSelector(element);
    if (wrapperElements.indexOf(selector) > -1) {
      emptyPoints++; // 是空白点
    }
  }

  for (let i = 1; i <= 9; i++) {
    // 在高度一半的位置，横坐标均分取 9 个点，查看这 9 个点上的元素
    const xElements = document.elementFromPoint(
      (window.innerWidth / 10) * i,
      window.innerHeight / 2,
    );
    // 在宽度一半的位置，纵坐标均分取 9 个点，查看这 9 个点上的元素
    const yElements = document.elementFromPoint(
      window.innerWidth / 2,
      (window.innerHeight / 10) * i,
    );

    // 判断点的位置，是否是空白元素
    isWrapper(xElements!);
    isWrapper(yElements!);
  }

  // 定义阈值，比如 当所有的点（18个）都是空白点，那么就认为是空白页面，有一个点上有元素，就认为不是空白页面。
  if (emptyPoints === 18) {
    return true;
  }
  return false;
}
