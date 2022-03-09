export interface GroupItem {
  name: string;
  value: number;
  items: any[];
}

export interface GroupsStore {
  data: any[][];
  groups: GroupItem[];
}
