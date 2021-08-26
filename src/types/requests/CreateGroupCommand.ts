import {GroupType} from "../enums/GroupType";

export class CreateGroupCommand {
  groupType: GroupType | number;
  groupTitle: string;
  groupDescription: string;


  constructor(groupType: GroupType | number, groupTitle: string, groupDescription: string) {
    this.groupType = groupType;
    this.groupTitle = groupTitle;
    this.groupDescription = groupDescription;
  }
}
