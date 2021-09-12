import {ChannelType} from "../enums/ChannelType";

export class CreateChannelCommand {
  groupType: ChannelType | number;
  groupTitle: string;
  groupDescription: string;


  constructor(groupType: ChannelType | number, groupTitle: string, groupDescription: string) {
    this.groupType = groupType;
    this.groupTitle = groupTitle;
    this.groupDescription = groupDescription;
  }
}
