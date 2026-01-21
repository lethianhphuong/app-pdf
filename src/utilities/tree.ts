import { cloneDeep } from 'lodash';

interface TreeHelperConfig {
  id: string;
  children: string;
  parentId: string;
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  parentId: 'parentId'
};

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config);

export function listToTree<T = any>(list: any[], config: Partial<TreeHelperConfig> = {}): T[] {
  const listNode = cloneDeep(list);
  const conf = getConfig(config) as TreeHelperConfig;
  const nodeMap = new Map();
  const result: T[] = [];
  const { id, children, parentId } = conf;

  for (const node of listNode) {
    node[children] = node[children] || undefined;
    node.path = node.name;
    nodeMap.set(node[id], node);
  }

  for (const node of listNode) {
    const parent = nodeMap.get(node[parentId]);

    if (parent) {
      if (parent[children] === undefined) {
        parent[children] = [];
      }
      parent[children].push(node);

      node.path = `${parent[id]}/ ${node[id]}`;
    } else {
      result.push(node);
    }
  }
  return result;
}

export function treeToList<T = any>(tree: any, config: Partial<TreeHelperConfig> = {}): T {
  config = getConfig(config);
  const { children } = config;
  const result: any = [...tree];
  for (let i = 0; i < result.length; i++) {
    if (!result[i][children!]) continue;
    result.splice(i + 1, 0, ...result[i][children!]);
  }
  return result;
}
