const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

function parseAttributes(source) {
  const attributes = new Map();
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of source.matchAll(pattern)) {
    attributes.set(match[1].toLowerCase(), match[2] ?? match[3] ?? match[4] ?? '');
  }
  return attributes;
}

function parseHtml(html) {
  const source = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
  const root = { tag: '#document', parent: null, children: [], id: '', classes: new Set() };
  const nodes = [];
  const stack = [root];
  const tagPattern = /<\/?([a-z][\w:-]*)(?:\s[^<>]*?)?\s*\/?>/gi;

  for (const match of source.matchAll(tagPattern)) {
    const token = match[0];
    const tag = match[1].toLowerCase();
    if (token.startsWith('</')) {
      const openIndex = stack.findLastIndex((node) => node.tag === tag);
      if (openIndex > 0) stack.length = openIndex;
      continue;
    }

    const attributeSource = token
      .replace(/^<[a-z][\w:-]*/i, '')
      .replace(/\/?>$/, '');
    const attributes = parseAttributes(attributeSource);
    const parent = stack.at(-1);
    const node = {
      tag,
      parent,
      children: [],
      id: attributes.get('id') ?? '',
      classes: new Set((attributes.get('class') ?? '').split(/\s+/).filter(Boolean)),
    };
    parent.children.push(node);
    nodes.push(node);
    if (!VOID_ELEMENTS.has(tag) && !token.endsWith('/>')) stack.push(node);
  }

  return { root, nodes };
}

function parseCompoundSelector(source) {
  const compound = { tag: null, id: null, classes: [], position: null };
  let rest = source;
  const tag = rest.match(/^[a-z][\w-]*/i);
  if (tag) {
    compound.tag = tag[0].toLowerCase();
    rest = rest.slice(tag[0].length);
  }

  while (rest) {
    let match;
    if ((match = rest.match(/^#([\w-]+)/))) {
      compound.id = match[1];
    } else if ((match = rest.match(/^\.([\w-]+)/))) {
      compound.classes.push(match[1]);
    } else if ((match = rest.match(/^:nth-child\((\d+)\)/))) {
      compound.position = Number(match[1]);
    } else if ((match = rest.match(/^:(first|last)-child/))) {
      compound.position = match[1];
    } else {
      throw new Error(`Unsupported static selector segment: ${source}`);
    }
    rest = rest.slice(match[0].length);
  }

  if (!compound.tag && !compound.id && compound.classes.length === 0) {
    throw new Error(`Empty static selector segment: ${source}`);
  }
  return compound;
}

function matchesCompound(node, compound) {
  if (compound.tag && node.tag !== compound.tag) return false;
  if (compound.id && node.id !== compound.id) return false;
  if (compound.classes.some((className) => !node.classes.has(className))) return false;
  if (compound.position !== null) {
    const siblings = node.parent?.children ?? [];
    const index = siblings.indexOf(node);
    if (compound.position === 'first' && index !== 0) return false;
    if (compound.position === 'last' && index !== siblings.length - 1) return false;
    if (typeof compound.position === 'number' && index !== compound.position - 1) return false;
  }
  return true;
}

function matchesSelector(node, compounds) {
  if (!matchesCompound(node, compounds.at(-1))) return false;
  let ancestor = node.parent;
  for (let index = compounds.length - 2; index >= 0; index -= 1) {
    while (ancestor && !matchesCompound(ancestor, compounds[index])) ancestor = ancestor.parent;
    if (!ancestor) return false;
    ancestor = ancestor.parent;
  }
  return true;
}

export function createStaticSelectorDocument(html) {
  const { nodes } = parseHtml(html);
  return {
    has(selector) {
      const compounds = selector.trim().split(/\s+/).map(parseCompoundSelector);
      return nodes.some((node) => matchesSelector(node, compounds));
    },
  };
}
