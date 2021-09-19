import {ChannelType} from "../enums/ChannelType";

export class CreateChannelCommand {
  channelType: ChannelType | number;
  channelTitle: string;
  channelDescription: string;


  constructor(groupType: ChannelType | number, groupTitle: string, groupDescription: string) {
    this.channelType = groupType;
    this.channelTitle = groupTitle;
    this.channelDescription = groupDescription;
  }
}
