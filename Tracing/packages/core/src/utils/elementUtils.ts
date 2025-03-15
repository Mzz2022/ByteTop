/**
 * 判断元素是否含有目标属性
 */
export function getElByAttr(list: Element[], key: string): Element | undefined {
  return list.find(item => item.hasAttribute?.(key)); // 使用 ?. 简化 item.hasAttribute 的检查
}


/**
 * 是否为简单的标签
 * 简单标签数组：['em', 'b', 'strong', 'span', 'img', 'i', 'code']
 */
export function isSimpleEl(children: Element[]): boolean {
  if (children.length === 0) return true;
  const simpleTags = new Set(['em', 'b', 'strong', 'span', 'img', 'i', 'code']); // 使用 Set 数据结构来存储简单标签 提高查找效率 
  return children.every(child => simpleTags.has(child.tagName.toLowerCase())); // 使用 Array.prototype.every 方法来检查所有子元素是否都是简单标签
}

/**
 * 获取元素的关系字符串(从子级一直递归到最外层)
 * 例如两层div的关系会得到字符串: div>div
 */
export function getNodeXPath(node: Element, curPath = ''): string {
  if (!node) return curPath;

  const { parentElement: parent, id, tagName } = node; // 解构赋值
  const lowerTagName = tagName.toLowerCase();
  const path = curPath ? `>${curPath}` : '';

  if (!parent || parent === document.documentElement || parent === document.body) {
    return `${lowerTagName}${path}`;
  }

  if (id) {
    return `#${id}${path}`; // 知道了id 就不需要获取上下级关系了(id是唯一的)
  }

  return getNodeXPath(parent, `${lowerTagName}${path}`);
}