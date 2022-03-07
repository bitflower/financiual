interface GroupItem {
  name: string;
  value: number;
}

export interface GroupsStore {
  data: any[][];
  groups: GroupItem[];
}
